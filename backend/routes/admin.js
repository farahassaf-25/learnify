const express = require('express');
const {
    getDashboardData,
    deleteCourseByAdmin,
    deleteUserByAdmin
} = require('../controllers/admin');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/dashboard').get(protect, getDashboardData);

router.delete('/dashboard/course/:courseId', protect, deleteCourseByAdmin);
router.delete('/dashboard/user/:userId', protect, deleteUserByAdmin);

module.exports = router;
