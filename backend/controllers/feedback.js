const Feedback = require('../models/Feedback');
const Courses = require('../models/Courses');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Add feedback
// @route POST /learnify/auth/me/mycourses/:courseId
// @access Private
exports.addFeedback = asyncHandler(async (req, res, next) => {
    req.body.course = req.params.courseId;
    req.body.user = req.user.id;

    const course = await Courses.findById(req.params.courseId);
    if (!course) {
        return next(new ErrorResponse(`No course found with id of ${req.params.courseId}`, 404));
    }

    const feedback = await Feedback.create(req.body);

    //add feedback to the course
    course.feedback.push(feedback._id);
    await course.save();

    res.status(201).json({
        success: true,
        data: feedback
    });
});

// @desc Get feedback for course
// @route GET /learnify/courses/:courseId
// @access Public
exports.getCourseFeedback = asyncHandler(async (req, res, next) => {
    const feedback = await Feedback.find({ course: req.params.courseId }).populate({
        path: 'user',
        select: 'name'
    });

    res.status(200).json({
        success: true,
        count: feedback.length,
        data: feedback
    });
});
