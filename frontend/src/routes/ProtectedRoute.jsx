import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ redirectPath = "/home", children }) => {
  const loggedIn = useSelector((state) => state.user.isLoggedIn);
  if (!loggedIn) {
    return <Navigate to={redirectPath} replace></Navigate>;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
