import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CoursesTable from '../../Components/CoursesTable';
import UsersTable from '../../Components/UsersTable';
import { useGetDashboardDataQuery } from '../../Redux/slices/adminSlice';
import MiddleText from '../../Components/MiddleText';
import Loader from '../../Components/Loader'; 

const AdminDashboard = () => {
  const { data, isLoading, error } = useGetDashboardDataQuery();

  if (isLoading) return <Loader />; 
  if (error) return <p>Error loading data: {error.message}</p>;

  const { counts, courses, users } = data.data;

  const chartData = [
    { name: 'Courses', count: counts.courses },
    { name: 'Lectures', count: counts.lectures },
    { name: 'Users', count: counts.users },
    { name: 'Purchased Courses', count: counts.purchasedCourses },
  ];

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
      <CoursesTable courses={courses} />
      <MiddleText text='Users' />
      <UsersTable users={users} />
    </div>
  );
};

export default AdminDashboard;
