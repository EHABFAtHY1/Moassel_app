// 📁 controllers/category.controller.js
const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
    try {
        const { title, description } = req.body;
        const category = await Category.create({ title, description });
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create category' });
    }
};

exports.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update category' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete category' });
    }
};

