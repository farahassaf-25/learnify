const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/Users');
const uploadImage = require('../config/uploadImage.js');

// @desc      Get single user
// @route     GET /learnify/auth/me
// @access    Private/Admin
exports.getProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password');
  
    if(!user){
      return next(new ErrorResponse(`User not found`, 404));
    }
  
    res.status(200).json({
      success: true,
      data: user
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

