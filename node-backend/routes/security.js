const express = require('express');
const { getDb } = require('../database');

const router = express.Router();

// Get all accepted outings (facultyStatus = 'Approved')
router.get('/accepted-outings', async (req, res) => {
  try {
    const db = getDb();

    // Get all approved outing requests
    const requestsSnapshot = await db.collection('outingRequests')
      .where('facultyStatus', '==', 'Approved')
      .get();

    const requests = [];
    for (const doc of requestsSnapshot.docs) {
      const requestData = doc.data();

      // Get student details
      const studentDoc = await db.collection('students')
        .where('email', '==', requestData.email)
        .limit(1)
        .get();

      if (!studentDoc.empty) {
        const studentData = studentDoc.docs[0].data();
        requests.push({
          id: doc.id,
          roll_no: studentData.rollNo,
          name: studentData.name
        });
      }
    }

    res.json({ requests });
  } catch (error) {
    console.error('Error fetching accepted outings:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// Checkout: move to outingAccepted and remove from outingRequests
router.post('/checkout', async (req, res) => {
  try {
    const { id, rollNo, name } = req.body;
    const checkoutTime = new Date().toISOString();

    const db = getDb();

    // Add to outingAccepted collection
    await db.collection('outingAccepted').add({
      rollNo,
      name,
      checkoutTime,
      createdAt: new Date()
    });

    // Remove from outingRequests
    await db.collection('outingRequests').doc(id).delete();

    res.json({ message: 'Checked out successfully' });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

module.exports = router;
