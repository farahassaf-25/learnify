const express = require('express');
const { getAllCourses, getCourse } = require('../controllers/courses');
const lectureRouter = require('./lectures');

const router = express.Router();

router.use('/:courseId/lectures', lectureRouter);

// Course routes
router.route('/')
  .get(getAllCourses);

router.route('/:id')
  .get(getCourse);

module.exports = router;
