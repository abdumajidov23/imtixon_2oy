const db = require("../config/db.js");

const getContracts = (req, res) => {
  db.query("SELECT * FROM contract", (err, results) => {
    if (err) {
      console.error('Shartnomalarni olishda xato:', err);
      return res.status(500).json({ error: 'Ichki server xatosi' });
    }
    res.json(results);
  });
};

const getContractById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM contract WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error('Shartnomani olishda xato:', err);
      return res.status(500).json({ error: 'Ichki server xatosi' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Shartnoma topilmadi' });
    }
    res.json(results[0]);
  });
};

const updateContractById = (req, res) => {
  const { id } = req.params;
  const {
    book_id, customer_id, credit_amount, given_date,
    expire_date, initial_payment, total_price, payment_plan_id
  } = req.body;
  db.query(
    'UPDATE contract SET book_id = ?, customer_id = ?, credit_amount = ?, given_date = ?, expire_date = ?, initial_payment = ?, total_price = ?, payment_plan_id = ? WHERE id = ?',
    [book_id, customer_id, credit_amount, given_date, expire_date, initial_payment, total_price, payment_plan_id, id],
    (err, result) => {
      if (err) {
        console.error('Shartnomani yangilashda xato:', err);
        return res.status(500).json({ error: 'Ichki server xatosi' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Shartnoma topilmadi' });
      }
      res.json({ message: 'Shartnoma muvaffaqiyatli yangilandi' });
    }
  );
};

const deleteContractById = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM contract WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Shartnomani ochirishda xato:', err);
      return res.status(500).json({ error: 'Ichki server xatosi' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Shartnoma topilmadi' });
    }
    res.json({ message: 'Shartnoma muvaffaqiyatli ochirildi' });
  });
};


const createContract = (req, res) => {
    const {
      book_id, customer_id, credit_amount, given_date,
      expire_date, initial_payment, payment_plan_id
    } = req.body;
  
    if (!book_id || !customer_id || !credit_amount || !given_date || !expire_date || initial_payment === undefined || !payment_plan_id) {
      return res.status(400).json({ error: 'Barcha kerakli maydonlarni to\'ldiring.' });
    }
  
    const expected_initial_payment = credit_amount * 0.05;
    if (initial_payment !== expected_initial_payment) {
      return res.status(400).json({ error: 'Boshlangich tolov 5% bolishi kerak.' });
    }
  
    db.query('SELECT percent FROM payment_plan WHERE id = ?', [payment_plan_id], (err, results) => {
      if (err) {
        console.error('Tolov rejasini olishda xato:', err);
        return res.status(500).json({ error: 'Ichki server xatosi' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Tolov rejasi topilmadi' });
      }
  
      const { percent } = results[0];
      const total_price = credit_amount * (1 + (percent / 100)); 
  
      db.query(
        'INSERT INTO contract (book_id, customer_id, credit_amount, given_date, expire_date, initial_payment, total_price, payment_plan_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [book_id, customer_id, credit_amount, given_date, expire_date, initial_payment, total_price, payment_plan_id],
        (err, result) => {
          if (err) {
            console.error('Shartnoma qoshishda xato:', err);
            console.log(err);
            
            return res.status(500).json({ error: 'Ichki server xatosi' });
          }
          res.status(201).json({
            message: 'Shartnoma muvaffaqiyatli qoshildi',
            contractId: result.insertId,
          });
        }
      );
    });
  };
  

module.exports = {
  getContracts,
  getContractById,
  updateContractById,
  deleteContractById,
  createContract
};