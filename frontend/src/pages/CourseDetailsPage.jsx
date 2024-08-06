import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../Components/Button';
import { useGetCourseDetailsQuery } from '../slices/coursesApiSlice';
import Loader from '../Components/Loader';
import Message from '../Components/Message';

const CourseDetailsPage = () => {
  const { id } = useParams();
  // console.log("Course ID:", id);
  const { data: course, isLoading, error } = useGetCourseDetailsQuery(id);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <div className="container mx-auto p-4">
      <Button color="primary" to="/courses">
        Go Back
      </Button>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='error'>{error?.data?.message || error.error}</Message>
      ) : course && course.data ? (
        <div className="py-10 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-primary">{course.data.title}</h1>
          <img
            src={course.data.image}
            alt={course.data.title}
            className="w-full h-64 object-cover mb-6 rounded-lg shadow-lg"
          />
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2 text-secondary">Description:</h2>
              <p className="text-lg text-gray-700">{course.data.description}</p>
            </div>
            <div className="flex items-center">
              <h2 className="text-2xl font-semibold mb-2 text-secondary">Price:</h2>
              <p className="text-lg text-gray-700 ml-2">{course.data.price} $</p>
            </div>
            <div className="flex items-center">
              <h2 className="text-2xl font-semibold mb-2 text-secondary">Category:</h2>
              <p className="text-lg text-gray-700 ml-2">{course.data.category?.join(', ') || 'Not Specified'}</p>
            </div>
            <div className="flex items-center">
              <h2 className="text-2xl font-semibold mb-2 text-secondary">Level:</h2>
              <p className="text-lg text-gray-700 ml-2">{course.data.minimumLevel}</p>
            </div>
            <div className="flex items-center">
              <h2 className="text-2xl font-semibold mb-2 text-secondary">Weeks:</h2>
              <p className="text-lg text-gray-700 ml-2">{course.data.weeks}</p>
            </div>
            <div className="flex items-center">
              <h2 className="text-2xl font-semibold mb-2 text-secondary">Number of Lectures:</h2>
              <p className="text-lg text-gray-700 ml-2">{course.data.numOfLectures}</p>
            </div>
            <div className="flex items-center">
              <h2 className="text-2xl font-semibold mb-2 text-secondary">Creator:</h2>
              <p className="text-lg text-gray-700 ml-2">{course.data.creatorName}</p>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Button color="primary">Show All Lectures</Button>
          </div>
          {isLoggedIn && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-secondary mb-4">Lectures</h2>
              {course.data.lectures.map((lecture, index) => (
                <div key={index} className="mb-2">
                  <h3 className="text-xl font-semibold">{lecture.title}</h3>
                  <p>{lecture.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>No course data available</div>
      )}
    </div>
  );
};

export default CourseDetailsPage;
