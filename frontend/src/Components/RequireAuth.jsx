import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function RequireAuth({ allowedRoles }) {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  const isLoggedIn = !!userInfo; //check if userInfo is present
  const role = userInfo && userInfo.user ? userInfo.user.role : null; // Get the user role

  // console.log("RequireAuth - User Info:", userInfo); 
  // console.log("RequireAuth - Is Logged In:", isLoggedIn); 
  // console.log("RequireAuth - User Role:", role); 

  //check if user is logged in and has the required role
  if (isLoggedIn && allowedRoles.includes(role)) {
    return <Outlet />;
  }

  //if user is logged in but does not have permission, redirect to denied page
  if (isLoggedIn) {
    return <Navigate to="/denied" state={{ from: location }} replace />;
  }

  //if not logged in, redirect to login page
  return <Navigate to="/login" state={{ from: location }} replace />;
}

