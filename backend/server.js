const express = require('express');
const connectDB = require('./config/db');
const colors = require('colors');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');

// Route files
const courses = require('./routes/courses');
const lectures = require('./routes/lectures');
const auth = require('./routes/auth');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routes
app.use('/learnify/courses', courses);
app.use('/learnify/lectures', lectures);
app.use('/learnify/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}.`.yellow.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
});
