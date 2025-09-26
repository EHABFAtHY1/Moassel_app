const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
});

const exerciseSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [optionSchema],
    type: { type: String, enum: ["true_false", "multiple_choice"], required: true },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Exercise", exerciseSchema);

