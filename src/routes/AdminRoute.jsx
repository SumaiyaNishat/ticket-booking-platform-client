import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {

  const { user, loading } = useAuth();

  const [role, roleLoading] = useRole();

  const location = useLocation();


  // loading state
  if (loading || roleLoading) {

    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  }


  // not logged in
  if (!user) {

    return (
      <Navigate
        to="/login"
        state={location.pathname}
      />
    );

  }
  // not admin
  if (role !== "admin") {

    return (
      <Navigate to="/" />
    );

  }


  return children;

};

export default AdminRoute;
