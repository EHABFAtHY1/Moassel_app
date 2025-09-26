// 📁 controllers/bookmark.controller.js
const Bookmark = require('../models/bookmark.model');

exports.addBookmark = async (req, res) => {
    try {
        const { type, refId, note } = req.body;
        const bookmark = await Bookmark.create({
            user: req.user._id,
            type,
            refId,
            note
        });
        res.status(201).json({ success: true, data: bookmark });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error adding bookmark', error: err.message });
    }
};

exports.getBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ user: req.user._id })
            .sort({ addedAt: -1 });
        res.json({ success: true, data: bookmarks });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching bookmarks', error: err.message });
    }
};

exports.removeBookmark = async (req, res) => {
    try {
        await Bookmark.deleteOne({ _id: req.params.id, user: req.user._id });
        res.json({ success: true, message: 'Bookmark removed' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error deleting bookmark', error: err.message });
    }
};
