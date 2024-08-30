import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import MiddleText from '../Components/MiddleText';
import { useAddLectureMutation } from '../Redux/slices/lecturesApiSlice';
import TextInput from '../Components/TextInput';

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
      navigate(`/me/mycourses/${courseId}`);
    } catch (err) {
      console.error('Failed to add lectures:', err);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-5 px-40">
      <Button color="primary" to={`/me/create-course/${courseId}`}>
        Go Back to Course
      </Button>
      <MiddleText text='Add Lectures' />

      <form onSubmit={handleSubmit}>
        {lectures.map((lecture, index) => (
          <div key={index} className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Lecture {index + 1} 
            </label>
            <TextInput
              placeholder={`Lecture ${index + 1} Title`}
              type="text"
              value={lecture.title}
              onChange={(e) => handleInputChange(index, 'title', e.target.value)}
            />
            
            <input
              type="file"
              onChange={(e) => handleInputChange(index, 'video', e.target.files[0])}
              className="border border-secondary rounded-md p-2 w-full bg-white"
            />
          </div>
        ))}

        <Button
          type="submit"
          color='primary'
          className={`${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Add Lectures"}
        </Button>
      </form>
    </div>
  );
};

export default AddLecturePage;
