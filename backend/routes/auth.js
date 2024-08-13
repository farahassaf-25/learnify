const express = require('express');
const uploadImage = require('../config/uploadImage');
const { 
    register, 
    login, 
    getMe, 
    forgotPassword, 
    resetPassword, 
    updateDetails,
    updatePassword,
    logout 
} = require('../controllers/auth');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', uploadImage.single('avatar'), register);
router.post('/login', login);
router.get('/me', protect, authorize('student ', 'admin'), getMe);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:resetToken', resetPassword);
router.put('/updateDetails', protect, uploadImage.single('avatar'), updateDetails);
router.put('/updatePassword', protect, updatePassword);
router.post('/logout', logout);

module.exports = router;