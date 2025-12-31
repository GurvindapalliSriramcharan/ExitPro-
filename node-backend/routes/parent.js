const express = require('express');
const { getDb } = require('../database');

const router = express.Router();

const DEFAULT_OTP = '7195';

router.post('/verify-otp', async (req, res) => {
  try {
    const { student_email, otp } = req.body;

    if (otp !== DEFAULT_OTP) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    const db = getDb();

    // Get all outing requests for this email and find the latest one
    const snapshot = await db.collection('outingRequests')
      .where('email', '==', student_email)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ error: 'No outing request found for this email' });
    }

    // Find the most recent request by sorting in code
    let latestDoc = null;
    let latestTime = 0;

    snapshot.forEach(doc => {
      const data = doc.data();
      const createdAt = data.createdAt ? data.createdAt.toMillis() : 0;
      if (createdAt > latestTime) {
        latestTime = createdAt;
        latestDoc = doc;
      }
    });

    if (!latestDoc) {
      return res.status(404).json({ error: 'No outing request found for this email' });
    }

    if (snapshot.empty) {
      return res.status(404).json({ error: 'No outing request found for this email' });
    }

    const doc = snapshot.docs[0];
    await doc.ref.update({
      parentStatus: 'Approved',
      updatedAt: new Date()
    });

    res.json({ message: 'OTP verified and parent approved' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

module.exports = router;
