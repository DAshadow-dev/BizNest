const asyncHandler = require('express-async-handler');
const Payment = require('../models/Payment');
const Store = require('../models/Store');
const User = require('../models/User');

const getListPaymentsByStoreId = asyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        const store = await Store.findById(user.storeId).populate("payments");
        const listPayments = store.payments;
        res.status(200).json({ Data: listPayments });
    } catch (err) {
        res.status(500);
        throw new Error(err.message);
    }
});

const createPayment = asyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        const newPayment = await Payment.create({
            storeId: user.storeId,
            adminId: user._id,
            amount: req.body.amount,
            status: req.body.status || "pending",
        });
        
        const store = await Store.findById(user.storeId);
        store.payments.push(newPayment._id);
        await store.save();
        
        res.status(201).json({ Data: newPayment });
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
});

const getPaymentById = asyncHandler(async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        res.status(200).json({ Data: payment });
    } catch (err) {
        res.status(500);
        throw new Error(err.message);
    }
});

const getPaymentStatus = asyncHandler(async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        res.status(200).json({ Status: payment.status });
    } catch (err) {
        res.status(500);
        throw new Error(err.message);
    }
});

const deletePaymentById = asyncHandler(async (req, res) => {
    try {
        const deletePayment = await Payment.findByIdAndDelete(req.params.id);
        const user = await User.findOne({ _id: req.user.id });
        const store = await Store.findById(user.storeId);
        store.payments = store.payments.filter((e) => e.toString() !== req.params.id);
        await store.save();
        res.status(200).json({ Data: deletePayment, Message: "Delete Payment Success" });
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
});

const updatePaymentById = asyncHandler(async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) throw new Error("Payment not found");

        payment.amount = req.body.amount || payment.amount;
        payment.status = req.body.status || payment.status;
        await payment.save();

        res.status(200).json({ Data: payment });
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
});

const refundPayment = asyncHandler(async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) throw new Error("Payment not found");

        payment.status = "failed";
        await payment.save();

        res.status(200).json({ Data: payment, Message: "Payment refunded successfully" });
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
});

module.exports = { getListPaymentsByStoreId, getPaymentById, getPaymentStatus, createPayment, updatePaymentById, deletePaymentById, refundPayment };
