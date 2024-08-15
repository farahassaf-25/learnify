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

const { updateDetails } = require('../controllers/users');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:resetToken', resetPassword);
router.put('/updatePassword', protect, updatePassword);
router.post('/logout', logout);

router.put('/me', protect, updateDetails);

module.exports = router;