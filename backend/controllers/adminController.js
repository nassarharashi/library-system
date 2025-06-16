const Book = require('../models/book');
const User = require('../models/User');
// get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {

    res.status(500).json({ message: err.message });
  }
};
// add book
const addBook = async (req, res) => {
  const { title, author, copies } = req.body;
  try {
    const book = await Book.create({ title, author, copies });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update book
const updateBook = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete Book
const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  delete User
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all borrow requests
const getAllBorrowRequests = async (req, res) => {
  try {
    const requests = await Borrow.find()
      .populate('user', 'name email')
      .populate('book', 'title author');

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update borrow request status
const updateBorrowStatus = async (req, res) => {
try {
    const borrow = await Borrow.findById(req.params.id);
    if (!borrow) return res.status(404).json({ message: 'Borrow request not found' });

    const { status, days } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    borrow.status = status;
    borrow.decisionAt = new Date();

    if (status === 'approved') {
      const startDate = new Date();
      const endDate = new Date(startDate);
      console.log(endDate);
      endDate.setDate(endDate.getDate() + (Number(days) || 14));
      console.log(endDate);
      borrow.borrowedFrom = startDate;
      borrow.borrowedTo = endDate;
    }

    await borrow.save();
    res.json({ message: `Request ${status} successfully`, borrow });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  getUsers,
  deleteUser,
  updateBorrowStatus,
  getAllBorrowRequests
};
