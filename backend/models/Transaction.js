const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    storeId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products : [
        {
            productId : {
                type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('Transaction', TransactionSchema);