import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGetCourseDetailsQuery } from '../slices/coursesApiSlice';
import MainLayout from '../layouts/MainLayout';

const CourseDetailsPage = () => {
  const { id: courseId } = useParams();
  const { data: course, isLoading, error } = useGetCourseDetailsQuery(courseId);

  return (
    <MainLayout>
      <Link className='btn btn-secondary my-3' to='/'>
      Go Back To Home
    </Link>
    { isLoading ? (<h2>Loading...</h2>) : error ? (
      <div>{ error?.data?.message || error.error}</div>
    ) : ( 
      <div className="py-10">
      <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
      <img src={course.image} alt={course.title} className="w-full h-64 object-cover mb-4" />
      <p className="mb-4">{course.description}</p>
      <p className="mb-4">Price: {course.price} $</p>
      <p className="mb-4">Category: {course.category?.join(', ') || 'N/A'}</p>
      <p className="mb-4">Level: {course.minimumLevel}</p>
      <p className="mb-4">Weeks: {course.weeks}</p>
      <p className="mb-4">Number of Lectures: {course.numOfLectures}</p>
      <p className="mb-4">Creator:  {course.creatorName}</p>
    </div>
    )}
    </MainLayout>
  );
};

export default CourseDetailsPage;
