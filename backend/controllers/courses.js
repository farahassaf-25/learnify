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
        req.body.user = req.user.id;
        req.body.creatorId = req.user.id;
        req.body.creatorName = req.user.name;

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
// @route PUT /learnify/courses/:courseId
// @access Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
    let course = await CoursesSchema.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse('Course not found', 404));
    }

    const newNumOfLectures = req.body.numOfLectures;

    //check if the numOfLectures is decreasing
    if (newNumOfLectures < course.numOfLectures) {
        return next(new ErrorResponse('Cannot decrease the number of lectures once added.', 400));
    }

    uploadImage.single('image')(req, res, async (err) => {
        if (err) {
            console.error('Upload error:', err);
            return next(new ErrorResponse(err.message, 400));
        }

        //update course details
        course.title = req.body.title || course.title;
        course.description = req.body.description || course.description;
        course.category = req.body.category || course.category;
        course.minimumLevel = req.body.minimumLevel || course.minimumLevel;
        course.price = req.body.price || course.price;
        course.weeks = req.body.weeks || course.weeks;
        course.numOfLectures = req.body.numOfLectures || course.numOfLectures;
        course.creatorName = req.body.creatorName || course.creatorName;

        if (req.file) {
            course.image = req.file.location;
        }

        const updatedCourse = await course.save();

        res.status(200).json({
            success: true,
            data: updatedCourse,
            msg: `Update course ${req.params.id}`
        });
    });
});

// @desc Delete course
// @route DELETE /learnify/courses/:courseId
// @access Public
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await CoursesSchema.findById(req.params.id).populate('lectures');

    if (!course) {
        return next(new ErrorResponse('Course not found', 404));
    }

    if (course.user && (course.user.toString() !== req.user.id && req.user.role !== 'admin')) {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this course`, 401));
    }

    // Check if the course has lectures
    if (course.lectures.length > 0) {
        // Notify the user and ask for confirmation (this part is typically handled on the frontend)
        return res.status(400).json({
            success: false,
            msg: 'This course has lectures associated with it. Do you want to delete the course and all its lectures? Please confirm.'
        });
    }

    // If the user confirms deletion of lectures (handle this confirmation on the frontend), proceed
    await CoursesSchema.findByIdAndDelete(req.params.id);

    // If you want to delete the lectures as well, you can add logic here
    // await LectureSchema.deleteMany({ course: req.params.id });

    res.status(200).json({
        success: true,
        data: {},
        msg: `Course ${req.params.id} deleted`
    });
});

