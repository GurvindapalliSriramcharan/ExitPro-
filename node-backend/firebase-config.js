const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Note: You'll need to add your Firebase service account key
// You can generate this from Firebase Console > Project Settings > Service Accounts

// Load service account key from environment variable or file path
const fs = require('fs');
let serviceAccount;
if (fs.existsSync('./firebase-service-account-key.json')) {
  serviceAccount = require('./firebase-service-account-key.json');
} else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
  serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
} else if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
} else {
  throw new Error('Firebase service account key not found. Please provide via file or environment variable.');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_PROJECT_URL 
});

const db = admin.firestore();

module.exports = db;
