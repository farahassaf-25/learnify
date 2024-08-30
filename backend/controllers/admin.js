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

