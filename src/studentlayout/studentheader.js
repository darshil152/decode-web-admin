import { Dropdown } from "react-bootstrap";
import React, { createContext, useContext, useState, useEffect } from "react";
import Profile from "../img/profile.png";
import firebaseApp from "../firebase/firebase";
import HeaderLogo from "../img/logo-hdr.png"
import Left from "../img/left-arrow-icon.svg"




function StudentHeader(props) {

    const [ids, setIds] = useState('');
    const [showdata, setShowdata] = useState('');

    const addmainclass = () => {
        document.getElementById("root").classList.toggle("dash-main-class-add");
    };

    const openUserinfo = () => {
        document.getElementById("user-detail").classList.toggle("active-user-info");
    };



    useEffect(() => {
        let url = window.location.href;
        var getid = url.substring(url.lastIndexOf('/') + 1);
        setIds(getid);
        getalldata();
    }, [])




    const getalldata = () => {
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(ids)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setShowdata(doc.data())
            });

        }).catch(err => {
            console.error(err)
        });
    }

    return (
        <>
            <header className="header-fix-top-section">

                <div onClick={addmainclass} className="d-xl-none">
                    <img src={Left} className="me-3 img-fluid" alt="arrow" />
                </div>
                {/* <div className="hdr-top-info d-flex align-items-center">
                    <span className="me-2">
                        <img src={HeaderLogo} className="w-100 h-100" alt="logo" />
                    </span>
                    lorem ipsum llc
                </div> */}
                <div className="ms-auto mobile-responsive-info" id="user-detail">
                    <div className="d-flex align-items-center mobile-responsive-info-inr">

                        <div className="dropdown-header p-0 ms-3">
                            <Dropdown >
                                <Dropdown.Toggle id="dropdown" >
                                    <img src={Profile} alt="profile" />
                                    <div className="ps-3 text-start">
                                        <span className="d-block">{showdata.f_name}</span>
                                        <bdi className="d-block">{showdata.email}</bdi>
                                        <bdi className="d-block">{showdata.phone}</bdi>
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
        </>
    );
}

export default StudentHeader;
