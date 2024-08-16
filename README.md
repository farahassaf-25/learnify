# Learnify E-Learning Platform

## Project Overview
Learnify is an e-learning platform where users can browse diverse courses, enroll, and even share their own courses. Built with Node.js, Express.js, MongoDB, React.js + Vite, TailwindCSS and DaisyUI.

## Features

### Admin:
- Login
- Change Password
- Logout
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
  - PayPal 


### Additional Features:
- Allow Students to Give Feedback on Courses
- Notifications for Updates on Course Activities
- Subscriptions Email
- Contact Us Form on the Landing Page (accessible by logged-in students and visitors)

## Tech Stack

### Backend:
- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/products/platform/atlas-database)

### Frontend:
- [React.js + Vite](https://vitejs.dev/guide/)
- [TailwindCSS](https://tailwindcss.com/docs/guides/vite)
- [DaisyUI](https://daisyui.com/)

## Dependecies used:

### Backend:
- [aws-sdk/client-s3](https://www.npmjs.com/package/@aws-sdk/client-s3)
- [aws-sdk/lib-storage](https://www.npmjs.com/package/@aws-sdk/lib-storage)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [colors](https://www.npmjs.com/package/colors)
- [cors](https://www.npmjs.com/package/cors)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [express](https://www.npmjs.com/package/express)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [multer](https://www.npmjs.com/package/multer)
- [multer-s3](https://www.npmjs.com/package/multer-s3)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [slugify](https://www.npmjs.com/package/slugify)

### Frontend:
- [tailwindCSS](https://tailwindcss.com/docs/guides/vite)
- [DaisyUI](https://daisyui.com/docs/install/)
- [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit)
- [axios](https://www.npmjs.com/package/axios)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [react-redux](https://www.npmjs.com/package/react-redux)
- [react-toastify](https://www.npmjs.com/package/react-toastify)

## To run backend:
```
# update scripts in package.json:
"scripts": {
    "start": "node --env-file=.env server.js",
    "dev": "node --watch --env-file=.env server.js"
  },
``` 
```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```
## To run frontend:
```
# Run in dev mode
npm run dev
```
## To run both frontend and backend:
install [concurrently
](https://www.npmjs.com/package/concurrently)
```
# update scripts in package.json:
"scripts": {
    "start": "node --env-file=.env server.js",
    "dev": "node --watch --env-file=.env server.js"
  },
```
```
# run
npm run concurrently
```

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
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── utils/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── Redux/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── package.json
│   ├── README.md
├──.env
├── package.json

```

## Class Diagram

```mermaid
classDiagram
    class User {
        +String name
        +String email
        +String password
        +String role
        +String image
    }

    class Course {
        +String title
        +String slug
        +String description
        +String category
        +String minimumLevel
        +String image
        +Number price
        +Number weeks
        +Number views
        +Number numOfLectures
        +String creatorName
        +Timestamp createdAt
        +Timestamp updatedAt
        +slugify()
    }

    class Lecture {
        +String title
        +String video
        +Timestamp createdAt
        +Timestamp updatedAt
    }

    class Quiz {
        +String title
        +String[] questions
        +Timestamp createdAt
        +Timestamp updatedAt
    }

    User "1" --> "many" Course : creates
    Course "1" --> "many" Lecture : contains
    Course "1" --> "many" Quiz : contains
    Lecture "many" --> "1" Course : belongs to
    Quiz "many" --> "1" Course : belongs to

    class Admin {
        +login()
        +changePassword()
        +logout()
        +getAllUsers()
        +getAllCourses()
        +addCourse()
        +editCourse()
        +deleteCourse()
        +addLecture()
        +editLecture()
        +deleteCourse()
        +getAllLectures()
        +getLecturesForCourse()
        +addQuiz()
        +updateQuiz()
        +deleteQuiz()
    }

    class Student {
        +login()
        +register()
        +changePassword()
        +logout()
        +addCourse()
        +editCourse()
        +deleteCourse()
        +updateProfile()
        +deleteAccount()
        +subscribeToCourse()
        +unsubscribeFromCourse()
        +giveFeedback()
    }

    class Subscription {
        +String method
        +Stripe or Razorpay or Paypal
    }

    class Feedback {
        +String comment
        +Number rating
        +Timestamp createdAt
        +Timestamp updatedAt
    }

    class Notification {
        +String message
        +Timestamp createdAt
        +Timestamp updatedAt
    }

    class ContactForm {
        +String name
        +String email
        +String message
    }

    User "1" --> "many" Subscription : has
    Course "1" --> "many" Feedback : receives
    User "1" --> "many" Feedback : gives
    User "1" --> "many" Notification : receives
    User "many" --> "1" ContactForm : sends
```
