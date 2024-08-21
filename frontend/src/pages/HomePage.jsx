import React, { useRef, useEffect } from 'react';
import { useGetCoursesQuery } from '../Redux/slices/coursesApiSlice';
import Hero from '../Components/Hero';
import MiddleText from '../Components/MiddleText';
import CourseCard from '../Components/CourseCard';
import Button from '../Components/Button';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import Message from '../Components/Message';
import { toast } from 'react-toastify';

const HomePage = () => {
  const { data: response, isLoading, error } = useGetCoursesQuery();
  const latestCoursesRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      toast.info('Loading courses...');
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      toast.error('Error fetching courses: ' + (error?.data?.message || error.error));
    }
  }, [error]);

  const courses = response?.data || [];
  const latestCourses = courses.slice(0, 3);

  const scrollToCourses = () => {
    latestCoursesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='error'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Hero scrollToCourses={scrollToCourses} />
          <div ref={latestCoursesRef}>
            <MiddleText text="Learnify Courses" />
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
    </div>
  );
};

export default HomePage;
