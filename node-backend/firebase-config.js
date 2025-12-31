const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Note: You'll need to add your Firebase service account key
// You can generate this from Firebase Console > Project Settings > Service Accounts
const serviceAccount = require('./firebase-service-account-key.json'); // You'll need to create this file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://exitpro-3912b.firebaseio.com' // Firebase project URL
});

const db = admin.firestore();

module.exports = db;
