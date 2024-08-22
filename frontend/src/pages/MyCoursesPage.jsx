import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useGetMyCoursesQuery } from '../Redux/slices/userApiSlice';
import CourseCard from '../Components/CourseCard';
import TextInput from '../Components/TextInput';
import MiddleText from '../Components/MiddleText';
import Loader from '../Components/Loader';

const MyCoursesPage = () => {
  const { data: coursesData, error, isLoading } = useGetMyCoursesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); 

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.error("Error fetching courses:", error);
    return <div>Error fetching courses: {error.message}</div>;
  }

  const { ownCourses = [], purchasedCourses = [] } = coursesData?.data || {};
  const allCourses = [...ownCourses, ...purchasedCourses];

  const filteredCourses = allCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCourseClick = (courseId) => {
    navigate(`/me/mycourses/${courseId}`); 
  };

  return (
    <>
      <MiddleText text='My Courses' /> 
      <TextInput
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {filteredCourses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 py-10">
          {filteredCourses.map(course => (
            <CourseCard
              key={course._id}
              id={course._id}
              image={course.image}
              title={course.title}
              description={course.description}
              price={course.price}
              level={course.minimumLevel}
              onCardClick={handleCourseClick} 
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MyCoursesPage;
