const express = require('express');
const router = express.Router();
const {
  getPaymentPlans,
  getPaymentPlanById,
  addPaymentPlan,
  updatePaymentPlanById,
  deletePaymentPlanById
} = require('../controllers/payment_plan');

router.get('/', getPaymentPlans);
router.get('/:id', getPaymentPlanById);
router.post('/', addPaymentPlan);
router.put('/:id', updatePaymentPlanById);
router.delete('/:id', deletePaymentPlanById);

module.exports = router;
