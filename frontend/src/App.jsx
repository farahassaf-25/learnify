import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import RequireAuth from './Components/RequireAuth';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AllCoursesPage from './pages/AllCoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';
import UserProfilePage from './pages/UserProfilePage';
import AddCoursePage from './pages/AddCoursePage';
import AddLecturePage from './pages/AddLecturesPage';
import CourseLecturesPage from './pages/CourseLecturesPage';
import EditCoursePage from './pages/EditCoursePage';
import MyCoursesPage from './pages/MyCoursesPage';
import EditLecturesPage from './pages/EditLecturesPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import DeniedPage from './pages/DeniedPage'; 

const App = () => {
  return (
    <>
      <MainLayout>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<AllCoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* student pages */}
          <Route element={<RequireAuth allowedRoles={['student']} />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/me" element={<UserProfilePage />} />
            <Route path="/payment/checkout" element={<PaymentPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/me/mycourses" element={<MyCoursesPage />} />
            <Route path="/me/mycourses/:courseId" element={<CourseLecturesPage />} />
            <Route path="/me/create-course" element={<AddCoursePage />} />
            <Route path="/me/create-course/:courseId/add-lectures" element={<AddLecturePage />} />
            <Route path="/me/mycourses/:courseId/edit-course" element={<EditCoursePage />} />
            <Route path="/me/mycourses/:courseId/edit-lectures" element={<EditLecturesPage />} />
          </Route>

          {/* admin pages */}
          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path='/dashboard' element={<AdminDashboard />} />
          </Route>

          {/* Denied Page */}
          <Route path="/denied" element={<DeniedPage />} />
        </Routes>
        <ToastContainer />
      </MainLayout>
      <Footer />
    </>
  );
};

export default App;
