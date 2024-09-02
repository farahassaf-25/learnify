const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', 
        required: true,
    },
    orderItems: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Courses', 
                required: true,
            },
            title: String,
            image: String,
            price: Number,
        },
    ],
    paymentMethod: {
        type: String,
        required: true,
    },
    itemsPrice: {
        type: Number,
        required: true,
    },
    taxPrice: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Orders', OrderSchema);  
