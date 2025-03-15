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
    userId : {
        type: mongoose.Schema.Types.Number,
        ref: 'User'
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
            price : Number
        }
    ],
    totalPrice : Number,
    status : String,
    createdAt : {
        type: Date,
        default: Date.now
    }
})

TransactionSchema.plugin(AutoIncrement, { id: 'transaction_seq', inc_field: '_id'});
module.exports = mongoose.model('Transaction', TransactionSchema);