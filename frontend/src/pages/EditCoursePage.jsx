import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { useEditCourseMutation, useDeleteCourseMutation } from '../Redux/slices/coursesApiSlice';
import { useGetCourseDetailsAndLecturesQuery } from '../Redux/slices/userApiSlice';
import Loader from '../Components/Loader';
import MiddleText from '../Components/MiddleText';
import TextInput from '../Components/TextInput';
import SelectInput from '../Components/SelectInput';
import Button from '../Components/Button';
import ConfirmationModal from '../Components/ConfirmationModal';

const EditCoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data: course, isLoading, isError } = useGetCourseDetailsAndLecturesQuery(courseId);
  const [editCourse, { isLoading: isUpdating }] = useEditCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [minimumLevel, setMinimumLevel] = useState('');
  const [price, setPrice] = useState('');
  const [weeks, setWeeks] = useState('');
  const [numOfLectures, setNumOfLectures] = useState(0);
  const [hasLectures, setHasLectures] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    if (course && course.data) {
      setHasLectures(course.data.lectures && course.data.lectures.length > 0);
      const courseData = course.data; 
      setTitle(courseData.title || '');
      setDescription(courseData.description || '');
      setCategory(courseData.category.join(', ') || '');
      setMinimumLevel(courseData.minimumLevel || '');
      setPrice(courseData.price !== undefined ? courseData.price : '');
      setWeeks(courseData.weeks !== undefined ? courseData.weeks : '');
      setNumOfLectures(courseData.numOfLectures !== undefined ? courseData.numOfLectures : 0);
    }
  }, [course]);

  const handleUpdateCourse = async (e) => {
    e.preventDefault();

    if (numOfLectures < course.data.numOfLectures) {
      toast.error('Cannot decrease the number of lectures once added.');
      return; 
    }

    try {
      await editCourse({
        data: {
          title,
          description,
          category: category.split(',').map(cat => cat.trim()), 
          minimumLevel,
          price,
          weeks,
          numOfLectures,
        },
        courseId
      }).unwrap();

      navigate(`/me/mycourses/${courseId}/edit-lectures`);
    } catch (err) {
      console.error('Failed to update the course: ', err);
    }
  };

  const handleDeleteCourse = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmationOpen(false); 
  
    try {
      await deleteCourse(courseId).unwrap(); //pass courseId
      toast.success('Course deleted successfully');
      navigate('/me/mycourses');
    } catch (error) {
      toast.error('Failed to delete the course');
    }
  };  

  const handleCancelDelete = () => {
    setIsConfirmationOpen(false); 
  };

  if (isLoading || isUpdating) return <Loader />;
  if (isError) {
    console.error('Error fetching course details:', isError);
    return <MiddleText text="Failed to load course details." />;
  }
  
  return (
    <div className="container mx-auto p-4 mt-5 px-40">
      <Button color="primary" to={`/me/mycourses`}>
        Go Back
      </Button>
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

        <TextInput
          placeholder="Course Category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <SelectInput
          label=""
          value={minimumLevel}
          onChange={(e) => setMinimumLevel(e.target.value)}
          options={[
            { value: 'All Levels', label: 'All Levels' },
            { value: 'Beginner', label: 'Beginner' },
            { value: 'Intermediate', label: 'Intermediate' },
            { value: 'Advanced', label: 'Advanced' },
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
        <div className="mt-4 flex justify-end gap-2">
          <Button color="secondary" to={`/me/mycourses`}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Save Changes
          </Button>
          <Button className='bg-green-600 text-white' type="submit" to={`/me/mycourses/${courseId}/edit-lectures`}>
            Edit Lectures
          </Button>
        </div>
      </form>
      <div className="mt-4 flex justify-end gap-2">
          <Button onClick={handleDeleteCourse} className="flex items-center bg-red-600 text-white">
            <FaTrash className="mr-1" /> Delete Course
          </Button>
        </div>

      {isConfirmationOpen && (
        <ConfirmationModal
          title="Delete Course"
          description={hasLectures ? "This course has lectures. Are you sure you want to delete it along with its lectures?" : "Are you sure you want to delete this course? This action cannot be undone."}
          btnText="Delete Course"
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default EditCoursePage;
