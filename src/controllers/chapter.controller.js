const Chapter = require('../models/chapter.model');

exports.createChapter = async (req, res) => {
    try {
        const { book, title, order, problems } = req.body;
        const chapter = await Chapter.create({ book, title, order, problems });
        res.status(201).json(chapter);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create chapter' });
    }
};

exports.getChapters = async (req, res) => {
    try {
        const chapters = await Chapter.find()
            .populate('book', 'title author')
            .populate('problems');  // Populate problems related to the chapter
        res.json(chapters);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch chapters' });
    }
};

exports.updateChapter = async (req, res) => {
    try {
        const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(chapter);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update chapter' });
    }
};

exports.deleteChapter = async (req, res) => {
    try {
        await Chapter.findByIdAndDelete(req.params.id);
        res.json({ message: 'Chapter deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete chapter' });
    }
};

// (اختياري) getChapter واحد بالتفاصيل
exports.getChapter = async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id)
            .populate('book', 'title author')
            .populate('problems');  // Populate problems related to the chapter
        if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
        res.json(chapter);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch chapter' });
    }
};
