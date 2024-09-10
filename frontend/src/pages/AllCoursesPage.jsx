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
import { useNavigate } from 'react-router-dom'; 

const AllCoursesPage = () => {
  const { data: response, isLoading, error } = useGetCoursesQuery();
  const courses = response?.data || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(9);
  
  const navigate = useNavigate();

  const categoryOptions = [
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Data Structures', label: 'Data Structures' },
    { value: 'Algorithms', label: 'Algorithms' },
    { value: 'Operating System', label: 'Operating System' },
    { value: 'Computer Networks', label: 'Computer Networks' },
    { value: 'Databases', label: 'Databases' },
    { value: 'Other', label: 'Other' },
  ];

  const filteredCourses = courses.filter(course => {
    let matches = true;

    if (searchTerm) {
      matches = matches && course.title.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if (levelFilter && levelFilter !== '') {
      matches = matches && course.minimumLevel === levelFilter;
    }

    if (categoryFilter.length > 0) {
      matches = matches && categoryFilter.some(cat => course.category.includes(cat));
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

  const clearFilters = () => {
    setSearchTerm('');
    setLevelFilter('');
    setCategoryFilter([]);
    setPriceFilter('');
    setCurrentPage(1);
  };

  const levelOptions = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
  ];

  const priceOptions = [
    { value: '0-50', label: '0 - 50 $' },
    { value: '51-100', label: '51 - 100 $' },
    { value: '101-200', label: '101 - 200 $' },
    { value: '201-500', label: '201 - 500 $' },
    { value: '501-1000', label: '501 - 1000 $' },
  ];

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="container mx-auto p-4 mt-2">
      <Button color="primary" to="/">
        Go Back To Home
      </Button>

      <div className="my-4 flex flex-col md:flex-row justify-between items-center mt-8">
        <TextInput
          placeholder="Search ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 md:mb-0 md:w-1/3 w-full"
        />
        <div className="flex flex-col md:flex-row md:space-x-4 w-full md:w-auto">
          <SelectInput
            valueLabel='All Levels'
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            options={levelOptions}
            className="mb-4 md:mb-0 w-full md:w-auto"
          />
          <CheckboxSelectInput 
            options={categoryOptions} 
            selectedOptions={categoryFilter}
            setSelectedOptions={setCategoryFilter}
            className="mb-4 md:mb-0 w-full md:w-auto"
          />
          <SelectInput
            valueLabel='Price'
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            options={priceOptions}
            className="mb-4 md:mb-0 w-full md:w-auto"
          />
        </div>
        <Button color="secondary" onClick={clearFilters} className="w-full md:w-auto mt-4 md:mt-0">
          Clear Filters
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-8 py-10">
        {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <Loader />
            </div>
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
                averageRating={course.averageRating}
                onCardClick={handleCourseClick}
              />
            ))
          ) : (
            <div>No courses available</div>
          )
        }
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
    </div>
  );
};

export default AllCoursesPage;