const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TransactionSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    storeId : {
        type: mongoose.Schema.Types.Number,
        ref: 'Store'
    },
    customerId: {
        type: mongoose.Schema.Types.Number,
        ref: 'Customer'
    },
    products : [
        {
            productId : {
                type: mongoose.Schema.Types.Number,
                ref: 'Product'
            },
            quantity : Number,
        }
    ],
    totalPrice : Number,
    status: {
        type: String,
        enum: ["pending", "completed", "canceled"],
        default: "pending"
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    customerId: {
        type: mongoose.Schema.Types.Number,
        ref: 'Customer'
    },
})

TransactionSchema.plugin(AutoIncrement, { id: 'transaction_seq', inc_field: '_id'});
module.exports = mongoose.model('Transaction', TransactionSchema);