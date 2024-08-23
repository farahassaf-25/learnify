const express = require('express');
const { getCourseLectures } = require('../controllers/lectures');

const router = express.Router({ mergeParams: true });

// Lecture routes
router.route('/')
  .get(getCourseLectures);

module.exports = router;
