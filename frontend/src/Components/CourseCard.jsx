import React, { useState } from 'react';
import Button from './Button';
import { FaStar } from 'react-icons/fa';

const CourseCard = ({ id, image, title, description, price, level, averageRating, onCardClick }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleDescriptionToggle = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div 
      className="card card-compact bg-base-100 w-96 shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl"
      onClick={() => onCardClick(id)} 
    >
      <figure>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          {showFullDescription ? description : `${description.slice(0, 100)}...`}
          {description.length > 100 && (
            <span
              className="text-secondary cursor-pointer"
              onClick={handleDescriptionToggle}
            >
              {showFullDescription ? ' Less' : ' More'}
            </span>
          )}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold text-primary">{price} $</span>
          <span className="text-sm text-gray-600">{level}</span>
        </div>
        <div className="flex items-center mt-2">
          <FaStar className="text-yellow-400 mr-1 text-2xl" />
          <span>{averageRating ? averageRating.toFixed(1) : '(0.0)'}</span>
        </div>
        <div className="card-actions justify-end">
          <Button color="secondary" onClick={() => onCardClick(id)}>Show More</Button> 
        </div>
      </div>
    </div>
  );
};

export default CourseCard;