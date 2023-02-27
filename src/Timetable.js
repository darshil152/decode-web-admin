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
            currentuser: [],
        }
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
