const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

// Payment routes
router.get('/store', paymentController.getListPaymentsByStoreId);
router.post('/create', paymentController.createPayment);
router.get('/:id', paymentController.getPaymentById);
router.get('/status/:id', paymentController.getPaymentStatus);
router.put('/update/:id', paymentController.updatePaymentById);
router.delete('/delete/:id', paymentController.deletePaymentById);
router.post('/refund/:id', paymentController.refundPayment);

module.exports = router;