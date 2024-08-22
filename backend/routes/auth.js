const express = require('express');
const { protect } = require('../middleware/auth');
const { 
  register, 
  login, 
  forgotPassword, 
  resetPassword, 
  updatePassword,
  logout 
} = require('../controllers/auth');
const { 
  getProfile, 
  updateDetails, 
  deleteAccount, 
  getAllPurchasedCoursesAndOwnCourses, 
  getPurchasedCourseById 
} = require('../controllers/users');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:resetToken', resetPassword);
router.put('/updatePassword', protect, updatePassword);
router.post('/logout', logout);

router.route('/me')
  .get(protect, getProfile)
  .put(protect, updateDetails)
  .delete(protect, deleteAccount);

router.get('/me/:courseId', protect, getPurchasedCourseById);

module.exports = router;
