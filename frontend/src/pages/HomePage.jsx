import React, { useRef, useEffect, useState } from 'react';
import { useGetCoursesQuery } from '../Redux/slices/coursesApiSlice';
import Hero from '../Components/Hero';
import MiddleText from '../Components/MiddleText';
import CourseCard from '../Components/CourseCard';
import Button from '../Components/Button';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import Message from '../Components/Message';
import ContactUs from '../Components/ContactUs';
import AboutUs from '../Components/AboutUs';
import { toast } from 'react-toastify';

const HomePage = () => {
  const { data: response, isLoading, error } = useGetCoursesQuery();
  const latestCoursesRef = useRef(null);
  const [hasToastShown, setHasToastShown] = useState(false);

  useEffect(() => {
    if (isLoading && !hasToastShown) {
      toast.info('Loading courses...');
      setHasToastShown(true); 
    } else if (!isLoading) {
      setHasToastShown(false); 
    }
  }, [isLoading, hasToastShown]);

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
              <Button color="primary" className='mb-12'>Show All Courses</Button>
            </Link>
          </div>
          <MiddleText text='About Us' />
          <AboutUs />
          <MiddleText text='Contact Us' />
          <ContactUs />
        </>
      )}
    </div>
  );
};

export default HomePage;
