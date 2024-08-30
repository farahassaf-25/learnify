import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCourseDetailsAndLecturesQuery } from '../Redux/slices/userApiSlice';
import { useAddLectureMutation, useEditLecturesMutation, useDeleteLectureMutation } from '../Redux/slices/lecturesApiSlice';
import Loader from '../Components/Loader';
import MiddleText from '../Components/MiddleText';
import TextInput from '../Components/TextInput';
import Button from '../Components/Button';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ConfirmationModal from '../Components/ConfirmationModal'; 

const EditLecturesPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data: course, isLoading, isError } = useGetCourseDetailsAndLecturesQuery(courseId);
  const [editLectures, { isLoading: isUpdating }] = useEditLecturesMutation();
  const [addLecture, { isLoading: isAdding }] = useAddLectureMutation();
  const [deleteLecture] = useDeleteLectureMutation();

  const [lectures, setLectures] = useState([]);
  const [numOfLectures, setNumOfLectures] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lectureToDelete, setLectureToDelete] = useState(null);

  useEffect(() => {
    if (course && course.data) {
      const lectureData = course.data.lectures || [];
      setLectures(lectureData);
      setNumOfLectures(lectureData.length);
    }
  }, [course]);

  const handleLectureChange = (index, field, value) => {
    const updatedLectures = [...lectures];
    updatedLectures[index] = { ...updatedLectures[index], [field]: value };
    setLectures(updatedLectures);
  };

  const handleAddLectures = () => {
    const newLectures = Array(numOfLectures - lectures.length).fill({ title: '', video: null });
    setLectures((prevLectures) => [...prevLectures, ...newLectures]);
  };

  const handleSaveLectures = async () => {
    try {
      for (const lecture of lectures) {
        const formData = new FormData();
        formData.append('title', lecture.title);

        if (lecture.video instanceof File) {
          formData.append('video', lecture.video);
        }

        if (!lecture._id) {
          await addLecture({ courseId, formData }).unwrap();
        } else {
          if (!(lecture.video instanceof File)) {
            formData.append('video', lecture.video);
          }
          await editLectures({ data: formData, courseId, lectureId: lecture._id }).unwrap();
        }
      }
      navigate(`/courses/${courseId}`);
    } catch (err) {
      console.error('Failed to update lectures: ', err);
    }
  };

  const handleOpenModal = (lectureId) => {
    setLectureToDelete(lectureId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (lectureToDelete) {
      try {
        await deleteLecture({ courseId, lectureId: lectureToDelete }).unwrap();
        setLectures(lectures.filter((lecture) => lecture._id !== lectureToDelete));
        setNumOfLectures(numOfLectures - 1);
        toast.success('Lecture deleted successfully');
      } catch (error) {
        toast.error('Failed to delete the lecture');
      } finally {
        setIsModalOpen(false);
        setLectureToDelete(null);
      }
    }
  };

  if (isLoading || isUpdating || isAdding) return <Loader />;
  if (isError) return <MiddleText text="Failed to load course lectures." />;

  return (
    <div className="container mx-auto p-4 mt-5 px-40">
      <MiddleText text="Edit Lectures" />

      {lectures.map((lecture, index) => (
        <div key={index} className="mb-4 flex items-center justify-between">
          <div className="flex-grow">
            <TextInput
              placeholder="Lecture Title"
              type="text"
              value={lecture.title}
              onChange={(e) => handleLectureChange(index, 'title', e.target.value)}
            />
            <input
              placeholder="Upload Video"
              type="file"
              accept="video/*"
              onChange={(e) => handleLectureChange(index, 'video', e.target.files[0])}
              className="border border-secondary rounded-md p-2 w-full mb-4 bg-white"
            />
          </div>
          {lecture._id && (
            <FaTrash
              onClick={() => handleOpenModal(lecture._id)} 
              className="text-red-500 cursor-pointer ml-4"
            />
          )}
        </div>
      ))}

      {isModalOpen && (
        <ConfirmationModal
          title="Confirm Deletion"
          description="Are you sure you want to delete this lecture?"
          btnText="Delete"
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      <div className="mt-4">
        <TextInput
          placeholder="Number of Lectures"
          type="number"
          value={numOfLectures}
          onChange={(e) => setNumOfLectures(e.target.value)}
        />
        <Button color="secondary" onClick={handleAddLectures}>
          Add Lectures
        </Button>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button color="secondary" to={`/courses/${courseId}`}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSaveLectures}>
          Save Lectures
        </Button>
      </div>
    </div>
  );
};

export default EditLecturesPage;
