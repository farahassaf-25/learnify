const express = require('express');
const uploadImage = require('../config/uploadImage');
const { 
    register, 
    login, 
    forgotPassword, 
    resetPassword, 
    updatePassword,
    logout 
} = require('../controllers/auth');

const { getProfile, updateDetails } = require('../controllers/users');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:resetToken', resetPassword);
router.put('/updatePassword', protect, updatePassword);
router.post('/logout', logout);

router.route('/me')
  .get(protect, getProfile)
  .put(protect, updateDetails);

module.exports = router;
