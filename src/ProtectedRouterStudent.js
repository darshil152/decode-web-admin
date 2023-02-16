import React, { Component } from 'react'
import { useSelector } from "react-redux"
import { useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom"




const ProtectedRouteStudent = ({ children }) => {





    let location = useLocation();
    // console.log('first', getlocalrole)
    if (Number(localStorage.getItem('userrole')) !== 1) {
        // console.log('come')
        return <Navigate to="/" state={{ from: location }} replace />
    }
    return children

};

export default ProtectedRouteStudent;