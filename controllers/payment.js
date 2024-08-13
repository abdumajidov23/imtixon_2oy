const db = require("../config/db.js");

const getPayments = (req, res) => {
  db.query("SELECT * FROM payment", (err, results) => {
    if (err) {
      console.error('To\'lovlarni olishda xato:', err);
      return res.status(500).json({ error: 'Ichki server xatosi' });
    }
    res.json(results);
  });
};

const getPaymentById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM payment WHERE payment_id = ?", [id], (err, results) => {
    if (err) {
      console.error('To\'lovni olishda xato:', err);
      return res.status(500).json({ error: 'Ichki server xatosi' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'To\'lov topilmadi' });
    }
    res.json(results[0]);
  });
};

const addPayment = (req, res) => {
  const { contract_id, payment_amount, payment_date, payment_type } = req.body;
  db.query(
    'INSERT INTO payment (contract_id, payment_amount, payment_date, payment_type) VALUES (?, ?, ?, ?)',
    [contract_id, payment_amount, payment_date, payment_type],
    (err, result) => {
      if (err) {
        console.error('To\'lov qo\'shishda xato:', err);
        return res.status(500).json({ error: 'Ichki server xatosi' });
      }
      res.status(201).json({
        message: 'To\'lov muvaffaqiyatli qo\'shildi',
        paymentId: result.insertId,
      });
    }
  );
};

const updatePaymentById = (req, res) => {
  const { id } = req.params;
  const { contract_id, payment_amount, payment_date, payment_type } = req.body;
  db.query(
    'UPDATE payment SET contract_id = ?, payment_amount = ?, payment_date = ?, payment_type = ? WHERE payment_id = ?',
    [contract_id, payment_amount, payment_date, payment_type, id],
    (err, result) => {
      if (err) {
        console.error('To\'lovni yangilashda xato:', err);
        return res.status(500).json({ error: 'Ichki server xatosi' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'To\'lov topilmadi' });
      }
      res.json({ message: 'To\'lov muvaffaqiyatli yangilandi' });
    }
  );
};

const deletePaymentById = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM payment WHERE payment_id = ?', [id], (err, result) => {
    if (err) {
      console.error('To\'lovni o\'chirishda xato:', err);
      return res.status(500).json({ error: 'Ichki server xatosi' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'To\'lov topilmadi' });
    }
    res.json({ message: 'To\'lov muvaffaqiyatli o\'chirildi' });
  });
};


const createContract = (req, res) => {
    const {
      book_id, customer_id, credit_amount, given_date,
      expire_date, initial_payment, payment_plan_id
    } = req.body;
  
    // Ma'lumotlarning to'g'ri ekanligini tekshirish
    if (!book_id || !customer_id || !credit_amount || !given_date || !expire_date || initial_payment === undefined || !payment_plan_id) {
      return res.status(400).json({ error: 'Barcha kerakli maydonlarni to\'ldiring.' });
    }
  
    // Boshlang'ich to'lovning to'g'ri ekanligini tekshirish
    const expected_initial_payment = credit_amount * 0.05; // 5% boshlang'ich to'lov
    if (initial_payment !== expected_initial_payment) {
      return res.status(400).json({ error: 'Boshlang\'ich to\'lov 5% bo\'lishi kerak.' });
    }
  
    // To'lov rejasi bo'yicha hisoblash
    db.query('SELECT percent FROM payment_plan WHERE id = ?', [payment_plan_id], (err, results) => {
      if (err) {
        console.error('To\'lov rejasini olishda xato:', err);
        return res.status(500).json({ error: 'Ichki server xatosi' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'To\'lov rejasi topilmadi' });
      }
  
      const { percent } = results[0];
      const total_price = credit_amount * (1 + (percent / 100)); // Yakuniy narxni hisoblash
  
      // Shartnomani qo'shish
      db.query(
        'INSERT INTO contract (book_id, customer_id, credit_amount, given_date, expire_date, initial_payment, total_price, payment_plan_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [book_id, customer_id, credit_amount, given_date, expire_date, initial_payment, total_price, payment_plan_id],
        (err, result) => {
          if (err) {
            console.error('Shartnoma qo\'shishda xato:', err);
            return res.status(500).json({ error: 'Ichki server xatosi' });
          }
          res.status(201).json({
            message: 'Shartnoma muvaffaqiyatli qo\'shildi',
            contractId: result.insertId,
          });
        }
      );
    });
  };
  



module.exports = {
  getPayments,
  getPaymentById,
  addPayment,
  updatePaymentById,
  deletePaymentById,
  createContract,
};
