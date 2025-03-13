const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    senderId : {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        required: true
    },
    receiverId : {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status : {
        type: String,
        enum: ['unread', 'read'],
        required: true,
        default: 'unread'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chat', ChatSchema);