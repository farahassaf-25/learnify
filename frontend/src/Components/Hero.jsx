import React from 'react';
import Button from './Button';
import heroImg from '../assets/hero.png';

const Hero = () => {
  return (
    <div className="flex-grow flex flex-col md:flex-row items-center justify-center px-8 py-16">
      <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
        <h1 className="text-5xl sm:text-6xl font-bold text-textColor mb-6">
          Learn
          <span className="text-secondary "> Anything, Anytime,</span>
          <br />
          <span className="text-secondary ">Anywhere,</span>
          <br />
          with <span className="text-primary animate-pulse">Learnify</span>
        </h1>
        <p className="text-xl text-textColor mb-8">
          "Whether you're looking to advance your career or pick up a new hobby, Learnify has something for you."
        </p>
        <Button color="primary" to='/courses'>Get Started</Button>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img
          src={heroImg}
          alt="Learning illustration"
          className="w-3/4 md:w-1/2 lg:w-2/3 h-auto drop-shadow-2xl animate-float"
        />
      </div>
    </div>
  );
};

export default Hero;
