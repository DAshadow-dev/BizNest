const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ProductSchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  storeId: {
    type: mongoose.Schema.Types.Number,
    ref: "Store",
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  categoryId: {
    type: mongoose.Schema.Types.Number,
    ref: "Category",
    required: [true, "Product category is required"],
  },
  color: {
    type: String,
    required: [true, "Product color is required"],
  },
  size: {
    type: String,
    required: [true, "Product size is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: 0,
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity is required"],
    min: 0,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    maxlength: 500,
  },
  image : {
    type: String,
    required: [true, "Product image is required"],
    default: "",
  },
  brand: {
    type: String,
    required: [true, "Product brand is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ProductSchema.plugin(AutoIncrement, { 
  id: 'product_seq', 
  inc_field: '_id',
  start_seq: 100 // Bắt đầu từ 100 để tránh xung đột với các ID đã tồn tại
});
module.exports = mongoose.model("Product", ProductSchema);
