const express = require('express');
const router = express.Router();
const {
  getPayments,
  getPaymentById,
  addPayment,
  updatePaymentById,
  deletePaymentById
} = require('../controllers/payment');

router.get('/', getPayments);
router.get('/:id', getPaymentById);
router.post('/', addPayment);
router.put('/:id', updatePaymentById);
router.delete('/:id', deletePaymentById);
//

module.exports = router;
