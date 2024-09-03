import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDeleteOrderByAdminMutation } from '../Redux/slices/adminSlice';

const OrdersTable = ({ orders, onDeleteOrder }) => {
  const [deleteOrderByAdmin] = useDeleteOrderByAdminMutation();

  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
        try {
            await deleteOrderByAdmin(orderId).unwrap();
            onDeleteOrder(orderId);
        } catch (error) {
            console.error('Failed to delete the order:', error);
            alert('Failed to delete the order. Please try again.');
        }
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="table border-collapse border-2 border-gray-400">
        <thead>
          <tr className="text-textColor text-xl">
            <th className="border-2 border-gray-400">Order ID</th>
            <th className="border-2 border-gray-400">User ID</th>
            <th className="border-2 border-gray-400">Courses Ordered</th>
            <th className="border-2 border-gray-400">Total Price</th>
            <th className="border-2 border-gray-400">Delete</th>
          </tr>
        </thead>
        <tbody className="text-xl text-primary">
          {orders.map((order) => (
            <tr key={order._id} className="border-t border-2 border-gray-400">
              <td className="border-2 border-gray-400">{order._id}</td>
              <td className="border-2 border-gray-400">{order.user ? order.user._id : 'No User'}</td>
              <td className="border-2 border-gray-400">
                <ul>
                  {order.orderItems ? order.orderItems.map((item, index) => (
                    <li key={index}>
                      - {item.course ? `${item.course._id}` : 'Course not found'} 
                      {item.price !== undefined ? ` ($${item.price})` : ''}
                    </li>
                  )) : 'No Items'}
                </ul>
              </td>
              <td className="border-2 border-gray-400">${order.totalPrice}</td>
              <td className="border-2 border-gray-400">
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(order._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;