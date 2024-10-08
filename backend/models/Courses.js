const mongoose = require('mongoose');
const slugify = require('slugify');

const CoursesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a course title'],
        unique: true,
        trim: true,
        minLength: [4, 'Course title must be at least 4 characters'],
        maxLength: [100, 'Course title can not be more than 100 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        minLength: [10, 'Description must be at least 10 characters'],
        maxLength: [500, 'Description can not be more than 500 characters']
    },
    category: {
        type: [String], //array of strings
        required: [true, 'Category is required'],
        enum: ['Web Development', 'Data Structures', 'Algorithms', 'Operating System', 'Computer Networks', 'Databases', 'Other']
    },
    minimumLevel: {
        type: String,
        required: [true, 'Please add a minimum level'],
        enum: ['All Levels', 'Beginner', 'Intermediate', 'Advanced']
    },
    image: {
        type: String,
        required: [true, 'Please add an image'],
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
    numOfLectures: {
        type: Number,
        default: 0,
    },
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Lectures'
        },
    ],
    feedback: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Feedback'
        }
    ],
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must can not be more than 5']
    },
    creatorName: {
        type: String,
        required: [true, 'Please add a creator name'],
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
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

//calculate average rating before saving
CoursesSchema.pre('save', async function(next) {
    if(this.feedback.length > 0) {
        const avgRating = await this.model('Feedback').aggregate([
            { $match: { course: this._id }},
            { $group: { _id: '$course', averageRating: { $avg: '$rating'}}}
        ]);

        if(avgRating.length > 0) {
            this.averageRating = avgRating[0].averageRating.toFixed(1);
        }
    }
    next();
});

module.exports = mongoose.model('Courses', CoursesSchema);
