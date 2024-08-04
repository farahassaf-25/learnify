import React, { useRef } from 'react';
import { useGetCoursesQuery } from '../slices/coursesApiSlice';
import MainLayout from '../layouts/MainLayout';
import Hero from '../Components/Hero';
import MiddleText from '../Components/MiddleText';
import CourseCard from '../Components/CourseCard';
import Button from '../Components/Button';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { data: response, isLoading, error } = useGetCoursesQuery();
  const latestCoursesRef = useRef(null);

  // console.log('Fetched data:', response);

  const courses = response?.data || [];

  // Slice the courses array to get only the latest 3 courses
  const latestCourses = courses.slice(0, 3);

  const scrollToCourses = () => {
    latestCoursesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MainLayout>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
          <Hero scrollToCourses={scrollToCourses} />
          <div ref={latestCoursesRef}>
            <MiddleText text="Latest Courses" />
            <div className="flex flex-wrap justify-center gap-8 py-10">
              {Array.isArray(latestCourses) && latestCourses.length > 0 ? (
                latestCourses.map((course) => (
                  <CourseCard
                    key={course._id}
                    id={course._id}
                    image={course.image}
                    title={course.title}
                    description={course.description}
                    price={course.price}
                    level={course.minimumLevel}
                  />
                ))
              ) : (
                <div>No courses available</div>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Link to="/courses">
              <Button color="primary">Show All Courses</Button>
            </Link>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default HomePage;
