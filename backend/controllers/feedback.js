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

    //recalculate average rating
    const avgRating = await Feedback.aggregate([
        { $match: { course: course._id } },
        { $group: { _id: '$course', averageRating: { $avg: '$rating' } } }
    ]);

    if (avgRating.length > 0) {
        course.averageRating = avgRating[0].averageRating.toFixed(1);
        await course.save();
    }

    res.status(201).json({
        success: true,
        data: feedback
    });
});
