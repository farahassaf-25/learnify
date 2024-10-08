const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/Users');
const uploadImage = require('../config/uploadImage.js');
const crypto = require('crypto');
const Course = require('../models/Courses');

//@desc register user
//@route POST /learnify/auth/register
//@access public
exports.register = asyncHandler(async(req, res, next) => {
    uploadImage.single('image')(req, res, async(err) => {
        if(err) {
            console.error('Upload error:', err);
            return next(new ErrorResponse(err.message, 400));
        }

        const { name, email, password, role } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            role,
            image: req.file ? req.file.location : undefined,
        });

        sendTokenResponse(user, 200, res);  
    });
});

// @desc Login user
// @route POST /learnify/auth/login
// @access Public
exports.login = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;

    //validate email and password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    //check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 400));
    }

    //check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 400));
    }

    sendTokenResponse(user, 200, res);
});

//@desc Forgot password
//@route POST /learnify/auth/forgotPassword
//@access public
exports.forgotPassword = asyncHandler(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorResponse('There is no user with this email', 404));
    }
    //get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    //create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/learnify/auth/resetPassword/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a put request to: \n\n ${resetUrl}`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        });
        res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorResponse('Email could not be sent', 500));
    }
});

//@desc Reset password
//@route PUT /learnify/auth/resetPassword/:resetToken
//@access public
exports.resetPassword = asyncHandler(async(req, res, next) => {
    //get hashed token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken, 
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorResponse('Invalid token', 400));
    }

    //set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
});

//@desc update password
//@route PUT /learnify/auth/updatePassword
//@access private
exports.updatePassword = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    //check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('Password is incorrect', 401));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user, 200, res);
});

//@desc Logout user and  clear cookie
//@route GET /learnify/auth/logout
//@access private
exports.logout = asyncHandler(async(req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        data: {}
    });
});

//get token from model, create cookie & send response
const sendTokenResponse = (user, statusCode, res) => {
    //create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000), // 30days
        httpOnly: true
    };  
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                role: user.role
            }
        });
}

// @desc      Get single user with courses
// @route     GET /learnify/auth/me
// @access    Private
exports.getProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password');
  
    if (!user) {
        return next(new ErrorResponse(`User not found`, 404));
    }

    const ownCourses = await Course.find({ user: req.user.id }).populate('lectures');

    const purchasedCourses = await Course.find({ _id: { $in: user.purchasedCourses } }).populate('lectures');

    const responseData = {
        ...user.toObject(),
        ownCourses, 
        purchasedCourses, 
    };

    res.status(200).json({
        success: true,
        data: responseData
    });
});


//@desc update user details
//@route PUT /learnify/auth/me
//@access private
exports.updateDetails = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id);

    if(!user) {
        return next(new ErrorResponse('User not found', 404));
    }

    uploadImage.single('image')(req, res, async(err) => {
        if(err) {
            console.error('Upload error:', err);
            return next(new ErrorResponse(err.message, 400));
        }

        //update user details
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            user.password = req.body.password;
        }

        if(req.file) {
            user.image = req.file.location;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            data: updatedUser
        });
    })
});

// @desc Delete user account
// @route DELETE /learnify/auth/me
// @access Private
exports.deleteAccount= asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }

    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({
        success: true,
        data: {},
        msg: `Account deleted`
    });
});

// @desc      Get all purchased courses
// @route     GET /learnify/me/mycourses
// @access    Private
exports.getAllPurchasedCoursesAndOwnCourses = asyncHandler(async (req, res, next) => {
    const ownCourses = await Course.find({ user: req.user.id }).populate('lectures');
    const purchasedCourses = await Course.find({ _id: { $in: req.user.purchasedCourses } }).populate('lectures');

    const allCourses = {
        ownCourses,
        purchasedCourses
    };

    res.status(200).json({
        success: true,
        data: allCourses
    });
});

// @desc      Check if user has purchased a course
// @route     GET /learnify/me/mycourses/:id
// @access    Private
exports.getPurchasedCourseById = asyncHandler(async (req, res, next) => {
    const courseId = req.params.id; 

    const course = await Course.findById(courseId).populate('lectures');

    if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const isOwner = course.user.toString() === req.user.id;
    const isPurchased = req.user.purchasedCourses.includes(courseId);

    if (!isOwner && !isPurchased) {
        return res.status(403).json({ success: false, message: 'You do not have access to this course' });
    }

    const responseData = {
        ...course._doc, 
        isPurchased 
    };

    res.status(200).json({
        success: true,
        data: responseData 
    });
});
