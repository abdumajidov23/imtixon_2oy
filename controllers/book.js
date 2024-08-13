const db = require('../config/db.js');

const getBooks = (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
};

const getBookById = (req, res) => {
  const bookId = req.params.id;
  db.query('SELECT * FROM books WHERE id = ?', [bookId], (err, results) => {
    if (err) {
      console.error('Error fetching book by ID:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(results[0]);
  });
};

const addBook = (req, res) => {
    const { title, author, category, price, stock_quantity, publication_year } = req.body;
    db.query(
      'INSERT INTO books (title, author, category, price, stock_quantity, publication_year) VALUES (?, ?, ?, ?, ?, ?)',
      [ title, author, category, price, stock_quantity, publication_year],
      (err, result) => {
        if (err) {
          console.error('Kitob qo\'shishda xato:', err);
          return res.status(500).json({ error: 'Ichki server xatosi' });
        }
        res.status(201).json({
          message: 'Kitob muvaffaqiyatli qo\'shildi',
          bookId: result.insertId,
        });
      }
    );
  };
  

const updateBookById = (req, res) => {
  const bookId = req.params.id;
  const { title, author, category, price, stock_quantity, publication_year } = req.body;
  db.query(
    'UPDATE books SET title = ?, author = ?, category = ?, price = ?, stock_quantity = ?, publication_year = ? WHERE id = ?',
    [title, author, category, price, stock_quantity, publication_year, bookId],
    (err, results) => {
      if (err) {
        console.error('Error updating book:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json({ message: 'Book updated successfully' });
    }
  );
};

const deleteBookById = (req, res) => {
  const bookId = req.params.id;
  db.query('DELETE FROM books WHERE id = ?', [bookId], (err, results) => {
    if (err) {
      console.error('Error deleting book:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  });
};

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBookById,
  deleteBookById,
};
