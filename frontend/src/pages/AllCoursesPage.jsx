import React from 'react';
import { useGetCoursesQuery } from '../slices/coursesApiSlice';
import MainLayout from '../layouts/MainLayout';
import CourseCard from '../Components/CourseCard';

const AllCoursesPage = () => {
  const { data: response, isLoading, error } = useGetCoursesQuery();
  const courses = response?.data || [];

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <div>{error?.data?.message || error.error}</div>;

  return (
    <MainLayout>
      <div className="flex flex-wrap justify-center gap-8 py-10">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course._id}
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
    </MainLayout>
  );
};

export default AllCoursesPage;
