const Payment = require("../models/Payment");
const asyncHandler = require("express-async-handler");

// API tạo thanh toán mới
const createPayment = asyncHandler(async (req, res) => {
  try {
    const { storeId, amount } = req.body;

    if (!storeId || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Thông tin thanh toán không hợp lệ" });
    }

    const newPayment = new Payment({
      storeId,
      adminId: req.user.id, // Lấy từ token xác thực
      amount,
    });

    await newPayment.save();

    res.status(201).json({
      message: "Tạo thanh toán thành công",
      payment: newPayment,
    });
  } catch (error) {
    console.error("Lỗi khi tạo thanh toán:", error);
    res.status(500).json({ message: "Lỗi khi tạo thanh toán", error: error.message });
  }
});

// Lấy danh sách thanh toán của business owner
const getPayments = asyncHandler(async (req, res) => {
  try {
    const payments = await Payment.find({ adminId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    res.json(payments);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách thanh toán:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách thanh toán", error: error.message });
  }
});

// Xử lý thanh toán giả lập (không qua Stripe)
const processPayment = asyncHandler(async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ message: "Thiếu thông tin thanh toán" });
    }

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Không tìm thấy thanh toán" });
    }

    if (payment.status !== "pending") {
      return res.status(400).json({ message: "Thanh toán không hợp lệ hoặc đã được xử lý" });
    }

    if (payment.adminId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Bạn không có quyền thực hiện thanh toán này" });
    }

    // Giả lập xử lý thanh toán (chờ 2 giây)
    setTimeout(async () => {
      payment.status = "completed";
      await payment.save();

      res.json({ message: "Thanh toán thành công", payment });
    }, 2000);
  } catch (error) {
    console.error("Lỗi xử lý thanh toán:", error);
    res.status(500).json({ message: "Lỗi khi xử lý thanh toán", error: error.message });
  }
});

module.exports = { getPayments, processPayment, createPayment };
