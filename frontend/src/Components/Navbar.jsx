import React from 'react';
import Button from './Button';

const Navbar = () => {
  return (
    <div className="navbar bg-bgColor">
      <div className="navbar-start flex items-center space-x-4">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ marginRight: '-30px' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><a className="text-textColor text-lg hover:border-y-2 hover:border-secondary transition-all">Home</a></li>
            <li><a className="text-textColor text-lg hover:border-y-2 hover:border-secondary transition-all">Courses</a></li>
            <li><a className="text-textColor text-lg hover:border-y-2 hover:border-secondary transition-all">About Us</a></li>
            <li><a className="text-textColor text-lg hover:border-y-2 hover:border-secondary transition-all">Contact Us</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-primary text-2xl lg:text-3xl font-lora">Learnify</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li><a className="text-textColor text-xl hover:border-y-2 hover:border-secondary transition-all">Home</a></li>
          <li><a className="text-textColor text-xl hover:border-y-2 hover:border-secondary transition-all">Courses</a></li>
          <li><a className="text-textColor text-xl hover:border-y-2 hover:border-secondary transition-all">About Us</a></li>
          <li><a className="text-textColor text-xl hover:border-y-2 hover:border-secondary transition-all">Contact Us</a></li>
        </ul>
      </div>
      <div className="navbar-end flex gap-2 lg:gap-4">
        <Button color="primary" to="/login" onClick={() => alert('Login Clicked')}>Login</Button>
        <Button color="secondary" to="/register" onClick={() => alert('Register Clicked')}>Register</Button>
      </div>
    </div>
  );
}

export default Navbar;
