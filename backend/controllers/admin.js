const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const CoursesSchema = require('../models/Courses');
const LectureSchema = require('../models/Lectures');
const UsersSchema = require('../models/Users');
const FeedbackSchema = require('../models/Feedback');
const OrdersSchema = require('../models/Order');

exports.getDashboardData = asyncHandler(async (req, res) => {
    const courses = await CoursesSchema.countDocuments({});
    const users = await UsersSchema.countDocuments({ role: 'student' });
    const lectures = await LectureSchema.countDocuments({});
    const purchasedCourses = await OrdersSchema.countDocuments({});

    const allCourses = await CoursesSchema.find({})
        .select("-lectures")
        .sort({ createdAt: -1 })
        .populate({
            path: 'feedback',
            select: 'user comment',
            populate: {
                path: 'user',
                select: '_id',
                model: 'Users' 
            },
        });

    const allUsers = await UsersSchema.find({ role: 'student' })
        .populate('purchasedCourses'); 

    res.status(200).json({
        success: true,
        data: {
            counts: { courses, users, lectures, purchasedCourses },
            courses: allCourses,
            users: allUsers
        },
    });
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



