import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Form from '../Components/Form';
import Button from '../Components/Button';
import ConfirmationModal from '../Components/ConfirmationModal';
import Loader from '../Components/Loader';
import { setCredentials } from '../Redux/slices/authSlice';
import { useGetProfileDetailsQuery, useUpdateDetailsMutation, useDeleteUserAccountMutation } from '../Redux/slices/userApiSlice';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: userProfile, error: profileError } = useGetProfileDetailsQuery();
    const purchasedCourses = userProfile?.data?.purchasedCourses || [];
    const ownCourses = userProfile?.data?.ownCourses || [];

    const [updateDetails] = useUpdateDetailsMutation();
    const [deleteUserAccount, { isLoading: isDeleting }] = useDeleteUserAccountMutation();

    useEffect(() => {
        if (userProfile?.data) {
            dispatch(setCredentials(userProfile.data));
            setName(userProfile.data.name);
            setEmail(userProfile.data.email);
            setImagePreview(userProfile.data.image);
        }
        if (profileError) {
            toast.error('Failed to fetch user profile');
        }
    }, [userProfile, profileError, dispatch]);

    const handleCourseClick = (course) => {
        if (course?._id) {
            navigate(`/courses/${course._id}`);
        } else {
            console.error("Course ID is undefined. Course data:", course);
        }
    };

    const handleEditCourse = (courseId) => {
        navigate(`/edit-course/${courseId}`);
    };

    const handleDeleteCourse = (courseId) => {
        // Logic for deleting course
    };

    const handleNavigateToMyCourses = () => {
        navigate('/me/mycourses');
    };

    if (!userProfile) {
        return <Loader />;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            if (image) {
                formData.append('image', image, image.name);
            }

            const res = await updateDetails(formData).unwrap();
            dispatch(setCredentials({ ...res.data }));
            setImagePreview(`${res.data.image}?${new Date().getTime()}`);
            toast.success('Profile updated successfully');
            setIsModalOpen(false);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview('');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUserAccount().unwrap();
            toast.success('Account deleted successfully');
            dispatch(setCredentials(null));
            localStorage.removeItem('userInfo');
            navigate('/');
            window.location.reload(); 
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to delete account');
        } finally {
            setIsConfirmationOpen(false);
        }
    };

    return (
        <div className="container mx-auto p-6 mt-5 max-w-4xl">
            <h1 className="text-3xl font-bold mb-10 text-center"><span className='text-secondary'>{userInfo.name}</span>'s Profile</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col items-center">
                    <img
                        src={imagePreview}
                        alt="Profile"
                        className="w-48 h-48 rounded-full border-2 border-primary mb-12"
                    />
                    <Button onClick={() => navigate('/create-course')} color='primary' className="w-full mb-8">Add Course to Learnify</Button>
                    <Button onClick={() => setIsModalOpen(true)} className="w-full mb-4 bg-green-600 text-white">Update Profile</Button>
                    <Button onClick={() => setIsConfirmationOpen(true)} className="bg-red-600 text-white w-full mt-4">Delete Account</Button>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4 cursor-pointer" onClick={handleNavigateToMyCourses}>My Purchased Courses</h2>
                    {purchasedCourses.length === 0 ? (
                        <div>No purchased courses found.</div>
                    ) : (
                        <div className="overflow-auto max-h-60 bg-secondary text-white rounded mb-4">
                            {purchasedCourses.map(course => (
                                <div key={course._id} onClick={() => handleCourseClick(course)} className="p-4 border-b cursor-pointer">
                                    {course.title}
                                </div>
                            ))}
                        </div>
                    )}

                    <h2 className="text-2xl font-semibold mb-4 cursor-pointer" onClick={handleNavigateToMyCourses}>My Own Courses</h2>
                    {ownCourses.length === 0 ? (
                        <div>No own courses found.</div>
                    ) : (
                        <div className="overflow-auto max-h-60 bg-secondary text-white rounded">
                            {ownCourses.map(course => (
                                <div key={course._id} className="flex justify-between items-center p-4 border-b bg-primary text-white rounded">
                                    <div onClick={() => handleCourseClick(course)} className="cursor-pointer">{course.title}</div>
                                    <div className="flex space-x-2">
                                        <FaEdit onClick={() => handleEditCourse(course._id)} className="text-blue-500 cursor-pointer" />
                                        <FaTrash onClick={() => handleDeleteCourse(course._id)} className="text-red-500 cursor-pointer" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for updating profile */}
            {isModalOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                    <div className="fixed inset-0 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 rounded"
                            >
                                Close
                            </button>
                            <Form
                                title="Update Profile"
                                fields={[
                                    { id: 'name', label: 'Name', type: 'text', value: name, onChange: (e) => setName(e.target.value) },
                                    { id: 'email', label: 'Email', type: 'email', value: email, onChange: (e) => setEmail(e.target.value) },
                                    { id: 'password', label: 'Password', type: 'password', value: password, onChange: (e) => setPassword(e.target.value) },
                                    { id: 'confirmPassword', label: 'Confirm Password', type: 'password', value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value) },
                                    { id: 'image', label: 'Profile Image', type: 'file', onChange: handleImageChange }, // Added file input field
                                ]}
                                onSubmit={submitHandler}
                                submitLabel="Save Changes"
                                isLoading={false}
                            />
                        </div>
                    </div>
                </>
            )}

            {/* Confirmation Modal for account deletion */}
            {isConfirmationOpen && (
                <ConfirmationModal
                    isOpen={isConfirmationOpen}
                    onClose={() => setIsConfirmationOpen(false)}
                    onConfirm={handleDelete}
                    title="Delete Account"
                    description="Are you sure you want to delete your account? This action cannot be undone."
                    loading={isDeleting}
                    btnText='Delete'
                />
            )}
        </div>
    );
};

export default UserProfilePage;
