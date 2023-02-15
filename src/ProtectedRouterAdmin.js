import React from 'react'
import { useSelector } from "react-redux"
import { useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom"





const ProtectedRouteAdmin = ({ children }) => {


    let location = useLocation();

    if (Number(localStorage.getItem('userrole')) !== 1) {
        return <Navigate to="/" state={{ from: location }} replace />
    }
    return children
};

export default ProtectedRouteAdmin;