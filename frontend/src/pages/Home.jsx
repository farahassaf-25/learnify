import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import MiddleText from '../Components/MiddleText';
import CourseCard from '../Components/CourseCard';
import Button from '../Components/Button';
import { Link } from 'react-router-dom';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const latestCoursesRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/learnify/courses'); 
        setCourses(response.data.data.slice(0, 3)); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const scrollToCourses = () => {
    latestCoursesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <MainLayout>
      <Navbar />
      <Hero scrollToCourses={scrollToCourses} />
      <div ref={latestCoursesRef}>
        <MiddleText text="Latest Courses" />
        <div className="flex flex-wrap justify-center gap-8 py-10">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              image={course.image}
              title={course.title}
              description={course.description}
              price={course.price}
              level={course.minimumLevel}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Link to="/courses">
          <Button color="primary">Show All Courses</Button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default Home;
