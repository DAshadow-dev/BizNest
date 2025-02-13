const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
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
        match : /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?[-.\s]?\)?[-.\s]?\d{1,12}$/
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Store', StoreSchema);