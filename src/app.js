// src/app.js
const express = require('express');
const { initDb } = require('./models');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/images', imageRoutes);

initDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});