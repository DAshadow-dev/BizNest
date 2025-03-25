const express = require('express');
const TransactionController = require('../../controllers/transaction/transactionController');
const router = express.Router();
const validateToken = require('../../middlewares/validateTokenHandler');

router.get('/', validateToken, TransactionController.getTransactionByStoreId);
router.get('/:customerId', validateToken, TransactionController.getTransactionByCustomerId);
router.post('/', validateToken, TransactionController.createTransaction);
router.delete('/:id', validateToken, TransactionController.deleteTransaction);

module.exports = router;
