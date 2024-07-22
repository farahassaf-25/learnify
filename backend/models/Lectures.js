const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a name'],
        maxlength: [50, 'Name can not be more than 50 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    video: {
        type: String,
        required: [true, 'Please add a video lecture'],
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses',
        required: true
    },
    minimumLevel: {
        type: String,
        required: [true, 'Please add a minimum level'],
        enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        required: true
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('Lectures', LectureSchema);
