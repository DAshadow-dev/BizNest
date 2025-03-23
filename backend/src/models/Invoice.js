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
        required: true
    },
    items: [{
        description: String,
        quantity: Number,
        price: Number
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
});

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


module.exports = mongoose.model('Invoice', InvoiceSchema);