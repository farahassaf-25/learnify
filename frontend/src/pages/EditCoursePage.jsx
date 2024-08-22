import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCourseDetailsQuery, useEditCourseMutation } from '../Redux/slices/coursesApiSlice';
import Loader from '../Components/Loader';
import MiddleText from '../Components/MiddleText';
import TextInput from '../Components/TextInput';
import SelectInput from '../Components/SelectInput';
import Button from '../Components/Button';
import CheckboxSelectInput from '../Components/CheckboxSelectInput';

const EditCoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data: course, isLoading, isError } = useGetCourseDetailsQuery(courseId);
  const [editCourse, { isLoading: isUpdating }] = useEditCourseMutation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [minimumLevel, setMinimumLevel] = useState('');
  const [price, setPrice] = useState('');
  const [weeks, setWeeks] = useState('');
  const [numOfLectures, setNumOfLectures] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (course) {
      setTitle(course.title || '');
      setDescription(course.description || '');
      setCategory(course.category || '');
      setMinimumLevel(course.minimumLevel || '');
      setPrice(course.price !== undefined ? course.price : '');
      setWeeks(course.weeks !== undefined ? course.weeks : '');
      setNumOfLectures(course.numOfLectures !== undefined ? course.numOfLectures : 0);
      setSelectedCategories(course.category ? [course.category] : []);
    }
  }, [course]);

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      await editCourse({
        data: {
          title,
          description,
          category,
          minimumLevel,
          price,
          weeks,
          numOfLectures,
          selectedCategories,
        },
        courseId
      }).unwrap();
  
      navigate(`/courses/${courseId}`);
    } catch (err) {
      console.error('Failed to update the course: ', err);
    }
  };  

  if (isLoading || isUpdating) return <Loader />;
  if (isError) return <MiddleText text="Failed to load course details." />;

  return (
    <>
      <MiddleText text="Edit Course" />

      <form onSubmit={handleUpdateCourse}>
        <TextInput 
          placeholder="Course Title" 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />

        <TextInput 
          placeholder="Course Description" 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />

        <SelectInput 
          label="Minimum Level"
          value={minimumLevel} 
          onChange={(e) => setMinimumLevel(e.target.value)} 
          options={[
            { value: 'all levels', label: 'All Levels' },
            { value: 'beginner', label: 'Beginner' },
            { value: 'intermediate', label: 'Intermediate' },
            { value: 'advanced', label: 'Advanced' },
          ]}
        />

        <TextInput 
          placeholder="Course Price" 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />

        <TextInput 
          placeholder="Course Duration (weeks)" 
          type="number" 
          value={weeks} 
          onChange={(e) => setWeeks(e.target.value)} 
        />

        <TextInput 
          placeholder="Number of Lectures" 
          type="number" 
          value={numOfLectures} 
          onChange={(e) => setNumOfLectures(e.target.value)} 
        />

        <CheckboxSelectInput 
          label="Categories"
          options={[
            { value: 'development', label: 'Development' },
            { value: 'business', label: 'Business' },
            { value: 'design', label: 'Design' },
          ]}
          selectedOptions={selectedCategories}
          setSelectedOptions={setSelectedCategories}
        />

        <div className="mt-4 flex justify-end gap-2">
          <Button color="secondary" to={`/courses/${courseId}`}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditCoursePage;
