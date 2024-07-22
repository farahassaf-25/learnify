const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const CoursesSchema = require('../models/Courses');
const LectureSchema = require('../models/Lectures');

// @desc Get lectures for course
// @route GET /learnify/courses/:courseId/lectures
// @access Public
exports.getCourseLectures = asyncHandler(async (req, res, next) => {
    const course = await CoursesSchema.findById(req.params.courseId);
    if (!course) {
        return next(new ErrorResponse(`No course found with id of ${req.params.courseId}`, 404));
    }

    const lectures = await LectureSchema.find({ course: req.params.courseId }).populate({
        path: 'course',
        select: 'title'
    });

    res.status(200).json({
        success: true,
        count: lectures.length,
        data: lectures
    });
});

// @desc Add lecture
// @route POST /learnify/courses/:courseId/lectures
// @access Public
exports.addLecture = asyncHandler(async (req, res, next) => {
    req.body.course = req.params.courseId;
    req.body.user = req.user.id;

    const course = await CoursesSchema.findById(req.params.courseId);
    if (!course) {
        return next(new ErrorResponse(`No course found with id of ${req.params.courseId}`, 404));
    }

    if (course.user && course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to add a lecture to the course ${course._id}`, 401));
    }

    const lecture = await LectureSchema.create(req.body);
    res.status(200).json({
        success: true,
        data: lecture,
        msg: `Lecture created for course ${req.params.courseId}`
    });
});

// @desc Update lecture
// @route PUT /learnify/courses/:courseId/lectures/:lectureId
// @access Public
exports.updateLecture = asyncHandler(async (req, res, next) => {
    let lecture = await LectureSchema.findById(req.params.lectureId);

    if (!lecture) {
        return next(new ErrorResponse(`Lecture not found with id of ${req.params.lectureId}`, 404));
    }

    const course = await CoursesSchema.findById(req.params.courseId);
    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.courseId}`, 404));
    }

    if (course.user && course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update lecture ${lecture._id}`, 401));
    }

    lecture = await LectureSchema.findByIdAndUpdate(req.params.lectureId, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: lecture
    });
});

// @desc Delete lecture
// @route DELETE /learnify/courses/:courseId/lectures/:lectureId
// @access Public
exports.deleteLecture = asyncHandler(async (req, res, next) => {
    const lecture = await LectureSchema.findById(req.params.lectureId);

    if (!lecture) {
        return next(new ErrorResponse(`Lecture not found with id of ${req.params.lectureId}`, 404));
    }

    const course = await CoursesSchema.findById(req.params.courseId);
    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.courseId}`, 404));
    }

    if (course.user && course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete lecture ${lecture._id}`, 401));
    }

    await LectureSchema.findByIdAndDelete(req.params.lectureId);

    res.status(200).json({
        success: true,
        data: {},
        msg: `Lecture ${req.params.lectureId} deleted from course ${req.params.courseId}`
    });
});
