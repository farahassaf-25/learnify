import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../Redux/slices/userApiSlice';
import { logout } from '../Redux/slices/authSlice';
import Button from './Button';
import logo from '../assets/logo-only.png';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ scrollToAbout, scrollToContact }) => {
  const cart = useSelector((state) => state.cart);
  
  //get user info from redux
  const { userInfo } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItemsCount = cart.cartItems.length;

  const [logoutApiCall]  = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="navbar bg-bgColor flex-shrink-0">
      <div className="navbar-start flex items-center space-x-5">
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
            <li><NavLink to="/">About Us</NavLink></li>
            <li><NavLink to="/">Contact Us</NavLink></li>
            <li><NavLink to='/cart'>My Cart</NavLink></li>
            <div className="flex justify-between mt-4 space-x-2">
              { userInfo ? (
                <>
                  <li>
                    <Button color="primary" to="/me">Profile</Button>
                  </li>
                  <li>
                    <Button color="secondary" onClick={logoutHandler}>Logout</Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Button color="primary" to="/login">Login</Button>
                  </li>
                  <li>
                    <Button color="secondary" to="/register">Register</Button>
                  </li>
                </>
              )
              }
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
          <li><NavLink to="/" onClick={scrollToAbout}>About Us</NavLink></li>
          <li><NavLink to="/" onClick={scrollToContact}>Contact Us</NavLink></li>
        </ul>
      </div>
      <div className="navbar-end hidden lg:flex gap-2 lg:gap-4">
        <Link to="/cart" className="relative">
          <FaShoppingCart className="text-textColor text-4xl mr-4" />
          {cartItemsCount > 0 && (
            <span className="absolute top-0 left-7 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {cartItemsCount}
            </span>
          )}
        </Link>
        {userInfo ? (
          <>
            <Button color="primary" to="/me">Profile</Button>
            <Button color="secondary" onClick={logoutHandler}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="primary" to="/login">Login</Button>
            <Button color="secondary" to="/register">Register</Button>
          </>
        )}
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
