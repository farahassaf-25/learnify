import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProfileDetailsQuery, useGetCourseDetailsAndLecturesQuery } from '../Redux/slices/userApiSlice';
import { useAddFeedbackMutation } from '../Redux/slices/feedbackSlice';
import Accordion from '../Components/Accordion';
import Button from '../Components/Button';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import MiddleText from '../Components/MiddleText';
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';

const CourseLecturesPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetCourseDetailsAndLecturesQuery(courseId);
    const [course, setCourse] = useState(null);
    const [comment, setComment] = useState(''); 
    const [rating, setRating] = useState(0); 
    const [addFeedback, { isLoading: isSubmitting }] = useAddFeedbackMutation();
    const [isPurchased, setIsPurchased] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    const { data: userData } = useGetProfileDetailsQuery();

    useEffect(() => {
        if (error) {
            console.error('Error fetching course details:', error);
            toast.error('Failed to load course details. Please try again later.');
            navigate('/me');
        }
    }, [error, navigate]);    

    useEffect(() => {
        if (data) {
            // console.log('Course Data:', data.data);
            if (data.success) {
                setCourse(data.data);
                setIsPurchased(data.data.isPurchased || false); //default to false if not defined
            } else {
                toast.error('You do not have access to this course.');
                navigate('/me');
            }            
        }
    }, [data, navigate]);
    
    useEffect(() => {
        if (userData && userData.success) {
            setCurrentUserId(userData.data._id);
            // console.log('Current User ID:', userData.data._id); //check current user ID
        }
    }, [userData]);
    
    // console.log('Is Purchased:', isPurchased);
    // console.log('Course Creator ID:', course?.creatorId);
    // console.log('Current User ID:', currentUserId);    

    const handleFeedbackSubmit = async () => {
        if (!isPurchased) {
            toast.error('You cannot submit feedback for this course because it is not purchased.');
            return;
        }
    
        if (course?.creatorId === currentUserId) {
            toast.error('You cannot submit feedback for your own course.');
            return;
        }
    
        try {
            await addFeedback({ courseId, formData: { comment, rating } }).unwrap();
            toast.success('Feedback submitted successfully!');
            setComment('');
            setRating(0);
        } catch (err) {
            toast.error('Failed to submit feedback. Please try again later.');
        }
    };    

    if (isLoading) {
        return <Loader />;
    }

    if (!course) {
        return <MiddleText text='Course not found' />;
    }

    return (
        <div className="container mx-auto p-4 mt-5">
            <Button color="primary" onClick={() => navigate('/me/mycourses')}>
                Go Back
            </Button>
            <div className="py-10 max-w-4xl mx-auto">
                <MiddleText text={course.title}/>
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-64 object-cover mb-6 rounded-lg shadow-lg"
                />
                <div className="space-y-4">
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold mb-2 text-secondary">Description:</h2>
                        <p className="text-lg text-gray-700">{course.description}</p>
                    </div>
                    <div className="flex items-center">
                        <h2 className="text-2xl font-semibold mb-2 text-secondary">Category:</h2>
                        <p className="text-lg text-gray-700 ml-2">{course.category.join(', ')}</p>
                    </div>
                    <div className="flex items-center">
                        <h2 className="text-2xl font-semibold mb-2 text-secondary">Price:</h2>
                        <p className="text-lg text-gray-700 ml-2">${course.price}</p>
                    </div>
                    <div className="flex items-center">
                        <h2 className="text-2xl font-semibold mb-2 text-secondary">Level:</h2>
                        <p className="text-lg text-gray-700 ml-2">{course.minimumLevel}</p>
                    </div>
                    <div className="flex items-center">
                        <h2 className="text-2xl font-semibold mb-2 text-secondary">Weeks:</h2>
                        <p className="text-lg text-gray-700 ml-2">{course.weeks}</p>
                    </div>
                    <div className="flex items-center">
                        <h2 className="text-2xl font-semibold mb-2 text-secondary">Number Of Lectures:</h2>
                        <p className="text-lg text-gray-700 ml-2">{course.numOfLectures}</p>
                    </div>
                </div>
                <h2 className="text-3xl font-semibold mt-10 mb-4 text-secondary">Lectures</h2>
                <div className="space-y-4">
                    {course.lectures.map((lecture) => (
                        <Accordion
                            key={lecture._id}
                            title={lecture.title}
                            content={lecture.video || 'No video available'}
                        />
                    ))}
                </div>
            </div>

            {isPurchased && course?.creatorId !== currentUserId && (
                <div className="mt-10 px-80 flex flex-col align-content-center justify-center">
                    <MiddleText text='Add Feedback' />
                    <div className="my-4">
                        <Rating
                            initialRating={rating}
                            onChange={(value) => setRating(value)}
                            emptySymbol={<FaStar className="text-2xl text-gray-400" />}
                            fullSymbol={<FaStar className="text-2xl text-yellow-500" />}
                        />
                    </div>
                    <textarea
                        className="w-full p-5 border rounded border-secondary mb-4"
                        placeholder="Write your feedback here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button
                        color="primary"
                        onClick={handleFeedbackSubmit}
                        disabled={isSubmitting}
                    >
                        Submit Feedback
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CourseLecturesPage;
