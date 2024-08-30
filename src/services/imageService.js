// src/services/imageService.js
const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const tempDir = path.join(__dirname, '../../temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const downloadImage = async (url, outputPath) => {
  const response = await axios({
    url,
    responseType: 'stream',
  });
  return new Promise((resolve, reject) => {
    response.data.pipe(fs.createWriteStream(outputPath))
      .on('finish', () => resolve())
      .on('error', (e) => reject(e));
  });
};

const compressImage = async (inputPath, outputPath) => {
  return sharp(inputPath)
    .resize({ quality: 50 })
    .toFile(outputPath);
};

module.exports = { downloadImage, compressImage };