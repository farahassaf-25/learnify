const express = require('express');
const { getCourseLectures, addLecture, deleteLecture, updateLecture } = require('../controllers/lectures');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(getCourseLectures)
    .post(protect, authorize('student', 'admin'), addLecture);

router
    .route('/:lectureId')
    .put(protect, authorize('student', 'admin'), updateLecture)
    .delete(protect, authorize('student', 'admin'), deleteLecture);

module.exports = router;
