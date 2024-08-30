// src/app.js
const express = require('express');
const { initDb } = require('./models');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/images', imageRoutes);

initDb();

app.get("/", (req, res) => {
    // Extract the client's IP address
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
    // Convert IPv6 localhost to IPv4 localhost and handle IPv6 addresses
    if (ip === '::1' || ip === '::ffff:127.0.0.1') {
      ip = '127.0.0.1';
    } else if (ip.startsWith('::ffff:')) {
      // If the IP is an IPv4-mapped IPv6 address, extract the IPv4 part
      ip = ip.split(':').pop();
    }
  
    // Log the IP address to the console (optional)
    console.log('Client IP:', ip);
  
    // Include the IP address in the response if desired
    res.send(`Hi, welcome to Nikhil project ${ip}`);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});