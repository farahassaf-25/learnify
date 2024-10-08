const express = require('express');
const connectDB = require('./config/db');
const colors = require('colors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const limitRequest = require('express-rate-limit');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');

// Route files
const courses = require('./routes/courses');
const lectures = require('./routes/lectures');
const auth = require('./routes/auth');
const orders = require('./routes/orders');
const admin = require('./routes/admin');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Logger middleware
app.use(logger);

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

// Limit requests from the same API
const limit = limitRequest({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 50, // 50 times limit
});
app.use(limit);

// Mount routes
app.use('/learnify/courses', courses);
app.use('/learnify/lectures', lectures);
app.use('/learnify/auth', auth);
app.use('/learnify/payment', orders);
app.use('/learnify/admin', admin);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}.`.yellow.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
});
