const express = require("express");
const router = express.Router();
const { getPayments, processPayment, createPayment } = require("../controllers/paymentController");
const validateToken = require("../middlewares/validateTokenHandler");

router.get("/", validateToken, getPayments);
router.post("/", validateToken, createPayment);
router.post("/pay", validateToken, processPayment);

module.exports = router;
