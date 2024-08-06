import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGetCoursesQuery } from '../slices/coursesApiSlice';
import MainLayout from '../layouts/MainLayout';
import CourseCard from '../Components/CourseCard';
import Button from '../Components/Button';
import Loader from '../Components/Loader';
import Message from '../Components/Message';

const AllCoursesPage = () => {
  const { data: response, isLoading, error } = useGetCoursesQuery();
  const courses = response?.data || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(9);

  const filteredCourses = useMemo(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (levelFilter) {
      filtered = filtered.filter(course => course.minimumLevel === levelFilter);
    }

    if (categoryFilter) {
      filtered = filtered.filter(course => course.category.includes(categoryFilter));
    }

    if (priceFilter) {
      const [minPrice, maxPrice] = priceFilter.split('-').map(Number);
      filtered = filtered.filter(course => course.price >= minPrice && course.price <= maxPrice);
    }

    return filtered;
  }, [searchTerm, levelFilter, categoryFilter, priceFilter, courses]);

  // Get current courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <MainLayout>
      <Button color="primary" to="/">
        Go Back To Home
      </Button>

      <div className="my-4 flex flex-col md:flex-row justify-between items-center">
        <input
          type="text"
          placeholder="Search by course name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3 mb-4 md:mb-0"
        />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="select select-bordered w-full md:w-auto"
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="select select-bordered w-full md:w-auto"
          >
            <option value="">All Categories</option>
            {Array.from(new Set(courses.flatMap(course => course.category))).map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="select select-bordered w-full md:w-auto"
          >
            <option value="">All Prices</option>
            <option value="0-50">0 - 50 $</option>
            <option value="51-100">51 - 100 $</option>
            <option value="101-200">101 - 200 $</option>
            <option value="201-500">201 - 500 $</option>
            <option value="501-1000">501 - 1000 $</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-8 py-10">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='error'>{error?.data?.message || error.error}</Message>
        ) : Array.isArray(currentCourses) && currentCourses.length > 0 ? (
          currentCourses.map((course) => (
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

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredCourses.length / coursesPerPage) }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            color={currentPage === index + 1 ? 'primary' : 'secondary'}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </MainLayout>
  );
};

export default AllCoursesPage;