const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageName: { type: String, required: true }, // اسم الصورة
    imageUrl: { type: String, required: true },  // الرابط الفعلي للصورة
    pageNumber: { type: Number, required: true }, // رقم الصفحة في الكتاب
    issue: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }, // ربط الصورة بالمسألة
}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);
