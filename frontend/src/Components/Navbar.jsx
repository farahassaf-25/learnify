import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import logo from '../assets/logo-only.png';

const Navbar = () => {
  return (
    <div className="navbar bg-bgColor flex-shrink-0">
      <div className="navbar-start flex items-center space-x-4">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ marginRight: '-20px' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/courses">Courses</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/contact">Contact Us</NavLink></li>
            <div className="flex justify-between mt-4 space-x-2">
              <li>
                <Button color="primary" to="/login" onClick={() => alert('Login Clicked')}>Login</Button>
              </li>
              <li>
                <Button color="secondary" to="/register" onClick={() => alert('Register Clicked')}>Register</Button>
              </li>
            </div>
          </ul>
        </div>
        <div className="flex items-center space-x-0">
          <img src={logo} alt="logo" className="h-7" />
          <a className="btn btn-ghost text-textColor text-2xl lg:text-3xl">Learnify</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/courses">Courses</NavLink></li>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li><NavLink to="/contact">Contact Us</NavLink></li>
        </ul>
      </div>
      <div className="navbar-end hidden lg:flex gap-2 lg:gap-4">
        <Button color="primary" to="/login">Login</Button>
        <Button color="secondary" to="/register">Register</Button>
      </div>
    </div>
  );
}

const NavLink = ({ to, children }) => {
  return (
    <Link 
      to={to} 
      className="text-textColor font-bold hover:text-primary text-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
    >
      {children}
    </Link>
  );
};

export default Navbar;
