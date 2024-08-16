import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Form from '../Components/Form';
import Button from '../Components/Button';
import ConfirmationModal from '../Components/ConfirmationModal';
import { setCredentials } from '../Redux/slices/authSlice';
import { useProfileQuery, useGetUserCoursesQuery, useUpdateDetailsMutation, useDeleteUserAccountMutation } from '../Redux/slices/userApiSlice';
import { useNavigate } from 'react-router-dom';
import MiddleText from '../Components/MiddleText';

const UserProfilePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courses, setCourses] = useState([]);

    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: userProfile, error: profileError } = useProfileQuery();
    const { data: userCourses, error: coursesError } = useGetUserCoursesQuery(userInfo.id);
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

        if (userCourses) {
            setCourses(userCourses);
        }
        if (coursesError) {
            toast.error('Failed to load courses');
        }
    }, [userProfile, profileError, userCourses, coursesError, dispatch]);

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

    useEffect(() => {
        if (userInfo?.image) {
            setImagePreview(userInfo.image);
        }
    }, [userInfo]);

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

    const fields = [
        {
            id: 'name',
            label: 'Name',
            type: 'text',
            value: name,
            onChange: (e) => setName(e.target.value),
        },
        {
            id: 'email',
            label: 'Email',
            type: 'email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
        },
        {
            id: 'password',
            label: 'Password',
            type: 'password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
        },
        {
            id: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            value: confirmPassword,
            onChange: (e) => setConfirmPassword(e.target.value),
        },
    ];

    return (
        <div className="container mx-auto p-6 mt-5 max-w-4xl">
            <h1 className="text-3xl font-bold mb-10 text-center"><span className='text-secondary'>{userInfo.name}</span>'s Profile</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
                
                {/* Left Column */}
                <div className="flex flex-col items-center">
                    <img
                        src={`${imagePreview}?v=${new Date().getTime()}`}
                        alt="Profile"
                        className="w-48 h-48 rounded-full border-2 border-primary mb-12"
                    />
                    <Button onClick={() => navigate('/create-course')} color='secondary' className="w-full mb-8">Add Course to Learnify</Button>
                    <Button onClick={() => setIsModalOpen(true)} color='primary' className="w-full mb-4">Update Profile</Button>
                    <Button onClick={() => setIsConfirmationOpen(true)} className="bg-red-600 text-white w-full mt-4">Delete Account</Button>
                </div>

                {/* Right Column */}
                <div className="flex flex-col">
                    <MiddleText text='My Courses' />
                    <div className="w-full bg-white rounded p-3">
                        {courses.length > 0 ? (
                            <ul>
                                {courses.map(course => (
                                    <li key={course.id} className="border p-4 mb-2 rounded">
                                        <h3 className="text-lg                                         font-bold">{course.title}</h3>
                                        <p>{course.description}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 text-center">You have not purchased any courses yet.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for Updating Profile */}
            {isModalOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                    <div className="fixed inset-0 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                            {/* Close Button at the Top */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 rounded"
                            >
                                Close
                            </button>
                            <Form
                                title="Update Profile"
                                fields={fields}
                                onSubmit={submitHandler}
                                submitLabel="Save Changes"
                                isLoading={false}
                                imagePreview={imagePreview}
                                handleImageChange={handleImageChange}
                                showFileInput={true}
                            />

                        </div>
                    </div>
                </>
            )}

            {/* Delete Confirmation Modal */}
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

