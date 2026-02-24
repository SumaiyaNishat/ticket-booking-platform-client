import React from 'react'
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    // console.log('location', location);

    if(loading){
        return<LoadingSpinner></LoadingSpinner>
    }
  if(!user){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
  return children;
}

export default PrivateRoute