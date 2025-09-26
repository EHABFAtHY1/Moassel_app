const Book = require('../models/books.model');

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create book' });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('chapters');  // Populate the chapters related to the book
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate(
        [
          {
            path: "chapters",
            populate: { path: "problems" }
          }
        ]
        // {
        // path: 'chapters',
        // populate: {
        //   path: 'problems'  // Populate problems for each chapter
        // }
        // }
      );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch book' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update book' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete book' });
  }
};
