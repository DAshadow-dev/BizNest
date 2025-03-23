const Invoice = require('../models/Invoice');

// Get all invoices
exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        if (invoices.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'No invoices found'
            });
        }
        res.status(200).json({
            status: 'success',
            results: invoices.length,
            data: {
                invoices
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Get an invoice by ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({
                status: 'fail',
                message: 'No invoice found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                invoice
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Create a new invoice
exports.createInvoice = async (req, res) => {
    try {
        const newInvoice = await Invoice.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                invoice: newInvoice
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Update an invoice
exports.updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!invoice) {
            return res.status(404).json({
                status: 'fail',
                message: 'No invoice found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                invoice
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Delete an invoice
exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) {
            return res.status(404).json({
                status: 'fail',
                message: 'No invoice found with that ID'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};