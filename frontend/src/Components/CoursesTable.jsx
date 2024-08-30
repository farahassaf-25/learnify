import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const CoursesTable = ({ courses }) => {
  return (
    <div className="overflow-x-auto mb-10">
      <table className="table mt-6 border-collapse border-2 border-gray-400">
        <thead>
          <tr className='text-textColor text-xl'>
            <th className="border-2 border-gray-400">Course ID</th>
            <th className="border-2 border-gray-400">Course Image</th>
            <th className="border-2 border-gray-400">Course Name</th>
            <th className="border-2 border-gray-400">Creator Id</th>
            <th className="border-2 border-gray-400">Number of Lectures</th>
            <th className="border-2 border-gray-400">Feedback</th>
            <th className="border-2 border-gray-400">Average Rating</th>
            <th className="border-2 border-gray-400">Price</th>
            <th className="border-2 border-gray-400">Delete</th>
          </tr>
        </thead>
        <tbody className='text-xl text-primary border-2'>
          {courses.map((course) => (
            <CourseRow key={course._id} course={course} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CourseRow = ({ course }) => {
  const [showMoreFeedback, setShowMoreFeedback] = useState(false);
  const maxFeedbackToShow = 1;

  const handleToggleFeedback = () => {
    setShowMoreFeedback(!showMoreFeedback);
  };

  return (
    <tr className="border-t border-2 border-gray-400">
      <td className="border-2 border-gray-400">{course._id}</td>
      <td className="border-2 border-gray-400">
        <img src={course.image} alt={course.title} className="h-12 w-12 rounded" />
      </td>
      <td className="border-2 border-gray-400">{course.title}</td>
      <td className="border-2 border-gray-400">{course.creatorId}</td>
      <td className="border-2 border-gray-400">{course.numOfLectures}</td>
      <td className="border-2 border-gray-400 max-h-32 overflow-y-auto">
        <ul>
          {course.feedback.slice(0, showMoreFeedback ? course.feedback.length : maxFeedbackToShow).map((feedback) => (
            <li key={feedback._id}>
              [{feedback.user ? feedback.user._id : 'User deleted'}, '{feedback.comment}']
            </li>
          ))}
        </ul>
        {course.feedback.length > maxFeedbackToShow && (
          <button onClick={handleToggleFeedback} className="text-blue-500 mt-2">
            {showMoreFeedback ? 'Show Less' : 'Show More'}
          </button>
        )}
      </td>
      <td className="border-2 border-gray-400">{course.averageRating}</td>
      <td className="border-2 border-gray-400">{course.price}</td>
      <td className="border-2 border-gray-400">
        <FaTrash className='text-red-600 size-6 cursor-pointer' />
      </td>
    </tr>
  );
};

export default CoursesTable;
