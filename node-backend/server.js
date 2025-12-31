require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');
const { initDb } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Get local IP addresses
function getLocalIPs() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }
  return ips.length > 0 ? ips : ['localhost'];
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB
initDb();

// Routes
app.use('/student', require('./routes/student'));
app.use('/parent', require('./routes/parent'));
app.use('/faculty', require('./routes/faculty'));
app.use('/security', require('./routes/security'));

// API-only backend - static files served by Netlify frontend

app.listen(PORT, '0.0.0.0', () => {
  const localIPs = getLocalIPs();
  console.log(`Server running on port ${PORT}`);
  console.log(`Local access: http://localhost:${PORT}`);
  console.log(`Network access URLs:`);
  localIPs.forEach(ip => {
    console.log(`  http://${ip}:${PORT}`);
  });
  console.log(`Share these links with devices on the same WiFi:`);
  localIPs.forEach(ip => {
    console.log(`  http://${ip}:${PORT}`);
  });
});