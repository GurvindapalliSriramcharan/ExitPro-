const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getDb } = require('../database');

const router = express.Router();

const UPLOAD_FOLDER = path.join(__dirname, '../student_faces');
if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// -------------------- STUDENT SIGNUP --------------------
router.post('/signup', upload.single('face'), async (req, res) => {
  try {
    const { name, roll_no, branch, email, parent_phone, alternative_phone, password } = req.body;
    const face_filename = req.file ? req.file.filename : null;

    const db = getDb();

    // Check if email already exists
    const existingStudent = await db.collection('students')
      .where('email', '==', email.trim().toLowerCase())
      .limit(1)
      .get();

    if (!existingStudent.empty) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Add student to Firestore
    await db.collection('students').add({
      name,
      rollNo: roll_no,
      branch,
      email: email.trim().toLowerCase(),
      parentPhone: parent_phone,
      alternativePhone: alternative_phone || null,
      password,
      faceFilename: face_filename,
      createdAt: new Date()
    });

    res.json({ message: 'Student signup successful!' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// -------------------- STUDENT LOGIN --------------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDb();

    // First query by email only to avoid composite index
    const snapshot = await db.collection('students')
      .where('email', '==', email.trim().toLowerCase())
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const studentData = snapshot.docs[0].data();

    // Check password in code instead of query
    if (studentData.password !== password.trim()) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      student: {
        name: studentData.name,
        roll_no: studentData.rollNo,
        branch: studentData.branch,
        email: studentData.email
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// -------------------- OUTING REQUEST --------------------
router.post('/request-permission', async (req, res) => {
  try {
    const { email, reason, from_time, to_time, location, otp_recipients } = req.body;
    const otp = '7195'; // Default OTP

    const db = getDb();

    // Get student's branch from students collection
    const studentSnapshot = await db.collection('students')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (studentSnapshot.empty) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const studentData = studentSnapshot.docs[0].data();
    const branch = studentData.branch;

    // Add outing request to Firestore
    await db.collection('outingRequests').add({
      email,
      reason,
      fromTime: from_time,
      toTime: to_time,
      branch,
      location,
      otpRecipients: JSON.stringify(otp_recipients),
      otp,
      parentStatus: 'Pending',
      facultyStatus: 'Pending',
      createdAt: new Date()
    });

    res.json({ message: 'Outing request submitted successfully.' });
  } catch (error) {
    console.error('Error submitting outing request:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// -------------------- STATUS CHECK --------------------
router.get('/status', async (req, res) => {
  try {
    const { email } = req.query;
    const db = getDb();

    const snapshot = await db.collection('outingRequests')
      .where('email', '==', email)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.json({ status: 'No response' });
    }

    const requestData = snapshot.docs[0].data();
    res.json({
      status: `Parent: ${requestData.parentStatus}, Faculty: ${requestData.facultyStatus}`
    });
  } catch (error) {
    console.error('Error checking status:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// -------------------- OTP VERIFICATION --------------------
router.post('/parent/verify-otp', async (req, res) => {
  try {
    const { email, otp: entered_otp } = req.body;
    const db = getDb();

    // Query by email first, then filter by parentStatus in code
    const snapshot = await db.collection('outingRequests')
      .where('email', '==', email)
      .orderBy('createdAt', 'desc')
      .get();

    // Find the most recent pending request
    let pendingRequest = null;
    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (data.parentStatus === 'Pending') {
        pendingRequest = { doc, data };
        break; // Get the most recent one
      }
    }

    if (!pendingRequest) {
      return res.status(404).json({ error: 'No pending request found' });
    }

    if (entered_otp === pendingRequest.data.otp) {
      await pendingRequest.doc.ref.update({
        parentStatus: 'Approved',
        updatedAt: new Date()
      });
      res.json({ message: 'Parent OTP verified. Request approved by parent.' });
    } else {
      res.status(401).json({ error: 'Incorrect OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

module.exports = router;
