const BookSource = require('../models/resourceBook.model');  // استيراد الموديل الخاص بالكتاب
const multer = require('multer');
const path = require('path');


exports.createBook = async (req, res) => {
    try {
        // رفع الصور
        const images = req.files.map(file => file.path);

        // رفع الـ PDF
        const pdf = req.file ? req.file.path : null;

        const book = await BookSource.create({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            category: req.body.category,
            images: images,
            pdf: pdf
        });

        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create book source' });
    }
};

// تحميل الـ PDF للكتاب
exports.getBookPDF = async (req, res) => {
    try {
        const book = await BookSource.findById(req.params.id);

        if (!book || !book.pdf) {
            return res.status(404).json({ message: 'PDF not found for this book' });
        }

        res.sendFile(path.resolve(book.pdf));  // إرسال الـ PDF
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve PDF' });
    }
};

// تحميل الصور الخاصة بالكتاب
exports.getBookImages = async (req, res) => {
    try {
        const book = await BookSource.findById(req.params.id);

        if (!book || !book.images || book.images.length === 0) {
            return res.status(404).json({ message: 'Images not found for this book' });
        }

        res.json(book.images);  // إرسال روابط الصور
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve images' });
    }
};
exports.updateBook = async (req, res) => {
    try {
        const book = await BookSource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update book' });
    }
};
exports.deleteBook = async (req, res) => {
    try {
        await BookSource.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book source deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete book source' });
    }
};