import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../Redux/slices/userApiSlice';
import { setCredentials } from '../Redux/slices/authSlice';
import Form from '../Components/Form';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const search = new URLSearchParams(location.search);
  const redirect = search.get('redirect') || '/courses';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    //validation for empty fields
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      //call login, get response, and set credentials
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(err?.data?.message || 'Invalid email or password');
    }
  };

  const loginFields = [
    {
      id: 'email',
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      id: 'password',
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
      extra: (
        <div className="flex justify-between items-center mt-2">
          <Link to="/forgot-password" className="text-sm text-blue-500 underline">
            Forgot Password?
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh]">
      <Form
        title="Login"
        fields={loginFields}
        onSubmit={submitHandler}
        submitLabel="Login"
        isLoading={isLoading}
      />
      <p className="mt-4">
        Don't have an account?{' '}
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-primary font-bold underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
