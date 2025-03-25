const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, "Email không hợp lệ"] // Regex xác thực email
    },
    items: [{
        description: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 }, // Đảm bảo ít nhất 1 sản phẩm
        price: { type: Number, required: true, min: 0 } // Đảm bảo giá không âm
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    issuedDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Overdue'],
        default: 'Pending'
    }
}, { timestamps: true });

// Virtual field để tính tổng mỗi mục
InvoiceSchema.virtual('items.subTotal').get(function () {
    return this.items.map(item => ({
        description: item.description,
        subTotal: item.quantity * item.price
    }));
});

// Trước khi lưu, cập nhật totalAmount dựa trên items
InvoiceSchema.pre('save', function (next) {
    this.totalAmount = this.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    next();
});

module.exports = mongoose.model('Invoice', InvoiceSchema);

// Sample response from the API
// {
//     "status": "success",
//     "data": {
//         "invoice": {
//             "invoiceNumber": "INV-1002",
//             "customerName": "Alice Johnson",
//             "customerEmail": "alice.johnson@example.com",
//             "items": [
//                 {
//                     "description": "Smartphone",
//                     "quantity": 1,
//                     "price": 800,
//                     "_id": "67dfec42522aae0ac133b3f0"
//                 },
//                 {
//                     "description": "Charger",
//                     "quantity": 1,
//                     "price": 50,
//                     "_id": "67dfec42522aae0ac133b3f1"
//                 }
//             ],
//             "totalAmount": 850,
//             "dueDate": "2025-04-15T00:00:00.000Z",
//             "status": "Pending",
//             "_id": "67dfec42522aae0ac133b3ef",
//             "issuedDate": "2025-03-23T11:10:58.879Z",
//             "__v": 0
//         }
//     }
// }

