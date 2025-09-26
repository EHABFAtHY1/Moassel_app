const mongoose = require('mongoose');
const multer = require('multer');

// إعداد Multer لتحميل الصور
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/resourceBook/images');  // مجلد تخزين الصور
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);  // تسميه الملف باستخدام timestamp
  }
});

// إعداد Multer لتحميل الـ PDF
const pdfStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/resourceBook/pdfs');  // مجلد تخزين الـ PDF
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);  // تسميه الملف باستخدام timestamp
  }
});

// تخصيص multer لتحميل الصور و الـ PDF
const imageUpload = multer({ storage: imageStorage });
const pdfUpload = multer({ storage: pdfStorage });
const image = require('./image.model');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },  // عنوان الكتاب
  author: { type: String, required: true },  // مؤلف الكتاب
  description: { type: String },  // وصف الكتاب
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },  // ربط الكتاب بالفئة
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],  // مصفوفة لروابط الصور
  pdf: { type: String },  // رابط الـ PDF للكتاب
}, { timestamps: true });

module.exports = mongoose.model('resourceBook', bookSchema);
