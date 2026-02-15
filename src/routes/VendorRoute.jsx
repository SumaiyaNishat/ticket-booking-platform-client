import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const VendorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();

  const location = useLocation();

  
  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  
  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  if (role !== "vendor") {
    return <Navigate to="/dashboard" />;
  }

 
  return children;
};

export default VendorRoute;
