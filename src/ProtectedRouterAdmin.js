import React from 'react'
import { useSelector } from "react-redux"
import { useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom"
import { Context } from './contexts/HeaderContext';





const ProtectedRouteAdmin = ({ children }) => {


    let location = useLocation();



    // if (Number(localStorage.getItem('userrole')) !== 2) {


    return (
        <Context.Consumer>
            {value => <>
                {console.log(value.state.userRole)}
                {value.state.userRole !== 2 ? <Navigate to="/" state={{ from: location }} replace /> : children}</>}
        </Context.Consumer>)
    // }

};

export default ProtectedRouteAdmin;