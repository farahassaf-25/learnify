const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Order = require('../models/Order');
const Course = require('../models/Courses');
const User = require('../models/Users');

// @desc      Create new order
// @route     POST /learnify/orders
// @access    Private
exports.checkout = asyncHandler(async (req, res, next) => {
    const { orderItems, paymentMethod, itemsPrice, taxPrice, totalPrice } = req.body;

    //check if the user has already purchased any of the courses
    for (let item of orderItems) {
        if (req.user.purchasedCourses.includes(item.course)) {
            return next(new ErrorResponse('You have already purchased one of the courses', 400));
        }
    }    

    const order = await Order.create({
        user: req.user.id,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
        isPaid: true, // mock payment
        paidAt: Date.now(), 
    });

    req.user.purchasedCourses.push(...orderItems.map(item => item.course));
    await req.user.save();

    res.status(201).json({
        success: true,
        data: order,
    });
});
