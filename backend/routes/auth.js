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
  getPurchasedCourseById
} = require('../controllers/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:resetToken', resetPassword);
router.put('/updatePassword', protect, updatePassword);
router.post('/logout', logout);

router.route('/me')
  .get(protect, authorize('student'), getProfile)
  .put(protect, updateDetails)
  .delete(protect, deleteAccount);

router.route('/me/mycourses')
  .get(protect, authorize('student', 'admin'), getAllPurchasedCoursesAndOwnCourses);

  router.get('/me/mycourses/:id', protect, getPurchasedCourseById);

module.exports = router;
