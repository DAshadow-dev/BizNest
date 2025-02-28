const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    // products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] -> tránh trùng lặp dữ liệu
})

module.exports = mongoose.model('Category', CategorySchema);