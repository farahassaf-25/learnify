import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/slices/cartSlice';
import Button from '../Components/Button';
import { useGetUserCoursesQuery } from '../Redux/slices/userApiSlice';
import { useGetCourseDetailsQuery } from '../Redux/slices/coursesApiSlice';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { toast } from 'react-toastify';

const CourseDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data: course, isLoading, error } = useGetCourseDetailsQuery(id);
    const { data: userCourses } = useGetUserCoursesQuery();
    const { userInfo } = useSelector((state) => state.auth);

    const [isPurchased, setIsPurchased] = useState(false);
    const [isCreator, setIsCreator] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems);

    //check if the current user is the creator of the course
    useEffect(() => {
        if (course && course.data && userInfo) {
            setIsCreator(course.data.user.toString() === userInfo._id); //compare user ID
        }
    }, [course, userInfo]);      

    //check if the user has purchased the course
    useEffect(() => {
        if (userCourses && userCourses.data && userCourses.data.purchasedCourses) {
            const purchasedCourseIds = userCourses.data.purchasedCourses.map(course => course._id);
            setIsPurchased(purchasedCourseIds.includes(id));
        }
    }, [userCourses, id]);

    const addToCartHandler = () => {
        if (!userInfo) {
            toast.error('You need to log in to add courses to your cart.');
            return;
        }

        if (isCreator) {
            toast.error('You cannot add your own course to the cart.');
            return;
        }

        if (isPurchased) {
            toast.error('You have already purchased this course.');
            return;
        }

        const existItem = cartItems.find(x => x._id === course.data._id);

        if (existItem) {
            toast.error('Course is already in the cart.');
        } else {
            dispatch(addToCart(course.data));
            toast.success('Course added to cart!');
        }
    };

    return (
        <div className="container mx-auto p-4 mt-5">
            <Button color="primary" to="/courses">
                Go Back
            </Button>
            {isLoading && <Loader />}
            {error && <Message variant='error'>{error?.data?.message || error.error}</Message>}
            {!isLoading && !error && course && course.data ? (
                <div className="py-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 text-primary">{course.data.title}</h1>
                    <img
                        src={course.data.image}
                        alt={course.data.title}
                        className="w-full h-64 object-cover mb-6 rounded-lg shadow-lg"
                    />
                    <div className="space-y-4">
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold mb-2 text-secondary">Description:</h2>
                            <p className="text-lg text-gray-700">{course.data.description}</p>
                        </div>
                        <div className="flex items-center">
                            <h2 className="text-2xl font-semibold mb-2 text-secondary">Price:</h2>
                            <p className="text-lg text-gray-700 ml-2">{course.data.price} $</p>
                        </div>
                        <div className="flex items-center">
                            <h2 className="text-2xl font-semibold mb-2 text-secondary">Category:</h2>
                            <p className="text-lg text-gray-700 ml-2">{course.data.category?.join(', ') || 'Not Specified'}</p>
                        </div>
                        <div className="flex items-center">
                            <h2 className="text-2xl font-semibold mb-2 text-secondary">Level:</h2>
                            <p className="text-lg text-gray-700 ml-2">{course.data.minimumLevel}</p>
                        </div>
                        <div className="flex items-center">
                            <h2 className="text-2xl font-semibold mb-2 text-secondary">Weeks:</h2>
                            <p className="text-lg text-gray-700 ml-2">{course.data.weeks}</p>
                        </div>
                            <div className="flex items-center">
                            <h2 className="text-2xl font-semibold mb-2 text-secondary">Number of Lectures:</h2>
                        <p className="text-lg text-gray-700 ml-2">{course.data.numOfLectures}</p>
                        </div>
                        <div className="flex items-center">
                            <h2 className="text-2xl font-semibold mb-2 text-secondary">Creator:</h2>
                            <p className="text-lg text-gray-700 ml-2">{course.data.creatorName}</p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        {!userInfo ? (
                            <Button color="primary" to="/login">
                                Log in to Add to Cart
                            </Button>
                        ) : isCreator || isPurchased ? (
                            <Button color="primary" to={`/me/mycourses/${id}`}>
                                Start Learning
                            </Button>
                        ) : (
                            <Button color="primary" onClick={addToCartHandler} disabled={cartItems.some(item => item._id === id)}>
                                {cartItems.some(item => item._id === id) ? 'Already in Cart' : 'Add to Cart'}
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <div>No course data available</div>
            )}
        </div>
    );
};

export default CourseDetailsPage;
