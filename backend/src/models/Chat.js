const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ChatSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
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

ChatSchema.plugin(AutoIncrement, { id: 'chat_seq', inc_field: '_id'});
module.exports = mongoose.model('Chat', ChatSchema);