const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CustomerSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    fullname : {
        type : String,
        required : [true, "Please enter a fullname"],
    },
    email : {
        type : String,
        // match : [/\S+@\S+\.\S+/, "Please enter a valid email address"]
    },
    phone : {
        type : String,
        required : [true, "Please enter a phone number"],
        // match : /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?[-.\s]?\)?[-.\s]?\d{1,12}$/
    },
    gender:{
        type: Boolean
    },
    date_of_birth :{
        type: Date
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
})

CustomerSchema.plugin(AutoIncrement, { id: 'customer_seq', inc_field: '_id'});

module.exports = mongoose.model('Customer', CustomerSchema);    