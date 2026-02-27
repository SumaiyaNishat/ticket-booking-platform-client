import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner"

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const [role, roleLoading] = useRole();

  const location = useLocation();

  // loading state
  if (loading || roleLoading) {
    return (
     <LoadingSpinner></LoadingSpinner>
    );
  }

  // not logged in
  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
  }
  if (role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AdminRoute;
