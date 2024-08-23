const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  logout,
  getProfile,
  updateDetails,
  deleteAccount,
  getAllPurchasedCoursesAndOwnCourses,
  getPurchasedCourseById,
} = require('../controllers/auth');

const {
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses');

const {
  addLecture,
  updateLecture,
  deleteLecture,
} = require('../controllers/lectures');

const router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:resetToken', resetPassword);
router.put('/updatePassword', protect, updatePassword);
router.post('/logout', logout);

// User profile routes
router.route('/me')
  .get(protect, authorize('student'), getProfile)
  .put(protect, updateDetails)
  .delete(protect, deleteAccount);

// User courses routes
router.route('/me/mycourses')
  .get(protect, authorize('student', 'admin'), getAllPurchasedCoursesAndOwnCourses);

router.get('/me/mycourses/:id', protect, getPurchasedCourseById);

// Course management routes
router.post('/me/create-course', protect, authorize('student', 'admin'), createCourse);
router.post('/me/create-course/:courseId/add-lectures', protect, authorize('student', 'admin'), addLecture);
router.put('/me/mycourses/:id/edit-course', protect, authorize('student', 'admin'), updateCourse);
router.delete('/me/mycourses/:courseId/edit-course', protect, authorize('student', 'admin'), deleteCourse);

// Lecture management routes
router.put('/me/mycourses/:id/edit-lectures/:lectureId', protect, authorize('student', 'admin'), updateLecture);
router.delete('/me/mycourses/:courseId/edit-lectures/:lectureId', protect, authorize('student', 'admin'), deleteLecture);

module.exports = router;
