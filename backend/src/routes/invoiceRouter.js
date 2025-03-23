const express = require('express');
const invoiceController = require('../controllers/invoiceController');

const router = express.Router();

// Route to get all invoices
router.get('/', invoiceController.getAllInvoices);

// Route to get a single invoice by ID
router.get('/:id', invoiceController.getInvoiceById);

// Route to create a new invoice
router.post('/', invoiceController.createInvoice);

// Route to update an existing invoice by ID
router.put('/:id', invoiceController.updateInvoice);

// Route to delete an invoice by ID
router.delete('/:id', invoiceController.deleteInvoice);

module.exports = router;
