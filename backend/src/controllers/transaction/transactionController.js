const asyncHandler= require('express-async-handler');
const Customer= require('../../models/Customer');
const Store= require('../../models/Store');
const User = require('../../models/User');
const Product= require('../../models/Product');
const Transaction = require('../../models/Transaction');

const getTransactionByStoreId = asyncHandler(async (req, res) => {
    try {
        console.log('user: ', req.user);
        const storeId = req.user.storeId; // Lấy storeId từ URL
        console.log('storeId: ', storeId);

        if (!storeId) {
            return res.status(400).json({ message: "Store ID is required" });
        }

        const transactions = await Transaction.find({ storeId })
            .populate("customerId") // Populate customer (nếu cần)
            .populate("products.productId") // Populate sản phẩm
            .sort({ _id: -1 })
        res.status(200).json({ Data: transactions });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const getTransactionByCustomerId = asyncHandler(async (req, res) => {
    try {
        const { customerId } = req.params; // Lấy customerId từ URL

        if (!customerId) {
            return res.status(400).json({ message: "Customer ID is required" });
        }

        const transactions = await Transaction.find({ customerId })
            .populate("storeId") // Lấy thông tin cửa hàng
            .populate("products.productId"); // Lấy thông tin sản phẩm

        res.status(200).json({ data: transactions });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const createTransaction = asyncHandler(async (req, res) => {
    try {
        const{customerId, products } = req.body;
        const storeId= req.user.storeId
        // Kiểm tra sự tồn tại của cửa hàng và khách hàng
        const storeExists = await Store.findById(storeId);
        const customerExists = await Customer.findById(customerId);

        if (!storeExists || !customerExists) {
            return res.status(400).json({ message: "Store hoặc Customer không tồn tại" });
        }

        // Tính toán tổng giá trị của giao dịch
        let totalPrice = 0;
        for (const item of products) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(400).json({ message: `Sản phẩm với ID ${item.productId} không tồn tại` });
            }
            totalPrice += item.quantity * product.price; // Sử dụng giá từ cơ sở dữ liệu thay vì giá từ request
        }

        // Tạo mới giao dịch
        const transaction = new Transaction({
            storeId,
            customerId,
            products,
            totalPrice,
            status: "pending",
        });

        console.log('transaction: ', transaction);
        await transaction.save();
        for (const item of products) {
            const product = await Product.findById(item.productId);
            product.quantity -= item.quantity;
            product.save()
        }
        res.status(201).json({ message: "Giao dịch tạo thành công", Data: transaction });

    } catch (error) {
        res.status(500).json({ message: "Lỗi khi tạo giao dịch", error: error.message });
    }
});

const deleteTransaction = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID của giao dịch từ request

        // Tìm giao dịch trong database
        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404).json({ message: "Giao dịch không tồn tại" });
        }

        // Xóa giao dịch
        await Transaction.findByIdAndDelete(id);
        res.status(200).json({ message: "Giao dịch đã được xóa thành công" });

    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa giao dịch", error: error.message });
    }
});

module.exports= {getTransactionByStoreId, getTransactionByCustomerId, createTransaction, deleteTransaction};