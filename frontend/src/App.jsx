import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import Navbar from './Components/Navbar';
import AllCoursesPage from './pages/AllCoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<AllCoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
      </Routes>
    </>
  );
};

export default App;
