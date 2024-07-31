import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';

const Home = () => {
  return (
    <MainLayout>
      <Navbar />
      <Hero />
    </MainLayout>
  );
}

export default Home;
