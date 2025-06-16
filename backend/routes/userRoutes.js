const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {borrowBook, getMyBorrows , returnBook } = require('../controllers/userController');


router.post('/borrow', protect, borrowBook); 
router.get('/myBorrows', protect, getMyBorrows); 
router.put('/return/:id',protect, returnBook);
module.exports = router;
