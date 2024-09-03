const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const CoursesSchema = require('../models/Courses');
const LectureSchema = require('../models/Lectures');
const UsersSchema = require('../models/Users');
const FeedbackSchema = require('../models/Feedback');
const OrdersSchema = require('../models/Orders');

exports.getDashboardData = asyncHandler(async (req, res, next) => {
    try {
      const courses = await CoursesSchema.find({})
      .populate({
        path: 'feedback',
        populate: {
            path: 'user',  
            model: 'Users', 
            select: '_id',  
        },
    });

    const users = await UsersSchema.find({ role: 'user' })
      .populate('purchasedCourses');
  
      const orders = await OrdersSchema.find()
        .populate({
          path: 'user',
          model: 'Users', 
          select: '_id',
        })
        .populate({
          path: 'orderItems.course',
          model: 'Courses', 
          select: 'name', 
        });
  
      const data = {
        counts: {
          courses: courses.length,
          users: users.length,
          lectures: courses.reduce((acc, course) => acc + course.numOfLectures, 0),
          purchasedCourses: orders.length,
        },
        courses,
        users,
        orders,
      };
  
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Error loading orders data', 
        error: error.message 
      });
    }
});

exports.deleteCourseByAdmin = asyncHandler(async (req, res, next) => {
    const courseId = req.params.courseId; 

    const course = await CoursesSchema.findById(courseId); 
    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${courseId}`, 404)); 
    }

    await LectureSchema.deleteMany({ course: courseId });

    await FeedbackSchema.deleteMany({ course: courseId });

    await CoursesSchema.findByIdAndDelete(courseId);

    res.status(200).json({
        success: true,
        data: {},
        message: 'Course and associated lectures and feedback deleted, orders retained.'
    });
});


exports.deleteUserByAdmin = asyncHandler(async (req, res, next) => {
    const userId = req.params.userId;

    const user = await UsersSchema.findById(userId);
    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${userId}`, 404));
    }

    await UsersSchema.findByIdAndDelete(userId);

    res.status(200).json({
        success: true,
        data: {},
        message: 'User deleted successfully.'
    });
});

exports.deleteOrderByAdmin = asyncHandler(async (req, res, next) => {
  const orderId = req.params.orderId; 

  const order = await OrdersSchema.findById(orderId); 
  if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${orderId}`, 404)); 
  }

  await OrdersSchema.findByIdAndDelete(orderId);

  res.status(200).json({
      success: true,
      data: {},
      message: 'Order deleted successfully.'
  });
});

