import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, color, to, onClick, className }) => {
  const baseClasses = "font-bold py-4 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const colorClasses = {
    primary: "bg-primary hover:bg-primary-light text-white focus:ring-primary",
    secondary: "bg-secondary hover:bg-secondary-light text-white focus:ring-secondary",
  };

  const classes = `${baseClasses} ${colorClasses[color] || ''} ${className || ''}`;

  if (to) {
    return <Link to={to} className={classes}>{children}</Link>;
  }

  return <button onClick={onClick} className={classes}>{children}</button>;
};

export default Button;