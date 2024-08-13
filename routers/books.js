const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBookById,
  addBook,
  updateBookById,
  deleteBookById,
} = require('../controllers/book');

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', addBook);
router.put('/:id', updateBookById);
router.delete('/:id', deleteBookById);

module.exports = router;

