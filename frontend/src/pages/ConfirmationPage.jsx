import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../Components/Button';
import MiddleText from '../Components/MiddleText';

const ConfirmationPage = () => {
    const { cartItems, totalPrice } = useSelector((state) => state.cart);

    return (
        <div className="confirmation-page container mx-auto p-4 px-4 md:px-10 lg:px-40">
            <MiddleText text="Thank You for Your Order!" />
            <div className="order-summary bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
                <p className="text-lg mb-4">Your order has been placed successfully. Here are the details:</p>
                
                <div className="mb-6">
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">{item.title}</h3>
                            <p>${item.price.toFixed(2)}</p>
                        </div>
                    ))}
                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">Total:</h3>
                            <p className="text-xl font-bold">${totalPrice}</p>
                        </div>
                    </div>
                </div>

                <p className="text-lg mb-4">Thank you for shopping with us. If you have any questions, feel free to contact our support team.</p>

                <div className="mt-6">
                    <Button color='primary' onClick={() => window.location.href = '/me'} className="w-full">
                        Return to Your Courses, Happy Learning!
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;
