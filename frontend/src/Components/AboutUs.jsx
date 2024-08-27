import React, { useEffect, useState } from 'react';
import aboutImg from '../assets/about.png'; 

const textEntries = [
  {
    text: `
    "Welcome to Learnify, your online education platform designed to help you learn anything, anytime, and anywhere. 
    Our mission is to provide high-quality educational content to learners around the world. 
    Whether you're looking to advance your career, acquire new skills, or pursue a hobby, Learnify is here to support your journey."
    `,
  },
  {
    text: `
    "At Learnify, we believe that education should be accessible to everyone. 
    That's why we offer a diverse range of courses that cater to various interests and skill levels.
    Join a community of learners and instructors who are passionate about sharing knowledge and helping each other grow."
    `,
  },
  {
    text: `
    "Our platform features interactive lessons, expert instructors, and a wealth of resources to enhance your learning experience. 
    With flexible scheduling and a user-friendly interface, you can learn at your own pace and on your own terms."
    `,
  },
  {
    text: `
    "Explore our vast library of courses, from technology and business to arts and personal development. 
    Each course is designed to provide you with practical skills and knowledge that you can apply in real-life situations."
    `,
  },
];

const AboutUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textEntries.length);
    }, 7000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between container mx-auto p-4 py-16">
      <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img
          src={aboutImg}
          alt="About Learnify"
          className="w-3/4 md:w-1/2 lg:w-2/3 h-auto drop-shadow-2xl animate-float"
        />
      </div>
      <div className="md:w-1/2 text-center md:text-left">
        <blockquote className="text-4xl mt-4 italic text-textColor border-l-4 border-secondary pl-4">
          {textEntries[currentIndex].text} 
        </blockquote>
        <div className="flex justify-center md:justify-start mt-4">
          {textEntries.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
              onClick={() => setCurrentIndex(index)} 
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
