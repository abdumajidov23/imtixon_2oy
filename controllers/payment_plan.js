const db = require("../config/db.js");

const getPaymentPlans = (req, res) => {
  db.query("SELECT * FROM payment_plan", (err, results) => {
    if (err) {
      console.error('To\'lov rejalari olishda xato:', err);
      return res.status(500).json({ error: 'Ichki server xatosi' });
    }
    res.json(results);
  });
};

const getPaymentPlanById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM payment_plan WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error('To\'lov rejasini olishda xato:', err);
      return res.status(500).json({ error: 'Ichki server xatosi' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'To\'lov reja topilmadi' });
    }
    res.json(results[0]);
  });
};

const addPaymentPlan = (req, res) => {
  const { month, percent } = req.body;
  db.query(
    'INSERT INTO payment_plan (month, percent) VALUES (?, ?)',
    [month, percent],
    (err, result) => {
      if (err) {
        console.error('To\'lov rejasini qo\'shishda xato:', err);
        return res.status(500).json({ error: 'Ichki server xatosi' });
      }
      res.status(201).json({
        message: 'To\'lov reja muvaffaqiyatli qo\'shildi',
        paymentPlanId: result.insertId,
      });
    }
  );
};

const updatePaymentPlanById = (req, res) => {
  const { id } = req.params;
  const { month, percent } = req.body;
  db.query(
    'UPDATE payment_plan SET month = ?, percent = ? WHERE id = ?',
    [month, percent, id],
    (err, result) => {
      if (err) {
        console.error('To\'lov rejasini yangilashda xato:', err);
        return res.status(500).json({ error: 'Ichki server xatosi' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'To\'lov reja topilmadi' });
      }
      res.json({ message: 'To\'lov reja muvaffaqiyatli yangilandi' });
    }
  );
};

const deletePaymentPlanById = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM payment_plan WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('To\'lov rejasini o\'chirishda xato:', err);
      return res.status(500).json({ error: 'Ichki server xatosi' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'To\'lov reja topilmadi' });
    }
    res.json({ message: 'Tolov reja muvaffaqiyatli ochirildi' });
  });
};

module.exports = {
  getPaymentPlans,
  getPaymentPlanById,
  addPaymentPlan,
  updatePaymentPlanById,
  deletePaymentPlanById
};
