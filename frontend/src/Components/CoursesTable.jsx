import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDeleteCourseByAdminMutation } from '../Redux/slices/adminSlice';

const CoursesTable = ({ courses, onDelete }) => {
  const [showMoreFeedback, setShowMoreFeedback] = useState({});
  const maxFeedbackToShow = 1;

  const [deleteCourse] = useDeleteCourseByAdminMutation();

  const handleToggleFeedback = (courseId) => {
    setShowMoreFeedback(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(courseId).unwrap();
        onDelete(courseId); 
      } catch (error) {
        console.error("Failed to delete the course:", error);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table mt-6 border-collapse border-2 border-gray-400">
        <thead>
          <tr className='text-textColor text-xl'>
            <th className="border-2 border-gray-400">Course ID</th>
            <th className="border-2 border-gray-400">Course Image</th>
            <th className="border-2 border-gray-400">Course Title</th>
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
            <tr key={course._id} className="border-t border-2 border-gray-400">
              <td className="border-2 border-gray-400">{course._id}</td>
              <td className="border-2 border-gray-400">
                <img src={course.image} alt={course.title} className="h-12 w-12 rounded" />
              </td>
              <td className="border-2 border-gray-400">{course.title}</td>
              <td className="border-2 border-gray-400">{course.creatorId}</td>
              <td className="border-2 border-gray-400">{course.numOfLectures}</td>
              <td className="border-2 border-gray-400 max-h-32 overflow-y-auto">
                <ul>
                  {course.feedback && course.feedback.length > 0 && 
                    course.feedback.slice(0, showMoreFeedback[course._id] ? course.feedback.length : maxFeedbackToShow).map((feedback) => (
                      <li key={feedback._id}>
                        [{feedback.user ? feedback.user._id : 'User deleted'}, '{feedback.comment}']
                      </li>
                    ))
                  }
                </ul>
                {course.feedback && course.feedback.length > maxFeedbackToShow && (
                  <button onClick={() => handleToggleFeedback(course._id)} className="text-blue-500 mt-2">
                    {showMoreFeedback[course._id] ? 'Less' : 'More'}
                  </button>
                )}
              </td>
              <td className="border-2 border-gray-400">{course.averageRating}</td>
              <td className="border-2 border-gray-400">{course.price}</td>
              <td className="border-2 border-gray-400">
                <FaTrash 
                  className='text-red-600 size-6 cursor-pointer' 
                  onClick={() => handleDeleteCourse(course._id)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesTable;
