import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../Redux/slices/userApiSlice';
import { setCredentials } from '../Redux/slices/authSlice';
import Form from '../Components/Form';

const RegisterPage = () => {
  const [name, setName] = useState('');  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);

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

  const registerFields = [
    {
        id: 'name',
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter your name',
        value: name,
        onChange: (e) => setName(e.target.value),
    },
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
    },
    {
        id: 'confirmPassword',
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Confirm your password',
        value: confirmPassword,
        onChange: (e) => setConfirmPassword(e.target.value),
    },
    {
        id: 'image',
        name: 'image',
        label: 'Image',
        type: 'file',
        placeholder: 'Upload your image',
        onChange: (e) => setImage(e.target.files[0]),
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh]">
      <Form
        title="Register"
        fields={registerFields}
        onSubmit={submitHandler}
        submitLabel="Sign Up"
        isLoading={isLoading}
      />
      <p className="mt-4">
        Already have an account?{' '}
        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-primary font-bold underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
