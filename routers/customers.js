const express = require("express");
const router = express.Router();

const {
  getCustomers,
  addCustomer,
  getCustomerById,
  deleteCustomerById,
  updateCustomerById,
  findCustomerByQueries,
} = require("../controllers/customer");

router.get("/", getCustomers);
router.post("/", addCustomer);
router.get("/:id", getCustomerById);
router.delete("/:id", deleteCustomerById);
router.put("/:id", updateCustomerById);
router.get("/search", findCustomerByQueries);

module.exports = router;
