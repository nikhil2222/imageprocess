// src/controllers/imageController.js
const { parseCsv } = require('../utils/csvParser');
const { Request, Product } = require('../models');
const { downloadImage, compressImage } = require('../services/imageService');
const path = require('path');
const fs = require('fs');

exports.uploadCsv = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const request = await Request.create();
    const records = await parseCsv(file.path);
    console.log(request, records);
    const processingPromises = records.map(async (record) => {
      const product = await Product.create({
        productName: record['productName'],
        inputImageUrls: record['inputImageUrls'],
        RequestId: request.id,
      });

      const inputUrls = record['inputImageUrls'].split(',');
      console.log(inputUrls);
     

      const outputUrls = [];

      for (const [index, url] of inputUrls.entries()) {
        const inputPath = path.join(__dirname, `../../temp/input_${product.id}_${index}.jpg`);
        const outputPath = path.join(__dirname, `../../temp/output_${product.id}_${index}.jpg`);

        await downloadImage(url.trim(), inputPath);
        await compressImage(inputPath, outputPath);

        outputUrls.push(outputPath);

        fs.unlinkSync(inputPath); // Clean up input image after processing
      }

      product.outputImageUrls = outputUrls.join(',');
      await product.save();
    });

    await Promise.all(processingPromises);
    request.status = 'completed';
    await request.save();

    res.status(200).json({ requestId: request.id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// src/controllers/imageController.js

exports.getStatus = async (req, res) => {
    const { requestId } = req.params;
  
    try {
      const request = await Request.findByPk(requestId);
  
      if (!request) {
        return res.status(404).send('Request not found');
      }
  
      const products = await Product.findAll({ where: { RequestId: requestId } });
  
      res.status(200).json({
        requestId: request.id,
        status: request.status,
        products,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };