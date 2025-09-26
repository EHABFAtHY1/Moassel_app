const Exercise = require("../models/exercises.model");

// Create
exports.createExercise = async (req, res, next) => {
    try {
        const exercise = await Exercise.create(req.body);
        res.jsend.success(exercise);
    } catch (err) {
        next(err);
    }
};

// Get All
exports.getExercises = async (req, res, next) => {
    try {
        const exercises = await Exercise.find();
        res.jsend.success(exercises);
    } catch (err) {
        next(err);
    }
};

// Get One
exports.getExercise = async (req, res, next) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) return res.jsend.fail({ message: "Exercise not found" });
        res.jsend.success(exercise);
    } catch (err) {
        next(err);
    }
};

// Update
exports.updateExercise = async (req, res, next) => {
    try {
        const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!exercise) return res.jsend.fail({ message: "Exercise not found" });
        res.jsend.success(exercise);
    } catch (err) {
        next(err);
    }
};

// Delete
exports.deleteExercise = async (req, res, next) => {
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id);
        if (!exercise) return res.jsend.fail({ message: "Exercise not found" });
        res.jsend.success({ message: "Exercise deleted" });
    } catch (err) {
        next(err);
    }
};
