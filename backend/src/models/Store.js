const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const StoreSchema = new mongoose.Schema({
<<<<<<< HEAD
    _id: {
        type: Number
    },
    ownerId: {
        type: mongoose.Schema.Types.Number,
=======
    owner: {
        type: mongoose.Schema.Types.ObjectId,
>>>>>>> 37fda09f2b94111ff33993360245314eb5b96d50
        ref: 'User',
        required: true
    },
    name : {
        type: String,
        required: true,
        unique: true
    },
    address : {
        type: String,
        required: true,
    },
    phone : {
        type : String,
        required : [true, "Please enter a phone number"],
        unique : true,
        // match : /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?[-.\s]?\)?[-.\s]?\d{1,12}$/
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    customers: [{
        type: mongoose.Schema.Types.Number,
        ref: 'Customer'
    }],
})

StoreSchema.plugin(AutoIncrement, { id: 'store_seq', inc_field: '_id'});
module.exports = mongoose.model('Store', StoreSchema);