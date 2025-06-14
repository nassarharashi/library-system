const Book = require('../models/book');

//add new book
const addBook = async (req, res) => {
  const { title, author, copies } = req.body;

  try {
    const book = await Book.create({ title, author, copies });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {

    res.status(500).json({ message: err.message });
  }
};

module.exports = { addBook, getBooks };
