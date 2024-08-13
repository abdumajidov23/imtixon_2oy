const express = require("express");
const router = express.Router();

const booksRoutes= require("./books");
const customerRoutes = require("./customers");
const paymentsRouter = require("./payments");
const contractRouter = require("./contracts");
const palanRouter = require("./payment_plans");

router.use("/customers", customerRoutes);
router.use("/books", booksRoutes);
router.use("/payments", paymentsRouter);
router.use("/contract", contractRouter);
router.use("/payment_plan", palanRouter);

module.exports = router;