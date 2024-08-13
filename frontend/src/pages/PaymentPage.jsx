import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../Redux/slices/orderApiSlice';
import Button from '../Components/Button';
import MiddleText from '../Components/MiddleText';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems, totalPrice } = useSelector((state) => state.cart);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');

    const handleCheckout = () => {
        if (!paymentMethod) return;

        const orderItems = cartItems.map(item => ({
            course: item.id,
            title: item.title,
            price: item.price,
        }));

        const itemsPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
        const taxPrice = (itemsPrice * 0.05).toFixed(2); // Example tax calculation
        const totalPrice = (itemsPrice + Number(taxPrice)).toFixed(2);

        dispatch(createOrder({
            orderItems,
            paymentMethod,
            itemsPrice,
            taxPrice,
            totalPrice,
        }));

        navigate('/confirmation');
    };

    return (
        <div className="payment-page container mx-auto py-8">
            <MiddleText text="Payment" />
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="payment-methods mb-6">
                    <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>
                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="PayPal"
                                checked={paymentMethod === 'PayPal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mr-2"
                            />
                            <span>PayPal</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="Credit Card"
                                checked={paymentMethod === 'Credit Card'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mr-2"
                            />
                            <span>Credit Card</span>
                        </label>
                    </div>
                </div>

                {paymentMethod === 'Credit Card' && (
                    <div className="credit-card-details space-y-4 mb-8">
                        <h2 className="text-xl font-semibold mb-4">Credit Card Details</h2>
                        <input 
                            type="text" 
                            placeholder="Card Number" 
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input 
                            type="text" 
                            placeholder="Expiry Date" 
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input 
                            type="text" 
                            placeholder="CVC/CVV" 
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input 
                            type="text" 
                            placeholder="Name on Card" 
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                )}

                <div className="order-summary">
                    <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-lg">${item.price.toFixed(2)}</p>
                        </div>
                    ))}
                    <div className="border-t pt-4 mt-4 flex justify-between items-center">
                        <h3 className="text-xl font-bold">Total:</h3>
                        <p className="text-xl font-bold">${totalPrice}</p>
                    </div>
                </div>

                <Button color='primary' onClick={handleCheckout} className="mt-6 w-full">
                    {paymentMethod === 'PayPal' ? 'Proceed to PayPal' : 'Complete Checkout'}
                </Button>
            </div>
        </div>
    );
};

export default PaymentPage;
