// src/models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Request = require('./request');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inputImageUrls: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  outputImageUrls: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

// Establish relationship
Request.hasMany(Product);
Product.belongsTo(Request);

module.exports = Product;