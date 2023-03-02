import { Dropdown } from "react-bootstrap";
import React, { createContext, useContext, useState, useEffect } from "react";
import Profile from "../img/profile.png";
import firebaseApp from "../firebase/firebase";
import HeaderLogo from "../img/logo-hdr.png"
import Left from "../img/left-arrow-icon.svg"
import menu from "../img/menu.png"
import { Context } from "../contexts/HeaderContext";





function StudentHeader(props) {

    const [ids, setIds] = useState('');
    const [showdata, setShowdata] = useState('');

    const addmainclass = () => {
        document.getElementById("root").classList.toggle("dash-main-class-add");
    };

    const openUserinfo = () => {
        document.getElementById("user-detail").classList.toggle("active-user-info");

    };


    return (
        <Context.Consumer>
            {value => <>
                <header className="header-fix-top-section">
                    <div onClick={addmainclass} className="d-xl-none abce">
                        <img src={menu} className="me-3 mr-3 imgmenu" alt="arrow" />
                    </div>
                    <div className="ms-auto mobile-responsive-info" id="user-detail">
                        <div className="d-flex align-items-center mobile-responsive-info-inr">

                            <div className="dropdown-header p-0 ms-3">
                                <Dropdown >
                                    <Dropdown.Toggle id="dropdown" >
                                        <div className="asdasd">

                                            <img src={value.state.currentStudentData.profile_img !== '' ? value.state.currentStudentData.profile_img : Profile} alt="profile" />
                                            <h2 className="d-md-none ">{value.state.currentStudentData.f_name + ' ' + value.state.currentStudentData.l_name}</h2>
                                            <h6 className="d-md-none">{value.state.currentStudentData.er_num}</h6>
                                        </div>


                                        <div className=" pl-3 text-start">
                                            <span className="d-block">{value.state.currentStudentData.f_name + ' ' + value.state.currentStudentData.l_name}</span>
                                            <bdi className="d-block">{value.state.currentStudentData.er_num}</bdi>
                                        </div>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className="d-md-none" onClick={openUserinfo}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                        </svg>
                    </div>
                </header>
            </>}
        </Context.Consumer>
    );
}

export default StudentHeader;
