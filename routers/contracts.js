const express = require('express');
const router = express.Router();
const {
  getContracts,
  getContractById,
  addContract,
  updateContractById,
  deleteContractById,
  createContract
} = require('../controllers/contract');

router.get('/', getContracts);
router.get('/:id', getContractById);
router.put('/:id', updateContractById);
router.delete('/:id', deleteContractById);
router.post('/create', createContract);

module.exports = router;
