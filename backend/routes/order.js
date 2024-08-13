const express = require('express');
const { protect } = require('../middleware/auth');
const Order = require('../models/Order');

const router = express.Router();

router.post('/payment', protect, async (req, res) => {
    console.log('Request body:', req.body);
    const { orderItems, paymentMethod, itemsPrice, taxPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
        user: req.user._id,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
    });

    try {
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ message: 'Error saving order' });
    }
});

module.exports = router;
