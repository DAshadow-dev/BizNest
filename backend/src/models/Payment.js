const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const PaymentSchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  storeId: {
    type: mongoose.Schema.Types.Number,
    ref: "Store",
  },
  adminId: {
    type: mongoose.Schema.Types.Number,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PaymentSchema.plugin(AutoIncrement, { id: 'payment_seq', inc_field: '_id'});
module.exports = mongoose.model("Payment", PaymentSchema);
