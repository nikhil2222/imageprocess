// src/models/index.js
const sequelize = require('../config/database');
const Request = require('./request');
const Product = require('./product');

const initDb = async () => {
  try {
    await sequelize.sync({ force: false }); // Set to true if you want to drop tables each time
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

module.exports = { initDb, Request, Product };