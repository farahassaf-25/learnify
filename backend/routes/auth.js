const express = require('express');
const uploadImage = require('../config/uploadImage');
const { 
    register, 
    login, 
    forgotPassword, 
    resetPassword, 
    updateDetails,
    updatePassword,
    logout 
} = require('../controllers/auth');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:resetToken', resetPassword);
router.put('/updateDetails', protect, uploadImage.single('avatar'), updateDetails);
router.put('/updatePassword', protect, updatePassword);
router.post('/logout', logout);

module.exports = router;