const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [50, 'Name can not be more than 50 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please add your email'],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false,
    },
    image: {
        type: String,
        default: process.env.DEFAULT_PROFILE_IMAGE
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student',
    },
    purchasedCourses: [
        { type: mongoose.Schema.ObjectId, ref: 'Courses' }
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    },
    {
        timestamps: true,
    }
);

//encrypt password
UsersSchema.pre('save', async function(next) {
    //if password is not modified then we will just skip
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//sign jwt and return
UsersSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

//match user entered password to hashed password
UsersSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//generate and hash password token
UsersSchema.methods.getResetPasswordToken = function() {
    //generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex'); 

    //set expire to 10 min
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model('Users', UsersSchema);