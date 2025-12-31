const db = require('./firebase-config');

// Firebase doesn't need initialization like SQLite
// Collections will be created automatically when data is added

// Helper function to get Firestore instance
function getDb() {
  return db;
}

// Optional: Function to initialize collections with sample data or validation
async function initDb() {
  try {
    console.log('[OK] Firebase Firestore initialized successfully.');
    // You can add any initialization logic here if needed
    // Collections are created automatically in Firestore
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}

module.exports = { getDb, initDb };
