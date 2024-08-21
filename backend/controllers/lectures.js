const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const CoursesSchema = require('../models/Courses');
const LectureSchema = require('../models/Lectures');
const uploadVideo = require('../config/uploadVideo');
const deleteFileFromS3 = require('../config/deleteFileFromS3');

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
// @access Private
exports.addLecture = asyncHandler(async (req, res, next) => {
    uploadVideo.single('video')(req, res, async (err) => {
        if (err) {
            return next(new ErrorResponse(err.message, 400));
        }

        const { title } = req.body;
        const video = req.file ? req.file.location : null;

        if (!title || !video) {
            return next(new ErrorResponse('Please provide title and video for the lecture', 400));
        }

        req.body.video = video;
        req.body.course = req.params.courseId;
        req.body.user = req.user.id;

        const course = await CoursesSchema.findById(req.params.courseId);
        if (!course) {
            return next(new ErrorResponse(`No course found with id of ${req.params.courseId}`, 404));
        }

        if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(new ErrorResponse(`User ${req.user.id} is not authorized to add a lecture to this course`, 401));
        }

        try {
            const lecture = await LectureSchema.create(req.body);

            //update course with the new lecture ID
            course.lectures.push(lecture._id);
            await course.save();

            res.status(200).json({
                success: true,
                data: lecture,
                msg: `Lecture created for course ${req.params.courseId}`
            });
        } catch (error) {
            return next(new ErrorResponse('Error creating lecture', 500));
        }
    });
});

// @desc Update lecture
// @route PUT /learnify/me/mycourses/:courseId/lectures/:lectureId
// @access Public
exports.updateLecture = asyncHandler(async (req, res, next) => {
    let lecture = await LectureSchema.findById(req.params.lectureId);

    if (!lecture) {
        return next(new ErrorResponse(`Lecture not found with id of ${req.params.lectureId}`, 404));
    }

    uploadVideo.single('video')(req, res, async (err) => {
        if(err) {
            console.error('Upload error: ', err);
            return next(new ErrorResponse(err.message, 400));
        }

        //update lecture details
        lecture.title = req.body.title || lecture.title;
        lecture.video = req.body.video || lecture.video;

        if (req.file) {
            lecture.video = req.file.location;
        }

        const updatedLecture = await lecture.save();
    
        res.status(200).json({
            success: true,
            data: lecture
        });
    });
});

// @desc Delete lecture
// @route DELETE /learnify/me/mycourses/:courseId/lectures/:lectureId
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

    //delete the video file from S3
    await deleteFileFromS3(lecture.video.split('/').pop()); //pass the file name

    await LectureSchema.findByIdAndDelete(req.params.lectureId);

    res.status(200).json({
        success: true,
        data: {},
        msg: `Lecture ${req.params.lectureId} deleted from course ${req.params.courseId}`
    });
});