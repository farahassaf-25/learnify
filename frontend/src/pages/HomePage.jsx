import React, { useRef } from 'react';
import { useGetCoursesQuery } from '../slices/coursesApiSlice';
import MainLayout from '../layouts/MainLayout';
import Hero from '../Components/Hero';
import MiddleText from '../Components/MiddleText';
import CourseCard from '../Components/CourseCard';
import Button from '../Components/Button';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import Message from '../Components/Message';

const HomePage = () => {
  const { data: response, isLoading, error } = useGetCoursesQuery();
  const latestCoursesRef = useRef(null);

  // console.log('Fetched data:', response);

  const courses = response?.data || [];

  // slice the courses array to get only the latest 3 courses
  const latestCourses = courses.slice(0, 3);

  const scrollToCourses = () => {
    latestCoursesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MainLayout>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='error'>{error?.data?.message || error.error}</Message>
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
