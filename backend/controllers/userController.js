const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Borrow = require('../models/borrow'); 
const Book = require('../models/book'); 
const borrowBook = async (req, res) => {
  const { bookId } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.copies < 1)
      return res.status(400).json({ message: 'No available copies' });

  
    book.copies -= 1;
    await book.save();


    const borrow = await Borrow.create({
      user: req.user.id,
      book: book._id
    });

    res.status(201).json(borrow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find({ user: req.user.id })
      .populate('book', 'title author')
      .sort({ borrowDate: -1 });

    res.json(borrows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const returnBook = async (req, res) => {
  const borrowId = req.params.id;

  try {
    
    const borrowRequest = await Borrow.findById(borrowId);
    
    if (!borrowRequest) {
      return res.status(404).json({ message: 'Borrow request not found' });
    }
            
    if (borrowRequest.isReturned) {
      return res.status(400).json({ message: 'Book already returned' });
    }

    borrowRequest.isReturned = true;
    borrowRequest.returnedAt = new Date();

    await borrowRequest.save();

    res.json({ message: 'Book returned successfully', borrowRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {borrowBook, getMyBorrows,  returnBook };
