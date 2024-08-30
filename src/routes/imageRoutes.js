// src/routes/imageRoutes.js
const express = require('express');
const multer = require('multer');
const { uploadCsv } = require('../controllers/imageController');
const { getStatus } = require('../controllers/imageController');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadCsv);
router.get('/status/:requestId', getStatus);
module.exports = router;