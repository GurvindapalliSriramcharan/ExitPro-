const db = require('./firebase-config');

async function testConnection() {
  try {
    // Try to query
    const snapshot = await db.collection('students').where('email', '==', 'test@example.com').limit(1).get();
    console.log('Firebase query successful, empty:', snapshot.empty);
  } catch (error) {
    console.error('Firebase query failed:', error.message);
  }
}

testConnection();