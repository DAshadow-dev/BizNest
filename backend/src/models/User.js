const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        // required : [true, "Please enter a username"],
        // minlength : [5, "Please enter at least 5 characters"],
        // maxlength : [30, "Please enter no more than 30 characters"],
        // match : [/^[a-zA-Z0-9]+$/, "Username can only contain alphanumeric characters"]
    },
    password : {
        type : String,
        // required : [true, "Please enter a password"],
        // minlength : [8, "Please enter at least 8 characters"],
        // maxlength : [100, "Please enter no more than 100 characters"],
        // match : [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"],
    },
    verified: {
        type : Boolean,
        default : false
    },
    role : {
        type : String,
        enum : ['admin', 'business owner', 'staff'],
        default : 'business owner',
        required : true
    },
    email : {
        type : String,
        // required : [true, "Please enter an email"],
        // unique : true,
        // match : [/\S+@\S+\.\S+/, "Please enter a valid email address"]
    },
    phone : {
        type : String,
        // required : [true, "Please enter a phone number"],
        // unique : true,
        // match : /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?[-.\s]?\)?[-.\s]?\d{1,12}$/
    },
    image : {
        type : String,
        default : '',
    },
    status : {
        type : String,
        enum : ['active', 'inactive'],
        default : 'active'
    },
    storeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Store'
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    lastLogin : {
        type : Date
    }
})

module.exports = mongoose.model('User', UserSchema);    