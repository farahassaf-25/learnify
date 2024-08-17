import React, { useState } from 'react';
import Button from '../Components/Button';
import MiddleText from '../Components/MiddleText';
import Form from '../Components/Form';
import { useCreateCourseMutation } from '../Redux/slices/coursesApiSlice';
import { useNavigate } from 'react-router-dom';

const AddCoursePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
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
    formData.append('category', category);
    formData.append('minimumLevel', minimumLevel);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('weeks', weeks);
    formData.append('numOfLectures', numOfLectures);

    try {
      const { data } = await createCourse(formData).unwrap();
      navigate(`/courses/${data._id}/add-lectures`, { state: { numOfLectures: parseInt(numOfLectures) } });
    } catch (err) {
      console.error('Failed to create course:', err);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-5">
      <Button color="primary" to="/courses">
        Go Back
      </Button>
      <MiddleText text='Add Your Own Course' />

      <Form
        title="Add Course"
        onSubmit={handleSubmit}
        submitLabel={isLoading ? "Submitting..." : "Add Course"}
        // showFileInput={true}
        // fileInputLabel="Course Image"
        fields={[
          { id: 'title', type: 'text', placeholder: 'Course Title', value: title, onChange: (e) => setTitle(e.target.value), label: 'Course Title' },
          { id: 'description', type: 'text', placeholder: 'Course Description', value: description, onChange: (e) => setDescription(e.target.value), label: 'Course Description' },
          { id: 'image', type: 'file', label: 'Course Image', onChange: (e) => setImage(e.target.files[0])},
          { id: 'category', type: 'select', label: 'Category', value: category, onChange: (e) => setCategory(e.target.value), options: [
            { value: 'Web Development', label: 'Web Development' },
            { value: 'Data Structures', label: 'Data Structures' },
            { value: 'Algorithms', label: 'Algorithms' },
            { value: 'Operating System', label: 'Operating System' },
            { value: 'Computer Networks', label: 'Computer Networks' },
            { value: 'Databases', label: 'Databases' },
            { value: 'Other', label: 'Other' }
          ]},
          { id: 'minimumLevel', type: 'select', label: 'Minimum Level', value: minimumLevel, onChange: (e) => setMinimumLevel(e.target.value), options: [
            { value: 'Beginner', label: 'Beginner' },
            { value: 'Intermediate', label: 'Intermediate' },
            { value: 'Advanced', label: 'Advanced' }
          ]},
          { id: 'price', type: 'number', placeholder: 'Price', value: price, onChange: (e) => setPrice(e.target.value), label: 'Price' },
          { id: 'weeks', type: 'number', placeholder: 'Weeks', value: weeks, onChange: (e) => setWeeks(e.target.value), label: 'Weeks' },
          { id: 'numOfLectures', type: 'number', placeholder: 'Num Of Lectures', value: numOfLectures, onChange: (e) => setNumOfLectures(e.target.value), label: 'Num Of Lectures' }
        ]}
      />
    </div>
  );
};

export default AddCoursePage;