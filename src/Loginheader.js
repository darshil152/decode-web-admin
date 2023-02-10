import React from 'react'
import logo from "./img/logo.png"
import { Link, useNavigate } from "react-router-dom";



export default function Loginheader() {
    const navigate = useNavigate();

    const mainpage = () => {
        navigate('/')
    }


    return (
        <nav class="navbar navbar-light ">
            <a class="navbar-brand"  >
                <img src={logo} style={{ width: 200 }} onClick={mainpage} />
            </a>
        </nav>
    )
}
