const express = require('express');
const router = express.Router();
const { protect , admin } = require('../middleware/authMiddleware');

const {
  addBook,
  updateBook,
  deleteBook,
  getUsers,
  deleteUser
} = require('../controllers/adminController');

router.post('/books', protect, admin, addBook);
router.put('/books/:id', protect, admin, updateBook);
router.delete('/books/:id', protect, admin, deleteBook);
router.get('/users', protect, admin, getUsers);
router.delete('/users/:id', protect, admin, deleteUser);

module.exports = router;
