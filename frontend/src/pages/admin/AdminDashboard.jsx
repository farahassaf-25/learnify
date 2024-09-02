import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CoursesTable from '../../Components/CoursesTable';
import UsersTable from '../../Components/UsersTable';
import OrdersTable from '../../Components/OrdersTable';
import { useGetDashboardDataQuery } from '../../Redux/slices/adminSlice';
import MiddleText from '../../Components/MiddleText';
import Loader from '../../Components/Loader';

const AdminDashboard = () => {
  const { data, isLoading, error } = useGetDashboardDataQuery();
  const [counts, setCounts] = useState({
    courses: 0,
    lectures: 0,
    users: 0,
    purchasedCourses: 0,
  });
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data) {
      const { counts, courses: fetchedCourses, users: fetchedUsers, orders: fetchedOrders } = data.data;
      setCounts(counts);
      setCourses(fetchedCourses);
      setUsers(fetchedUsers);
      setOrders(fetchedOrders);
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading data: {error.message}</p>;

  const chartData = [
    { name: 'Courses', count: counts.courses },
    { name: 'Lectures', count: counts.lectures },
    { name: 'Users', count: counts.users },
    { name: 'Purchased Courses', count: counts.purchasedCourses },
  ];

  const handleUserDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
    setCounts((prevCounts) => ({
      ...prevCounts,
      users: prevCounts.users - 1,
    }));
  };

  const handleCourseDelete = (courseId) => {
    setCourses((prevCourses) => prevCourses.filter(course => course._id !== courseId));
    setCounts((prevCounts) => ({
      ...prevCounts,
      courses: prevCounts.courses - 1,
    }));
  };

  const handleDeleteOrder = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
    setCounts((prevCounts) => ({
      ...prevCounts,
      purchasedCourses: prevCounts.purchasedCourses - 1,
    }));
  };

  return (
    <div className='p-6 px-20'>
      <MiddleText text='Learnify Statistics' />
      <ResponsiveContainer width="100%" height={400} className='mb-10'>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#EC5C2E" />
        </BarChart>
      </ResponsiveContainer>
      <MiddleText text='Courses' />
      <CoursesTable courses={courses} onDelete={handleCourseDelete} />
      <MiddleText text='Users' />
      <UsersTable users={users} onDelete={handleUserDelete} />
      <MiddleText text='Orders' />
      <OrdersTable orders={orders} onDeleteOrder={handleDeleteOrder} />
    </div>
  );
};

export default AdminDashboard;
