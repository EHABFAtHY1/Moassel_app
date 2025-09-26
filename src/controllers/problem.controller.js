const Problem = require('../models/problem.model');

exports.createProblem = async (req, res) => {
    try {
        const { chapter, content, audioUrls, videoUrls, notes, referenceImages } = req.body;
        const problem = await Problem.create({ chapter, content, audioUrls, videoUrls, notes, referenceImages });
        res.status(201).json(problem);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create problem' });
    }
};
exports.getProblem = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id).populate('chapter');  // Populate the chapter field
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.json(problem);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch problem' });
    }
}

exports.getProblems = async (req, res) => {
    try {
        const problems = await Problem.find().populate('chapter');  // Populate the chapter for each problem
        res.json(problems);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch problems' });
    }
};

exports.updateProblem = async (req, res) => {
    try {
        const problem = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(problem);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update problem' });
    }
};

exports.deleteProblem = async (req, res) => {
    try {
        await Problem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Problem deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete problem' });
    }
};
