const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const CoursesSchema = require('../models/Courses');
const uploadImage = require('../config/uploadImage.js');

// @desc Get all courses
// @route GET /learnify/courses
// @access Public
exports.getAllCourses = asyncHandler(async (req, res, next) => {
    const keyword = req.query.keyword || '';
    const category = req.query.category || '';

    const query = {};
    if (keyword) {
        query.title = { $regex: keyword, $options: 'i' };
    }
    if (category) {
        query.category = { $regex: category, $options: 'i' };
    }

    const courses = await CoursesSchema.find(query).select("-lectures");
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses,
        msg: "Fetch all courses"
    });
});

// @desc Get single course
// @route GET /learnify/courses/:id
// @access Public
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await CoursesSchema.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({
        success: true,
        data: course,
        msg: `Show single course ${req.params.id}`
    });
});

// @desc Create new course
// @route POST /learnify/courses
// @access Private
exports.createCourse = asyncHandler(async (req, res, next) => {
    //image upload
    uploadImage.single('image')(req, res, async(err) => {
        if(err) {
            return next(new ErrorResponse(err.message, 400));
        }

        //add user to req.body
        req.body.creator = req.user.id;

        //check for published course
        const publishedCourse = await CoursesSchema.findOne({ user: req.user.id });
        //if user is not an admin, they can only add one course
        if (publishedCourse && req.user.role !== 'admin') {
            return next(new ErrorResponse(`The user with ID ${req.user.id} has already published a course`, 400));
        }

        //set img url if uploaded
        if(req.file) {
            req.body.image = req.file.location; //get image url from s3
        }

        const course = await CoursesSchema.create(req.body);
        res.status(200).json({
            success: true,
            data: course,
            msg: "Course created, you can add lectures now"
        });
    })
});

// @desc Update course
// @route PUT /learnify/courses/:id
// @access Public
exports.updateCourse = asyncHandler(async (req, res, next) => {
    let course = await CoursesSchema.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse('Course not found', 404));
    }

    if(course.user && (course.user.toString() !== req.user.id && req.user.role !== 'admin')) {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this course`, 401));
    }

    course = await CoursesSchema.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: course,
        msg: `Update course ${req.params.id}`
    });
});

// @desc Delete course
// @route DELETE /learnify/courses/:id
// @access Public
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await CoursesSchema.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse('Course not found', 404));
    }

    if (course.user && (course.user.toString() !== req.user.id && req.user.role !== 'admin')) {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this course`, 401));
    }

    await CoursesSchema.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: {},
        msg: `Delete course ${req.params.id}`
    });
});
