// UserProfilePage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Form from '../Components/Form';
import Button from '../Components/Button';
import ConfirmationModal from '../Components/ConfirmationModal';
import Loader from '../Components/Loader'
import { setCredentials } from '../Redux/slices/authSlice';
import { useProfileQuery, useGetUserCoursesQuery, useUpdateDetailsMutation, useDeleteUserAccountMutation } from '../Redux/slices/userApiSlice';
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

    const { data: userProfile, error: profileError } = useProfileQuery();
    const { data: userCourses, error: coursesError, isLoading: coursesLoading } = useGetUserCoursesQuery();

    const purchasedCourses = userCourses?.data?.purchasedCourses || [];
    const ownCourses = userCourses?.data?.ownCourses || [];

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


    const handlePurchasedCourseClick = (course) => {
        if (course && course._id) {
            navigate(`/me/mycourses/${course._id}`);
        } else {
            console.error("Course ID is undefined. Course data:", course);
        }
    };
    
    const handleOwnedCourseClick = (course) => {
        if (course && course._id) {
            navigate(`/me/mycourses/${course._id}`);
        } else {
            console.error("Course ID is undefined. Course data:", course);
        }
    };
    

    if (coursesLoading) {
        return <Loader />;
    }

    if (coursesError) {
        return <div>Error: {coursesError.message}</div>;
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
                <div className="flex flex-col items-center">
                    <img
                        src={`${imagePreview}?v=${new Date().getTime()}`}
                        alt="Profile"
                        className="w-48 h-48 rounded-full border-2 border-primary mb-12"
                    />
                    <Button onClick={() => navigate('/create-course')} color='secondary' className="w-full mb-8">Add Course to Learnify</Button>
                    <Button onClick={() => setIsModalOpen(true)} className="w-full mb-4 bg-green-600 text-white">Update Profile</Button>
                    <Button onClick={() => setIsConfirmationOpen(true)} className="bg-red-600 text-white w-full mt-4">Delete Account</Button>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4">My Purchased Courses</h2>
                    {purchasedCourses.length === 0 ? (
                        <div>No purchased courses found.</div>
                    ) : (
                        <div className="w-full overflow-x-auto bg-white rounded-box">
                            <div className="flex space-x-5 p-4">
                                {purchasedCourses.map((course) => (
                                    <div
                                    key={course._id}
                                    className="flex-shrink-0 w-70 sm:w-62 md:w-80 lg:w-76 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
                                    onClick={() => handlePurchasedCourseClick(course)}
                                >
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-70 h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
                                    />
                                    <div className="p-4 bg-primary w-70">
                                        <h3 className="text-lg font-semibold truncate text-white">{course.title}</h3>
                                    </div>
                                </div>                                
                                ))}
                            </div>
                        </div>
                    )}

                    <h2 className="text-2xl font-semibold mb-4 mt-10">My Own Courses</h2>
                    {ownCourses.length === 0 ? (
                        <div>No own courses found.</div>
                    ) : (
                        <div className="w-full overflow-x-auto bg-white rounded-box">
                            <div className="flex space-x-5 p-4">
                                {ownCourses.map((course) => (
                                    <div
                                    key={course._id}
                                    className="flex-shrink-0 w-70 sm:w-62 md:w-80 lg:w-76 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
                                    onClick={() => handleOwnedCourseClick(course)}
                                >
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-70 h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
                                    />
                                    <div className="p-4 bg-primary w-70">
                                        <h3 className="text-lg font-semibold truncate text-white">{course.title}</h3>
                                    </div>
                                </div>                                
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

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

            {isConfirmationOpen && (
                <ConfirmationModal
                    title="Delete Account"
                    description="Are you sure you want to delete your account? This action cannot be undone."
                    btnText={isDeleting ? "Deleting..." : "Confirm"}
                    onClose={() => setIsConfirmationOpen(false)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
};

export default UserProfilePage;