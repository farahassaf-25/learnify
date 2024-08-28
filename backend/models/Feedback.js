const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment'],
    },
    rating: {
        type: Number,
        required: [true, 'Please add a rating'],
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
