const mongoose = require('mongoose');
const slugify = require('slugify');

const CoursesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a course title'],
        unique: true,
        trim: true,
        minLength: [4, 'Course title must be at leart 4 characters'],
        maxlength: [100, 'Course title can not be more than 100 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        minLength: [10, 'Description must be at least 10 characters'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    category: {
        type: [String], //array of strings
        required: [true, 'Category is required'],
        enum: ['Web Development', 'Data Structures', 'Algorithms', 'Operating System', 'Computer Networks', 'Databases', 'Other']
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        default: 0
    },
    weeks: {
        type: Number,
        required: [true, 'Please add number of weeks'],
    },
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Lectures'
        },
    ],
    views: {
        type: Number,
        default: 0,
    },
    numOfLectures: {
        type: Number,
        default: 0,
    },
    creatorName: {
        type: String,
        required: [true, 'Please add a creator name'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
},
{
    timestamps: true,
}
);

//create slug from title
CoursesSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

module.exports = mongoose.model('Courses', CoursesSchema);
