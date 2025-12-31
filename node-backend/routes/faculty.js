const express = require('express');
const { getDb } = require('../database');

const router = express.Router();

// Faculty login (simple default-password based)
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  if (password !== '12345678') return res.status(401).json({ error: 'Invalid credentials' });

  const localPart = email.split('@')[0] || '';
  if (!localPart.endsWith('_faculty')) return res.status(401).json({ error: 'Invalid faculty email' });

  const branchKey = localPart.replace('_faculty', '').replace(/_/g, ' ').toUpperCase();

  return res.json({ message: 'Login successful', branch: branchKey, email });
});

// Show all outing requests where parent has accepted and faculty not yet decided, and match the faculty branch
router.get('/pending-requests', async (req, res) => {
  try {
    const branch = req.query.branch || null;
    const db = getDb();

    // Get all outing requests and filter in code to avoid composite index
    const snapshot = await db.collection('outingRequests')
      .orderBy('createdAt', 'desc')
      .get();

    const requests = [];
    snapshot.forEach(doc => {
      const data = doc.data();

      // Filter by status and branch in code
      const matchesStatus = data.parentStatus === 'Approved' && data.facultyStatus === 'Pending';
      const matchesBranch = !branch || (data.branch && data.branch.toLowerCase().replace(/\s+/g, '') === branch.toLowerCase().replace(/\s+/g, ''));

      if (matchesStatus && matchesBranch) {
        requests.push({
          id: doc.id,
          email: data.email,
          reason: data.reason,
          from: data.fromTime,
          to: data.toTime,
          branch: data.branch
        });
      }
    });

    res.json({ requests });
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// Faculty decision endpoint
router.post('/approve', async (req, res) => {
  try {
    const { id, decision, facultyBranch } = req.body;

    if (!['Approved', 'Rejected'].includes(decision)) {
      return res.status(400).json({ error: 'Invalid decision' });
    }

    const db = getDb();
    const docRef = db.collection('outingRequests').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Request not found' });
    }

    const requestData = doc.data();
    const requestBranch = (requestData.branch) ? requestData.branch.toLowerCase().replace(/\s+/g, '') : null;
    const facBranch = facultyBranch ? facultyBranch.toLowerCase().replace(/\s+/g, '') : null;

    if (!facBranch || !requestBranch || facBranch !== requestBranch) {
      return res.status(403).json({ error: 'Not authorized to approve this request' });
    }

    await docRef.update({
      facultyStatus: decision,
      updatedAt: new Date()
    });

    res.json({ message: `Request ${decision.toLowerCase()} successfully` });
  } catch (error) {
    console.error('Error approving request:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

module.exports = router;
