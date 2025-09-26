const express = require('express');
const router = express.Router();
const { createBook, getBookPDF, getBookImages, updateBook, deleteBook } = require('../controllers/resourceBook.controller');

// رفع الكتاب والصور
// router.post('/upload', imageUpload.single('image'), pdfUpload.single('pdf'), createBook);  // رفع صور متعددة و PDF

// تحميل الـ PDF
router.get('/:id/pdf', getBookPDF);

// تحميل الصور
router.get('/:id/images', getBookImages);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
