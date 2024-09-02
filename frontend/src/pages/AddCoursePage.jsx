import React, { useState } from 'react';
import Button from '../Components/Button';
import MiddleText from '../Components/MiddleText';
import { useCreateCourseMutation } from '../Redux/slices/coursesApiSlice';
import { useNavigate } from 'react-router-dom';
import TextInput from '../Components/TextInput';
import SelectInput from '../Components/SelectInput';

const AddCoursePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState(''); 
  const [minimumLevel, setMinimumLevel] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [weeks, setWeeks] = useState('');
  const [numOfLectures, setNumOfLectures] = useState('');

  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    
    const categoriesArray = categories.split(',').map(category => category.trim());
    categoriesArray.forEach(category => formData.append('category', category));

    formData.append('minimumLevel', minimumLevel);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('weeks', weeks);
    formData.append('numOfLectures', numOfLectures);

    try {
      const { data } = await createCourse(formData).unwrap();
      navigate(`/me/create-course/${data._id}/add-lectures`, { state: { numOfLectures: parseInt(numOfLectures) } });
    } catch (err) {
      console.error('Failed to create course:', err);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12 mt-5">
      <Button color="primary" to="/me" className="mb-4">
        Go Back
      </Button>
      <MiddleText text='Add Your Own Course' />

      <form onSubmit={handleSubmit} className='mt-8 space-y-4'>
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
        
        <input
          id="image"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border border-secondary rounded-md p-2 w-full mb-4 bg-white"
        />

        <TextInput
          placeholder="Categories (separate with commas)"
          type="text"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        />
        
        <SelectInput
          label=""
          valueLabel="Select Level"
          value={minimumLevel}
          onChange={(e) => setMinimumLevel(e.target.value)}
          options={[
            { value: 'All Levels', label: 'All Levels' },
            { value: 'Beginner', label: 'Beginner' },
            { value: 'Intermediate', label: 'Intermediate' },
            { value: 'Advanced', label: 'Advanced' }
          ]}
        />

        <TextInput
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        
        <TextInput
          placeholder="Weeks"
          type="number"
          value={weeks}
          onChange={(e) => setWeeks(e.target.value)}
        />
        
        <TextInput
          placeholder="Num Of Lectures"
          type="number"
          value={numOfLectures}
          onChange={(e) => setNumOfLectures(e.target.value)}
        />

        <Button
          type="submit"
          color='primary'
          className={`w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Add Course"}
        </Button>
      </form>
    </div>
  );
};

export default AddCoursePage;
