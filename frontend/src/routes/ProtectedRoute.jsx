import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ redirectPath = "/home", children }) => {
  // const isLoggedIn = useSelector((state) => state.advertiser.isLoggedIn);
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace></Navigate>;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
