# Learnify E-Learning Platform

## Project Overview
Learnify is an e-learning platform where users can browse diverse courses, enroll, and even share their own courses. Built with Node.js, Express.js, MongoDB, React.js, and TailwindCSS.

## Features

### Admin:
- Login
- Change Password
- Logout
- Manage Students:
  - Edit Student
  - Delete Student
- Manage Instructors:
  - Edit Instructor
  - Delete Instructor
- Manage Courses:
  - Add Course
  - Edit Course
  - Delete Course
- Manage Quizzes:
  - Add Quiz for a Course
  - Update Quiz
  - Delete Quiz

### Student:
- Login
- Register
- Change Password
- Logout
- Manage Own Courses:
  - Add Course
  - Edit Course
  - Delete Course
- Update Profile
- Delete Account
- Subscribe to Courses
- Unsubscribe from Courses
- Payment Method for Subscription:
  - Stripe
  - PayPal
  - Razorpay

### Instructor:
- Login
- Register
- Change Password
- Logout
- Manage Courses:
  - Add Course
  - Edit Course
  - Delete Course
- Manage Quizzes:
  - Add Quiz for a Course
  - Update Quiz

### Additional Features:
- Allow Students to Give Feedback on Courses
- Notifications for Updates on Course Activities
- Subscriptions Email
- Contact Us Form on the Landing Page (accessible by logged-in students and visitors)

## Tech Stack

### Backend:
- Node.js
- Express.js
- MongoDB

### Frontend:
- React.js
- TailwindCSS



# Learnify Project

## File Structure

```plaintext
Learnify/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── .env
│   ├── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── helpers/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── Redux/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   ├── .env
│   ├── package.json
│   ├── README.md

