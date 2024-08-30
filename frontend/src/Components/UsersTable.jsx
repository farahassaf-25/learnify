import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const UsersTable = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table mt-6 border-collapse border-2 border-gray-400">
        <thead>
          <tr className='text-textColor text-xl'>
            <th className="border-2 border-gray-400">User ID</th>
            <th className="border-2 border-gray-400">User Image</th>
            <th className="border-2 border-gray-400">User Name</th>
            <th className="border-2 border-gray-400">Purchased Courses</th> 
            <th className="border-2 border-gray-400">Name Of Purchased Courses</th>
            <th className="border-2 border-gray-400">Delete</th>
          </tr>
        </thead>
        <tbody className='text-xl text-primary border-2'>
          {users.map((user) => (
            <UserRow key={user._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserRow = ({ user }) => {
  const [showMoreCourses, setShowMoreCourses] = useState(false);
  const maxCoursesToShow = 2; 

  const handleToggleCourses = () => {
    setShowMoreCourses(!showMoreCourses);
  };

  return (
    <tr className="border-t border-2 border-gray-400">
      <td className="border-2 border-gray-400">{user._id}</td>
      <td className="border-2 border-gray-400">
        <img src={user.image} alt={user.name} className="h-12 w-12 rounded" />
      </td>
      <td className="border-2 border-gray-400">{user.name}</td>
      <td className="border-2 border-gray-400">{user.purchasedCourses.length}</td> 
      <td className="border-2 border-gray-400">
        {user.purchasedCourses.length > 0 ? (
          <>
            {user.purchasedCourses.slice(0, showMoreCourses ? user.purchasedCourses.length : maxCoursesToShow).map(course => (
              <div key={course._id}> - {course.title}</div>
            ))}
            {user.purchasedCourses.length > maxCoursesToShow && (
              <button onClick={handleToggleCourses} className="text-blue-500 mt-2">
                {showMoreCourses ? 'Show Less' : 'Show More'}
              </button>
            )}
          </>
        ) : (
          <div>No Courses Purchased</div>
        )}
      </td>
      <td className="border-2 border-gray-400">
        <FaTrash className='text-red-600 size-6' />
      </td>
    </tr>
  );
};

export default UsersTable;
