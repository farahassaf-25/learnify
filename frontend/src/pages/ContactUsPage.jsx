import React, { useState } from 'react';
import { toast } from 'react-toastify';
import InputField from '../Components/InputField';
import Button from '../Components/Button';
import MiddleText from '../Components/MiddleText';
import contactImage from '../assets/logo.png';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success('Thank you for contacting us!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className='mt-8'>
      <MiddleText text='Contact Us' />
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between p-4">
        <div className="md:w-1/2 w-full">
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <InputField
              id="name"
              label="Name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="relative mb-4">
              <label htmlFor="message" className="block text-gray-900 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border border-secondary rounded bg-white focus:outline-none focus:ring-2 focus:ring-secondary"
                rows="5"
              ></textarea>
            </div>
            <Button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark focus:outline-none w-full"
            >
              Send Message
            </Button>
          </form>
        </div>
        <div className="md:w-1/2 flex justify-center mt-4 md:mt-0">
          <img
            src={contactImage}
            alt="Contact Us Illustration"
            className="w-full md:w-2/3 lg:w-1/2 h-auto drop-shadow-2xl animate-float"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
