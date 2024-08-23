import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../Redux/slices/userApiSlice';
import { setCredentials } from '../Redux/slices/authSlice';
import InputField from '../Components/InputField';
import MiddleText from '../Components/MiddleText';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Button from '../Components/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const search = new URLSearchParams(location.search);
  const redirect = search.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(err?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] p-4">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <MiddleText text='Login' />
        <form onSubmit={submitHandler} className="w-full">
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative mb-4">
            <InputField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 cursor-pointer text-secondary"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            {/* <Link to="/forgot-password" className="text-sm text-blue-500 underline">
              Forgot Password?
            </Link> */}
            <Button
              type="submit"
              color='primary'
              className={`w-full text-white py-4 rounded ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
          </div>
        </form>
        <p className="mt-4">
          Don't have an account?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-primary font-bold underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;