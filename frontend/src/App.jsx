import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
