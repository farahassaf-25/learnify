import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import MainLayout from '../layouts/MainLayout';
import InlineMessage from '../Components/InlineMessage';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import MiddleText from '../Components/MiddleText';
import { FaTrash } from 'react-icons/fa';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = () => {
    dispatch(addToCart(course.data));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  }

  return (
    <MainLayout>
      <MiddleText text='Your Cart' />
      {cartItems.length === 0 ? (
        <div>
          <InlineMessage variant="info">
            Your cart is empty. <Link to="/courses" className="text-blue-500 underline">Go to Courses</Link>
          </InlineMessage>
        </div>
      ) : (
        <div>
          <div className="flex flex-col space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">{item.title}</h2>
                  <p>{item.price} $</p>
                </div>
                <Button color="secondary" onClick={() => handleRemoveFromCart(item._id)}>
                  <FaTrash />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Button color="primary">Proceed to Checkout</Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default CartPage;
