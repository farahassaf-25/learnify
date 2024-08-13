import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);

    //console.log('User Info:', userInfo); 

    return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
