import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCourseDetailsAndLecturesQuery } from '../Redux/slices/userApiSlice';
import Accordion from '../Components/Accordion';
import Button from '../Components/Button';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';

const CourseLecturesPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetCourseDetailsAndLecturesQuery(courseId);
    const [course, setCourse] = useState(null);

    useEffect(() => {
        if (error) {
            toast.error('Failed to load course details.');
            navigate('/me');
        }
    }, [error, navigate]);

    useEffect(() => {
        if (data && data.success) {
            setCourse(data.data);
        } else {
            toast.error('You do not have access to this course.');
            navigate('/me');
        }
    }, [data, navigate]);

    if (isLoading) {
        return <Loader />;
    }

    if (!course) {
        return <div>Error: Course not found.</div>;
    }

    return (
        <div className="container mx-auto p-4 mt-5">
            <Button color="primary" onClick={() => navigate('/me/mycourses')}>
                Go Back
            </Button>
            <div className="py-10 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 text-primary">{course.title}</h1>
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
        </div>
    );
};

export default CourseLecturesPage;