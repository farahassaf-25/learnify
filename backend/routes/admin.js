const express = require('express');
const {
    getDashboardData,
    deleteCourseByAdmin,
    deleteUserByAdmin,
    deleteOrderByAdmin
} = require('../controllers/admin');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/dashboard').get(protect, getDashboardData);

router.delete('/dashboard/course/:courseId', protect, deleteCourseByAdmin);
router.delete('/dashboard/user/:userId', protect, deleteUserByAdmin);
router.delete('/dashboard/order/:orderId', protect, deleteOrderByAdmin);

module.exports = router;
