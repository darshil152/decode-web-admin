import React, { Component } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import firebaseApp from './firebase/firebase';
import Studentlayout from "./studentlayout/studentlayout"

export default class Timetable extends Component {
    constructor(props) {
        super();
        this.state = {
            id: "",
            currentuser: "",
            sc: localStorage.getItem('sc'),

        }
    }

    componentDidMount() {
        const url = window.location.href;
        var ids = url.substring(url.lastIndexOf('/') + 1);
        this.setState({ id: ids }, () => {
            this.getuserrole();
        })
    }


    getuserrole = () => {
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                this.setState({ currentuser: doc.data().password })
                this.setState({ currentdata: doc.data(), email: doc.data().email, dob: doc.data().dob, profile: doc.data().profile_img ? doc.data().profile_img : '', line_1: doc.data().line_1, line_2: doc.data().line_2, city: doc.data().city }, () => {
                    if (Number(localStorage.getItem('userrole')) !== 2) {
                        if (this.state.sc !== this.state.currentuser) {
                            window.location.href = '/'
                        }
                    }
                })
            });
        }).catch(err => {
            console.error(err)
        });
    }
    render() {
        return (
            <>
                <Studentlayout>
                    <div className='content-main-section left'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12 text-center'>
                                    <div className='abc'>
                                        <table className='tabledesign'>
                                            <thead>
                                                <tr class="table-headers">
                                                    <th className='headingstable' >Date</th>
                                                    <th className='headingstable'>Day</th>
                                                    <th className='headingstable'>Description</th>
                                                </tr>
                                            </thead>
                                            <tr>
                                                <td className='detailtable'>14/01/2023</td>
                                                <td className='detailtable'>Saturday</td>
                                                <td className='detailtable'>Makarsankranti</td>
                                            </tr>

                                            <tr>
                                                <td className='detailtable'>26/01/2023</td>
                                                <td className='detailtable'>Thursday</td>
                                                <td className='detailtable'>Republic Day </td>
                                            </tr>
                                            <tr>
                                                <td className='detailtable'>08/03/2023</td>
                                                <td className='detailtable'>Wednesday</td>
                                                <td className='detailtable'>Dhuleti</td>
                                            </tr>
                                            <tr>
                                                <td className='detailtable'>30/03/2023</td>
                                                <td className='detailtable'>Thursday</td>
                                                <td className='detailtable'>Ram Navmi</td>
                                            </tr>
                                            <tr>
                                                <td className='detailtable'>14/08/2023</td>
                                                <td className='detailtable'>Tuesday</td>
                                                <td className='detailtable'>Independence Day</td>
                                            </tr>
                                            <tr>
                                                <td className='detailtable'>30/08/2023</td>
                                                <td className='detailtable'>Wednesday</td>
                                                <td className='detailtable'>Raksha Bandhan</td>
                                            </tr>
                                            <tr>
                                                <td className='detailtable'>07/09/2023</td>
                                                <td className='detailtable'>Thursday</td>
                                                <td className='detailtable'>Janmashtami</td>
                                            </tr>
                                            <tr>
                                                <td className='detailtable'>08/09/2023</td>
                                                <td className='detailtable'>Friday</td>
                                                <td className='detailtable'>Janmashtami</td>
                                            </tr>
                                            <tr>
                                                <td className='detailtable'>28/09/2023</td>
                                                <td className='detailtable'>Thursday</td>
                                                <td className='detailtable'>Ganpati Visharjan</td>
                                            </tr>
                                            <tr>
                                                <td className='detailtable'>24/10/2023</td>
                                                <td className='detailtable'>Tuesday</td>
                                                <td className='detailtable'>Dussehra</td>
                                            </tr>
                                            <tr>
                                                <td className='detailtable'>10/11/2023 to
                                                    24/11/2023
                                                </td>
                                                <td className='detailtable'>-</td>
                                                <td className='detailtable'>Diwali</td>
                                            </tr>
                                            <tr>
                                                <td className='detailtable'>25/12/2023</td>
                                                <td className='detailtable'>Monday</td>
                                                <td className='detailtable'>Christmas Day</td>
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
}
