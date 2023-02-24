import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import firebaseApp from './firebase/firebase';
import Studentlayout from "./studentlayout/studentlayout"

export default function Timetable() {

    const [id, setId] = useState("")

    useEffect(() => {
        var url = window.location.href;
        var lastid = url.substring(url.lastIndexOf('/') + 1);
        setId(lastid);
        getuserrole();
    }, [])


    const getuserrole = () => {
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                this.setState({ currentdata: doc.data(), email: doc.data().email, dob: doc.data().dob, profile: doc.data().profile_img ? doc.data().profile_img : '', line_1: doc.data().line_1, line_2: doc.data().line_2, city: doc.data().city }, () => {
                    if (Number(localStorage.getItem('userrole')) !== 2) {
                        if (this.state.sc !== this.state.currentdata.password) {
                            window.location.href = '/'
                        }
                    }
                })
            });
        }).catch(err => {
            console.error(err)
        });
    }

    return (

        <>
            <Studentlayout>
                <div className='content-main-section left'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 text-center'>
                                <div className='abc'>
                                    <table>
                                        <tr>
                                            <th className='headings' >Date</th>
                                            <th className='headings'>Day</th>
                                            <th className='headings'>Description</th>
                                        </tr>
                                        <tr>
                                            <td>14/01/2023</td>
                                            <td>Saturday</td>
                                            <td>Makarsankranti</td>
                                        </tr>

                                        <tr>
                                            <td>26/01/2023</td>
                                            <td>Thursday</td>
                                            <td>Republic Day </td>
                                        </tr>
                                        <tr>
                                            <td>08/03/2023</td>
                                            <td>Wednesday</td>
                                            <td>Dhuleti</td>
                                        </tr>
                                        <tr>
                                            <td>30/03/2023</td>
                                            <td>Thursday</td>
                                            <td>Ram Navmi</td>
                                        </tr>
                                        <tr>
                                            <td>14/08/2023</td>
                                            <td>Tuesday</td>
                                            <td>Independence Day</td>
                                        </tr>
                                        <tr>
                                            <td>30/08/2023</td>
                                            <td>Wednesday</td>
                                            <td>Raksha Bandhan</td>
                                        </tr>
                                        <tr>
                                            <td>07/09/2023</td>
                                            <td>Thursday</td>
                                            <td>Janmashtami</td>
                                        </tr>
                                        <tr>
                                            <td>08/09/2023</td>
                                            <td>Friday</td>
                                            <td>Janmashtami</td>
                                        </tr>
                                        <tr>
                                            <td>28/09/2023</td>
                                            <td>Thursday</td>
                                            <td>Ganpati Visharjan</td>
                                        </tr>
                                        <tr>
                                            <td>24/10/2023</td>
                                            <td>Tuesday</td>
                                            <td>Dussehra</td>
                                        </tr>
                                        <tr>
                                            <td>10/11/2023 to
                                                24/11/2023
                                            </td>
                                            <td>-</td>
                                            <td>Diwali</td>
                                        </tr>
                                        <tr>
                                            <td>25/12/2023</td>
                                            <td>Monday</td>
                                            <td>Christmas Day</td>
                                        </tr>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Studentlayout>
        </>
    )
}
