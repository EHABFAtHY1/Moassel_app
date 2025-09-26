const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
    audioUrl: { type: String, required: true },  // رابط الملف الصوتي
    teacher: { type: String, required: true },  // اسم المعلم
}, { timestamps: true });

module.exports = mongoose.model('Audio', audioSchema);
