import { computeHeadingLevel } from '@testing-library/react'
import React from 'react'
import { useEffect } from 'react'
import profilepicture from "./img/profilepicture.jpg"
import reference from "./img/reference.jpg"
import firebaseApp from './firebase/firebase'
import { data } from 'jquery'
import { current } from '@reduxjs/toolkit'
import { useState } from 'react'
import { Navbar } from 'react-bootstrap'
import Navbarforprofile from './navbarforprofile'

// let data = [];

export default function Profile() {


    const [id, setId] = useState('')
    const [currentdata, setCurrentdata] = useState('')



    useEffect(() => {
        const url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        setId(id);
        getalldata();
    })


    const getalldata = () => {
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setCurrentdata(doc.data())
                // data.push(doc.data())
            });

        }).catch(err => {
            console.error(err)
        });
    }

    const getrefdata = () => {
        const db = firebaseApp.firestore();
        db.collection('Students').where("id", "==", Number(currentdata.reference.refId)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // setCurrentdata(doc.data())
                // data.push(doc.data())
                console.log(doc.data())
            });
        }).catch(err => {
            console.error(err)
        });
    }



    return (
        <>
            <Navbarforprofile />
            {currentdata !== '' && <>
                <div className='container mt-5 studentdetail' >
                    <div className='row'>
                        <div className='col-lg-12 text-center mt-4'>
                            <img src={profilepicture} className="profilepicture" />
                        </div>

                    </div>
                    <div className='row ml-4'>
                        <div className='col-lg-6'>
                            <div className='mt-lg-5 mt-4'>

                                <i className="fa fa-id-card usernames"></i>
                                <lable className="lablesdata ml-3">{currentdata.er_num}</lable>

                            </div>
                            <div className='mt-lg-5  mt-4 mb-sm-4'>
                                <i class="fa fa-mobile usernames" aria-hidden="true"></i>
                                <lable className="lablesdata ml-3">{currentdata.phone}</lable>
                            </div>
                            <div className='mt-lg-5 mb-lg-5 mt-4'>
                                <i class='fas fa-graduation-cap usernames'></i>
                                <lable className="lablesdata ml-3">{currentdata.courses}</lable>
                            </div>
                        </div>

                        <div className='col-lg-6 '>
                            <div className='mt-lg-5 mt-4'>
                                <i class="fa fa-user usernames" aria-hidden="true"></i> <lable className="lablesdata ml-3">{currentdata.f_name}</lable>
                            </div>
                            <div className='mt-lg-5 mt-4'>
                                <i class="fa fa-envelope usernames" aria-hidden="true"></i> <lable className="lablesdata ml-3">{currentdata.email}</lable>
                            </div>
                            <div className='mt-lg-5 mt-4 '>
                                <i class="fa fa-birthday-cake usernames" aria-hidden="true"></i> <lable className="lablesdata ml-3">{currentdata.dob}</lable>
                            </div>
                            {/* <div className='mt-lg-5 mt-4 '>
                            <i class="fa fa-link" aria-hidden="true"></i> <span className='ml-3 spans'>Tj62zYQcXC5GCjuP</span>
                        </div> */}

                        </div>
                    </div>
                    <div>
                    </div>
                </div>

                <div className='container mt-5 parentdetails '>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='mt-4'>
                                    <h1>Parent's Detail</h1>
                                </div>
                                <div className='mt-lg-4 mt-sm-4 ml-lg-4'>
                                    <i class="fa fa-user usernames" aria-hidden="true"></i><lable className="lablesdata ml-3">{currentdata.f_f_name}</lable>
                                </div>
                                <div className='mt-lg-4 mt-sm-4 ml-lg-4'>
                                    <i class='fas fa-briefcase usernames'></i><lable className="lablesdata ml-3">{currentdata.occupation}</lable>
                                </div>
                                <div className='mt-lg-4 mt-sm-4 ml-lg-4 mb-sm-4'>
                                    <i class="fa fa-mobile usernames" aria-hidden="true"></i><lable className="lablesdata ml-3">{currentdata.f_phone}</lable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container mt-5 residentalDetail '>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='mt-4'>
                                    <h1>Resident Details</h1>
                                </div>
                                <div className='mt-lg-4 mt-sm-4 ml-lg-4'>
                                    <i class="fa fa-map-marker usernames " aria-hidden="true"></i>
                                    <lable className="lablesdata ml-3">{currentdata.city}</lable>
                                </div>
                                <div className='mt-lg-4 mt-sm-4 ml-lg-4'>
                                    <i class="fa-sharp fa-solid fa-city usernames"></i>
                                    <lable className="lablesdata ml-3">{currentdata.state}</lable>
                                </div>
                                <div className='mt-lg-4 mt-sm-4 ml-lg-4 mb-sm-4'>
                                    <i class="fa-sharp fa-solid fa-city usernames"></i>
                                    <lable className="lablesdata ml-3">{currentdata.country}</lable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container mt-5 residentalDetail '>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='mt-4'>
                                    <h1>reference Details</h1>
                                </div>
                                <div className='mt-lg-4 mt-sm-4 ml-lg-4'>
                                    <i class="fa fa-link usernames" aria-hidden="true"></i>
                                    <lable className="lablesdata ml-3">{currentdata.reference.refId}</lable>
                                </div>
                                <div className='mt-lg-4 mt-sm-4 ml-lg-4'>
                                    <i class="fa fa-inr usernames" aria-hidden="true"></i>
                                    <lable className="lablesdata ml-3">{currentdata.reference.refAmount}</lable>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </>}
        </>



    )
}
