const Invoice = require('../models/Invoice');

// Lấy tất cả hóa đơn
exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().select('-__v');
        if (!invoices.length) {
            return res.status(404).json({
                status: 'fail',
                message: 'Không tìm thấy hóa đơn nào'
            });
        }
        res.status(200).json({
            status: 'success',
            results: invoices.length,
            data: { invoices }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Lỗi máy chủ, vui lòng thử lại sau'
        });
    }
};

// Lấy hóa đơn theo ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).select('-__v');
        if (!invoice) {
            return res.status(404).json({
                status: 'fail',
                message: 'Không tìm thấy hóa đơn với ID này'
            });
        }
        res.status(200).json({
            status: 'success',
            data: { invoice }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'ID không hợp lệ hoặc không tồn tại'
        });
    }
};

// Tạo hóa đơn mới
exports.createInvoice = async (req, res) => {
    try {
        // Kiểm tra đầu vào hợp lệ
        const { invoiceNumber, customerName, customerEmail, items, dueDate } = req.body;
        if (!invoiceNumber || !customerName || !customerEmail || !items || !dueDate) {
            return res.status(400).json({
                status: 'fail',
                message: 'Vui lòng cung cấp đầy đủ thông tin hóa đơn'
            });
        }

        const newInvoice = await Invoice.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { invoice: newInvoice }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Cập nhật hóa đơn
exports.updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).select('-__v');

        if (!invoice) {
            return res.status(404).json({
                status: 'fail',
                message: 'Không tìm thấy hóa đơn với ID này'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { invoice }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Dữ liệu cập nhật không hợp lệ'
        });
    }
};

// Xóa hóa đơn
exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) {
            return res.status(404).json({
                status: 'fail',
                message: 'Không tìm thấy hóa đơn với ID này'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'ID không hợp lệ hoặc không tồn tại'
        });
    }
};
