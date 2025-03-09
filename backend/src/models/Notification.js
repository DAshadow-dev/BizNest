const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const NotificationSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.Number,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status : {
        type: String,
        enum: ['unread', 'read'],
        default: 'unread'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

NotificationSchema.plugin(AutoIncrement, { id: 'notification_seq', inc_field: '_id'});
module.exports = mongoose.model('Notification', NotificationSchema);