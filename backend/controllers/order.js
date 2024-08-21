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

    //check for course validity and ownership
    for (let item of orderItems) {
        const course = await Course.findById(item.course);
        if (!course) {
            return next(new ErrorResponse('Course not found', 404));
        }
        if (course.user.toString() === req.user.id.toString()) {
            return next(new ErrorResponse('You cannot purchase your own course', 400));
        }
        if (req.user.purchasedCourses.includes(course._id.toString())) {
            return next(new ErrorResponse('You have already purchased this course', 400));
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

    orderItems.forEach(item => {
        if (!req.user.purchasedCourses.includes(item.course.toString())) {
            req.user.purchasedCourses.push(item.course);
        }
    });

    await req.user.save();

    res.status(201).json({
        success: true,
        data: order,
    });
});
