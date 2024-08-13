import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../Redux/slices/orderApiSlice';
import MiddleText from '../Components/MiddleText';
import Button from '../Components/Button';
import Form from '../Components/Form';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems, totalPrice } = useSelector((state) => state.cart);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');

    const handleCheckout = (e) => {
        e.preventDefault();
        if (!paymentMethod) return;

        const orderItems = cartItems.map(item => ({
            course: item.id,
            title: item.title,
            price: item.price,
        }));

        const itemsPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
        const taxPrice = (itemsPrice * 0.05).toFixed(2);
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

    const creditCardFields = [
        { id: 'cardNumber', label: 'Card Number', type: 'text', placeholder: 'Card Number' },
        { id: 'expiryDate', label: 'Expiry Date', type: 'text', placeholder: 'MM/YY' },
        { id: 'cvc', label: 'CVC/CVV', type: 'text', placeholder: 'CVC/CVV' },
        { id: 'nameOnCard', label: 'Name on Card', type: 'text', placeholder: 'Full Name' },
    ];

    return (
        <div className="container mx-auto p-4">
            <MiddleText text="Payment" />
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <div className="mb-6">
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
                            PayPal
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="Credit Card"
                                checked={paymentMethod === 'Credit Card'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mr-2"
                            />
                            Credit Card
                        </label>
                    </div>
                </div>

                {paymentMethod === 'Credit Card' && (
                    <Form
                        title="Credit Card Details"
                        fields={creditCardFields}
                        onSubmit={handleCheckout}
                        submitLabel="Complete Checkout"
                    />
                )}

                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                    {cartItems.map(item => (
                        <div key={item._id || item.id} className="flex justify-between items-center mb-2">
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

                {paymentMethod === 'PayPal' && (
                    <div className="mt-6">
                        <Button color="primary" onClick={handleCheckout} className="w-full">
                            Proceed to PayPal
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;