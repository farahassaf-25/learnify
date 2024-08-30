import React from 'react';
import logo from '../assets/logo-only.png';

const Footer = () => {
  return (
    <footer className="footer footer-center bg-secondary text-primary-content p-10 mt-10">
      <aside className="flex items-center mb-4">
        <img src={logo} alt="Logo" className="h-16 mr-2" />
        <p className="text-white text-4xl font-bold">Learnify</p>
      </aside>
      <p className="text-white text-lg">
        Copyright © {new Date().getFullYear()} - All rights reserved
      </p> 
    </footer>
  );
};

export default Footer;
