const express = require('express');
const { getAllCourses, getCourse, createCourse, updateCourse, deleteCourse, uploadImage } = require('../controllers/courses');
const { protect, authorize } = require('../middleware/auth');
const lectureRouter = require('./lectures');

const router = express.Router();

router.use('/:courseId/lectures', lectureRouter);

router
    .route('/')
    .get(getAllCourses)
    .post(protect, authorize('student', 'admin'), createCourse);

router
    .route('/:id')
    .get(getCourse)
    .put(protect, authorize('student', 'admin'), updateCourse)
    .delete(protect, authorize('student', 'admin'), deleteCourse);

module.exports = router;
