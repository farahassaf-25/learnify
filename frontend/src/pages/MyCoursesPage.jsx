import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useGetMyCoursesQuery } from '../Redux/slices/userApiSlice';
import CourseCard from '../Components/CourseCard';
import TextInput from '../Components/TextInput';
import MiddleText from '../Components/MiddleText';
import Loader from '../Components/Loader';
import Button from '../Components/Button';

const MyCoursesPage = () => {
  const { data: coursesData, error, isLoading } = useGetMyCoursesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(9); 
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

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

      {currentCourses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 py-10">
          {currentCourses.map(course => (
            <CourseCard
              key={course._id}
              id={course._id}
              image={course.image}
              title={course.title}
              description={course.description}
              price={course.price}
              level={course.minimumLevel}
              averageRating={course.averageRating}
              onCardClick={handleCourseClick} 
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredCourses.length / coursesPerPage) }, (_, index) => (
          <Button className='mr-2'
            key={index + 1}
            onClick={() => paginate(index + 1)}
            color={currentPage === index + 1 ? 'primary' : 'secondary'}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </>
  );
};

export default MyCoursesPage;
