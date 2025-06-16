const express = require('express');
const router = express.Router();
const { protect , admin } = require('../middleware/authMiddleware');

const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  getUsers,
  deleteUser,
  getAllBorrowRequests,
  updateBorrowStatus
} = require('../controllers/adminController');

router.get('/getBooks', getBooks);
router.post('/addbooks', protect, admin, addBook);
router.put('/books/:id', protect, admin, updateBook);
router.delete('/books/:id', protect, admin, deleteBook);
router.get('/users', protect, admin, getUsers);
router.delete('/users/:id', protect, admin, deleteUser);
router.get('/borrows', protect, admin, getAllBorrowRequests); 
router.put('/borrows/:id', protect, admin, updateBorrowStatus);
module.exports = router;
