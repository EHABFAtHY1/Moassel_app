const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
        type: String,
        enum: ['problem', 'book', 'audio', 'tree', 'other'],
        required: true
    },
    refId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    note: { type: String },
    addedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);





