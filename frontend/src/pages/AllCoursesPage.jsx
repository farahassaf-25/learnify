import React, { useState, useEffect } from 'react';
import { useGetCoursesQuery } from '../Redux/slices/coursesApiSlice';
import CourseCard from '../Components/CourseCard';
import Button from '../Components/Button';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { toast } from 'react-toastify';
import TextInput from '../Components/TextInput';
import CheckboxSelectInput from '../Components/CheckboxSelectInput'; 
import SelectInput from '../Components/SelectInput'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AllCoursesPage = () => {
  const { data: response, isLoading, error } = useGetCoursesQuery();
  const courses = response?.data || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(9);
  
  const navigate = useNavigate(); // Initialize useNavigate

  // Calculate filtered courses directly in render flow
  const filteredCourses = courses.filter(course => {
    let matches = true;

    if (searchTerm) {
      matches = matches && course.title.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if (levelFilter) {
      matches = matches && course.minimumLevel === levelFilter;
    }

    if (categoryFilter.length > 0) {
      matches = matches && course.category.some(cat => categoryFilter.includes(cat));
    }

    if (priceFilter) {
      const [minPrice, maxPrice] = priceFilter.split('-').map(Number);
      matches = matches && course.price >= minPrice && course.price <= maxPrice;
    }

    return matches;
  });

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const uniqueCategories = Array.from(new Set(courses.flatMap(course => course.category)));

  const clearFilters = () => {
    setSearchTerm('');
    setLevelFilter('');
    setCategoryFilter([]);
    setPriceFilter('');
    setCurrentPage(1);
  };

  const levelOptions = [
    { value: '', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
  ];

  const priceOptions = [
    { value: '', label: 'All Prices' },
    { value: '0-50', label: '0 - 50 $' },
    { value: '51-100', label: '51 - 100 $' },
    { value: '101-200', label: '101 - 200 $' },
    { value: '201-500', label: '201 - 500 $' },
    { value: '501-1000', label: '501 - 1000 $' },
  ];

  // Function to handle course card click
  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`); // Navigate to the course details page
  };

  return (
    <div className="container mx-auto p-4 mt-2">
      <Button color="primary" to="/">
        Go Back To Home
      </Button>

      <div className="my-4 flex flex-col md:flex-row justify-between items-center mt-12">
        <TextInput
          placeholder="Search ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 md:mb-0 md:w-1/3"
        />
        <div className="flex flex-col md:flex-row md:space-x-4 w-full md:w-auto">
          <SelectInput
            valueLabel='Level'
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            options={levelOptions}
          />
          <CheckboxSelectInput 
            options={uniqueCategories.map(cat => ({ value: cat, label: cat }))} 
            selectedOptions={categoryFilter}
            setSelectedOptions={setCategoryFilter}
            className="mb-4 md:mb-0 md:w-auto"
          />
          <SelectInput
            valueLabel='Price'
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            options={priceOptions}
          />
        </div>
        <Button color="secondary" onClick={clearFilters} className="w-full md:w-auto mt-4 md:mt-0">
          Clear Filters
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-8 py-10">
        {isLoading && <Loader />}
        {error && <Message variant='error'>{error?.data?.message || error.error}</Message>}
        {!isLoading && !error && Array.isArray(currentCourses) && currentCourses.length > 0 ? (
          currentCourses.map((course) => (
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
          ))
        ) : (
          <div>No courses available</div>
        )}
      </div>

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
    </div>
  );
};

export default AllCoursesPage;
