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
import NavbarComponent from './navbar'

// let data = [];

export default function Profile() {


    const [id, setId] = useState('')
    const [currentdata, setCurrentdata] = useState('')
    let data = [];

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
                // setCurrentdata(doc.data())
                data.push(doc.data())
            });
            console.log(data)
        }).catch(err => {
            console.error(err)
        });
    }


    //     let productArray = []
    //     console.log('product Id is :: ', productId)
    //     const db = firebaseApp.firestore();
    //     db.collection("Products").where("productId", "==", productId).get().then(
    //         (querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 console.log('1')
    //                 // doc.data() is never undefined for query doc snapshots
    //                 // console.log(doc.id, " => ", doc.data());
    //                 productArray.push(doc.data())
    //             });
    //             console.log(productArray, 'data')
    //             this.setState({ ProductDetails: productArray, mainImage: productArray[0].mainImage, defaultMainImage: productArray[0].mainImage })
    //         }).catch(err => {
    //             console.error(err)
    //         });
    //     singleProductData = productArray
    //     console.log('product Array is :: ', productArray)
    // }




    return (
        <>
            <NavbarComponent />
            <div className='container mt-5 studentdetail' >
                <div className='row'>
                    <div className='col-lg-12 text-center mt-4'>
                        <img src={profilepicture} className="profilepicture" />
                    </div>

                </div>
                <div className='row ml-4'>
                    <div className='col-lg-6'>
                        <div className='mt-lg-5 mt-4'>

                            <i className="fa fa-map-marker-alt mr-2 usernames"></i>
                            <lable className="lablesdata ml-3">asdsads</lable>

                        </div>
                        <div className='mt-lg-5  mt-4 mb-sm-4'>
                            <i class="fa fa-mobile usernames" aria-hidden="true"></i>
                            <lable className="lablesdata ml-3">+91 63533998524</lable>
                        </div>
                        <div className='mt-lg-5 mb-lg-5 mt-4'>
                            <i class='fas fa-graduation-cap usernames'></i>
                            <lable className="lablesdata ml-3">FrontEnd Development</lable>
                        </div>
                    </div>

                    <div className='col-lg-6 '>
                        <div className='mt-lg-5 mt-4'>
                            <i class="fa fa-user usernames" aria-hidden="true"></i> <lable className="lablesdata ml-3">Darshil</lable>
                        </div>
                        <div className='mt-lg-5 mt-4'>
                            <i class="fa fa-envelope usernames" aria-hidden="true"></i> <lable className="lablesdata ml-3">abc@gmail.com</lable>
                        </div>
                        <div className='mt-lg-5 mt-4 '>
                            <i class="fa fa-birthday-cake usernames" aria-hidden="true"></i> <lable className="lablesdata ml-3">06/12/2000</lable>
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
                                <i class="fa fa-user usernames" aria-hidden="true"></i><lable className="lablesdata ml-3">AbcBhai</lable>
                            </div>
                            <div className='mt-lg-4 mt-sm-4 ml-lg-4'>
                                <i class='fas fa-briefcase usernames'></i><lable className="lablesdata ml-3">Construction</lable>
                            </div>
                            <div className='mt-lg-4 mt-sm-4 ml-lg-4 mb-sm-4'>
                                <i class="fa fa-mobile usernames" aria-hidden="true"></i><lable className="lablesdata ml-3">6358521575</lable>
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
                                <lable className="lablesdata ml-3">Mota varachha</lable>
                            </div>
                            <div className='mt-lg-4 mt-sm-4 ml-lg-4'>
                                <i class="fa-sharp fa-solid fa-city usernames"></i>
                                <lable className="lablesdata ml-3">Surat</lable>
                            </div>
                            <div className='mt-lg-4 mt-sm-4 ml-lg-4 mb-sm-4'>
                                <i class="fa-sharp fa-solid fa-city usernames"></i>
                                <lable className="lablesdata ml-3">Gujarat</lable>
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
                                <lable className="lablesdata ml-3">asdasd121212a</lable>
                            </div>
                            <div className='mt-lg-4 mt-sm-4 ml-lg-4'>
                                <i class="fa fa-inr usernames" aria-hidden="true"></i>
                                <lable className="lablesdata ml-3">2000</lable>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>



    )
}
