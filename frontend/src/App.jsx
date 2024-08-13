// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
        
        <Route path="/payment/checkout" element={<PrivateRoute />}>
          <Route index element={<PaymentPage />} />
        </Route>

        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
