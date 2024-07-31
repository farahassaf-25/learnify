import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Layout from './layouts/layout';

function App() {
  return (
    <Router>
      <Layout>
        <Navbar />
        {/* Add your routes here */}
      </Layout>
    </Router>
  );
}

export default App;
