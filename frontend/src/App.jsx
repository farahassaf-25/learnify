import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AllCoursesPage from './pages/AllCoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './pages/PrivateRoute';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';
import UserProfilePage from './pages/UserProfilePage';
import AddCoursePage from './pages/AddCoursePage';
import AddLecturePage from './pages/AddLecturesPage';

const App = () => {
  return (
    <MainLayout>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<AllCoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/payment/checkout' element={<PaymentPage />} />
        <Route path='/me' element={<UserProfilePage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path='/create-course' element={<AddCoursePage />} />
        <Route path="/courses/:courseId/add-lectures" element={<AddLecturePage />} />
      </Route>
      </Routes>
      <ToastContainer />
    </MainLayout>
  );
};

export default App;
