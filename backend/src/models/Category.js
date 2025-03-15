const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CategorySchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    products: [{ 
        type: mongoose.Schema.Types.Number, 
        ref: 'Product' 
    }]
})

CategorySchema.plugin(AutoIncrement, { id: 'category_seq', inc_field: '_id'});

module.exports = mongoose.model('Category', CategorySchema);