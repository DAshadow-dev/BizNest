const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const RoleSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    permissions: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

RoleSchema.plugin(AutoIncrement, { id: 'role_seq', inc_field: '_id'});
