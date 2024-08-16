import React, { useState } from 'react';
import Button from '../Components/Button';
import MiddleText from '../Components/MiddleText';
import TextInput from '../Components/TextInput';
import FileInput from '../Components/FileInput';
import SelectInput from '../Components/SelectInput'; // Import the new SelectInput component
import Form from '../Components/Form';

const AddCoursePage = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [price, setPrice] = useState('');
  const [weeks, setWeeks] = useState('');
  const [numOfLectures, setNumOfLectures] = useState(1); // default 1 lecture
  const [lectures, setLectures] = useState([{ title: '', video: null }]);

  const handleLectureChange = (index, field, value) => {
    const newLectures = [...lectures];
    newLectures[index][field] = value;
    setLectures(newLectures);
  };

  const handleAddLecture = () => {
    setLectures([...lectures, { title: '', video: null }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
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
        submitLabel="Add Course"
        showFileInput={true}
        fileInputLabel="Course Image"
        fields={[
          { id: 'courseTitle', type: 'text', placeholder: 'Course Title', value: courseTitle, onChange: (e) => setCourseTitle(e.target.value), label: 'Course Title' },
          { id: 'description', type: 'text', placeholder: 'Course Description', value: description, onChange: (e) => setDescription(e.target.value), label: 'Course Description' },
          { id: 'category', type: 'select', label: 'Category', value: category, onChange: (e) => setCategory(e.target.value), options: [
            { value: 'Web Development', label: 'Web Development' },
            { value: 'Data Structures', label: 'Data Structures' },
            { value: 'Algorithms', label: 'Algorithms' },
            { value: 'Operating System', label: 'Operating System' },
            { value: 'Computer Networks', label: 'Computer Networks' },
            { value: 'Databases', label: 'Databases' },
            { value: 'Other', label: 'Other' }
          ]},
          { id: 'level', type: 'select', label: 'Level', value: level, onChange: (e) => setLevel(e.target.value), options: [
            { value: 'Beginner', label: 'Beginner' },
            { value: 'Intermediate', label: 'Intermediate' },
            { value: 'Advanced', label: 'Advanced' }
          ]},
          { id: 'creatorName', type: 'text', placeholder: 'Creator Name', value: creatorName, onChange: (e) => setCreatorName(e.target.value), label: 'Creator Name' },
          { id: 'price', type: 'number', placeholder: 'Price', value: price, onChange: (e) => setPrice(e.target.value), label: 'Price' },
          { id: 'weeks', type: 'number', placeholder: 'Weeks', value: weeks, onChange: (e) => setWeeks(e.target.value), label: 'Weeks' },
          { id: 'numOfLectures', type: 'number', placeholder: 'Number Of Lectures', value: numOfLectures, onChange: (e) => {
            setNumOfLectures(e.target.value);
            setLectures([...Array(Number(e.target.value)).keys()].map(() => ({ title: '', video: null })));
          }, label: 'Number Of Lectures' }
        ]}
      />

      <MiddleText text='Lectures' />

      {lectures.map((lecture, index) => (
        <div key={index} className="mb-4">
          <TextInput 
            placeholder={`Lecture ${index + 1} Title`} 
            value={lecture.title} 
            onChange={(e) => handleLectureChange(index, 'title', e.target.value)} 
            label={`Lecture ${index + 1} Title`} 
          />
          <FileInput 
            handleImageChange={(e) => handleLectureChange(index, 'video', e.target.files[0])} 
          />
        </div>
      ))}

      <div className="text-center mt-8">
        <Button type="button" color="secondary" onClick={handleAddLecture}>
          Add Lecture
        </Button>
      </div>
    </div>
  );
}

export default AddCoursePage;
