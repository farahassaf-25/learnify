import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import MiddleText from '../Components/MiddleText';
import Form from '../Components/Form';
import { useAddLectureMutation } from '../Redux/slices/lecturesApiSlice';

const AddLecturePage = () => {
  const [lectures, setLectures] = useState([]);
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const numOfLectures = location.state?.numOfLectures || 0;

  const [addLecture, { isLoading }] = useAddLectureMutation();

  useEffect(() => {
    setLectures(Array(numOfLectures).fill({ title: '', video: null }));
  }, [numOfLectures]);

  const handleInputChange = (index, field, value) => {
    const updatedLectures = [...lectures];
    updatedLectures[index] = { ...updatedLectures[index], [field]: value };
    setLectures(updatedLectures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (let lecture of lectures) {
        const formData = new FormData();
        formData.append('title', lecture.title);
        formData.append('video', lecture.video);

        await addLecture({ courseId, formData }).unwrap();
      }
      // Navigate back to course page or show success message
      navigate(`/courses/${courseId}`);
    } catch (err) {
      console.error('Failed to add lectures:', err);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-5">
      <Button color="primary" to={`/courses/${courseId}`}>
        Go Back to Course
      </Button>
      <MiddleText text='Add Lectures to Course' />

      <Form
        title="Add Lectures"
        onSubmit={handleSubmit}
        submitLabel={isLoading ? "Submitting..." : "Add Lectures"}
        fields={lectures.map((lecture, index) => [
          { 
            id: `title-${index}`, 
            type: 'text', 
            placeholder: `Lecture ${index + 1} Title`, 
            value: lecture.title, 
            onChange: (e) => handleInputChange(index, 'title', e.target.value), 
            label: `Lecture ${index + 1} Title` 
          },
          { 
            id: `video-${index}`, 
            type: 'file', 
            label: `Lecture ${index + 1} Video`, 
            onChange: (e) => handleInputChange(index, 'video', e.target.files[0])
          },
        ]).flat()}
      />
    </div>
  );
};

export default AddLecturePage;