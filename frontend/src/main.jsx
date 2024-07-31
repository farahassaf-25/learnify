import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Set the theme attribute
document.documentElement.setAttribute('data-theme', 'mytheme');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
