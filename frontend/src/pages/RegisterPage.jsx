import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../Redux/slices/userApiSlice';
import { setCredentials } from '../Redux/slices/authSlice';
import InputField from '../Components/InputField';
import MiddleText from '../Components/MiddleText';
import Button from '../Components/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [register, { isLoading }] = useRegisterMutation();

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
  
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
  
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      
      if (image) {
        formData.append('image', image); 
      }
  
      const res = await register(formData).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect || '/');
    } catch (err) {
      if (err?.data?.error) {
        toast.error(err.data.error); 
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };  

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] p-4">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <MiddleText text='Register' />
        <form onSubmit={submitHandler} className="w-full">
          <InputField
            id="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <div className="relative mb-4">
            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-10 cursor-pointer text-secondary"
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 mb-1">
              Image
            </label>
            <input
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button
              type="submit"
              color='primary'
              className={`w-full text-white py-4 rounded ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
            {isLoading ? 'Loading...' : 'Sign Up'}
          </Button>
        </form>
        <p className="mt-4">
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-primary font-bold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;