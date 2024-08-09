const express = require('express');
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

router.post('/', register);
router.post('/login', login);
router.get('/me', protect, authorize('student ', 'admin'), getMe);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:resetToken', resetPassword);
router.put('/updateDetails', protect, updateDetails);
router.put('/updatePassword', protect, updatePassword);
router.post('/logout', logout);

module.exports = router;