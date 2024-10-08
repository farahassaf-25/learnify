import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import MiddleText from '../Components/MiddleText';
import { toast } from 'react-toastify';
import { removeFromCart } from '../Redux/slices/cartSlice';
import { FaTrash } from 'react-icons/fa';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    toast.info('Course removed from cart');
  };

  const checkoutHandler = () => {
    navigate('/payment/checkout');
  };

  return (
    <div className="container mx-auto p-4">
      <MiddleText text="Your Cart" />
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center">
          <Button color="primary" className="mb-4">
            Your cart is empty. <Link to="/courses" className="text-blue-500 underline">Go to Courses</Link>
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex flex-col space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between flex-wrap border-b py-2">
                <div className="flex-1">
                  <h2 className="text-lg md:text-2xl font-semibold">{item.title}</h2>
                  <p className="text-sm md:text-base">{item.price} $</p>
                </div>
                <Button 
                  color="secondary" 
                  onClick={() => handleRemoveFromCart(item._id)} 
                  className="ml-2 mt-2 md:mt-0"
                >
                  <FaTrash />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Button color="primary" onClick={checkoutHandler}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;