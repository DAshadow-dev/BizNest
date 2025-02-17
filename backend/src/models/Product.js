const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Product category is required"],
  },
  color: {
    type: String,
    required: [true, "Product color is required"],
  },
  size: {
    type: Number,
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
  brand: {
    type: String,
    required: [true, "Product brand is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
