
import profilepicture from "./img/profilepicture.jpg"
import firebaseApp from './firebase/firebase'
import Navbarforprofile from './navbarforprofile'
import React, { Component } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

export default class Profile extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            currentdata: '',
            referencedata: '',
            sc: localStorage.getItem('sc'),
        }
    }

    componentDidMount() {

        const url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        this.setState({ id }, () => {
            this.getalldata();
        })
        console.log('come', this.state.sc)

    }

    getalldata = () => {
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.setState({ currentdata: doc.data() }, () => {
                    if (Number(localStorage.getItem('userrole')) !== 2) {
                        if (this.state.sc !== this.state.currentdata.password) {
                            window.location.href = '/'
                        }
                    }

                    this.getrefdata();
                })
            });
        }).catch(err => {
            console.error(err)
        });
    }


    getrefdata = () => {
        const db = firebaseApp.firestore();
        db.collection('Students').where("id", "==", this.state.currentdata.reference.refId).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.setState({ referencedata: doc.data() }, () => {
                    console.log('data :: ', this.state.referencedata)
                })
            });
        }).catch(err => {
            console.error(err)
        });
    }

    render() {
        return (
            <>
                <Navbarforprofile />
                {this.state.currentdata !== '' && <>
                    <div className='container mt-5 studentdetail' >
                        <div className='row'>
                            <div className='col-lg-12 text-center mt-4'>
                                <img src={profilepicture} className="profilepicture" />
                            </div>

                        </div>
                        <div className='row ml-4'>
                            <div className='col-lg-6'>
                                <div className='mt-lg-5 mt-4 text-left text-left'>

                                    <i className="fa fa-id-card usernames"></i>
                                    <label className="labelData ml-3">{this.state.currentdata.er_num}</label>

                                </div>
                                <div className='mt-lg-5  mt-4 mb-sm-4 text-left'>
                                    <i class="fa fa-mobile usernames" aria-hidden="true"></i>
                                    <label className="labelData ml-3">{this.state.currentdata.phone}</label>
                                </div>
                                <div className='mt-lg-5 mb-lg-5 mt-4 text-left'>
                                    <i class='fas fa-graduation-cap usernames'></i>
                                    <label className="labelData ml-3">{this.state.currentdata.courses == 1 ? <label className="labelData">Master In Webdesign</label> : this.state.currentdata.courses == 2 ? <label className="labelData">Master In Frontend Development</label> : this.state.currentdata.courses == 3 ? <label className="labelData">Master In backend Development </label> : this.state.currentdata.courses == 4 ? <label className="labelData">firebase </label> : this.state.currentdata.courses == 5 ? <label className="labelData">Master in 360 & 3D Website</label> : this.state.currentdata.courses == 6 ? <label className="labelData">Master In Fullstack Development</label> : <div className='rendercon'></div>
                                    }</label>
                                </div >
                            </div >

                            <div className='col-lg-6 '>
                                <div className='mt-lg-5 mt-4 text-left'>
                                    <i class="fa fa-user usernames" aria-hidden="true"></i> <label className="labelData ml-3">{this.state.currentdata.f_name}</label>
                                </div>
                                <div className='mt-lg-5 mt-4 text-left'>
                                    <i class="fa fa-envelope usernames" aria-hidden="true"></i> <label className="labelData ml-3">{this.state.currentdata.email}</label>
                                </div>
                                <div className='mt-lg-5 mt-4 text-left '>
                                    <i class="fa fa-birthday-cake usernames" aria-hidden="true"></i> <label className="labelData ml-3">{this.state.currentdata.dob}</label>
                                </div>
                                {/* <div className='mt-lg-5 mt-4 '>
                            <i class="fa fa-link" aria-hidden="true"></i> <span className='ml-3 spans'>Tj62zYQcXC5GCjuP</span>
                        </div> */}

                            </div>
                        </div >
                        <div>
                        </div>
                    </div >

                    <div className='container mt-5 parentdetails '>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className='mt-4'>
                                        <h1>Parent's Detail</h1>
                                    </div>
                                    <div className='mt-lg-4 mt-sm-4 ml-lg-4 text-left'>
                                        <i class="fa fa-user usernames" aria-hidden="true"></i><label className="labelData ml-3">{this.state.currentdata.f_f_name}</label>
                                    </div>
                                    <div className='mt-lg-4 mt-sm-4 ml-lg-4 text-left'>
                                        <i class='fas fa-briefcase usernames'></i><label className="labelData ml-3">{this.state.currentdata.occupation}</label>
                                    </div>
                                    <div className='mt-lg-4 mt-sm-4 ml-lg-4 mb-sm-4 text-left'>
                                        <i class="fa fa-mobile usernames" aria-hidden="true"></i><label className="labelData ml-3">{this.state.currentdata.f_phone}</label>
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
                                    <div className='mt-lg-4 mt-sm-4 ml-lg-4 text-left'>
                                        <i class="fa fa-map-marker usernames " aria-hidden="true"></i>
                                        <label className="labelData ml-3">{this.state.currentdata.city}</label>
                                    </div>
                                    <div className='mt-lg-4 mt-sm-4 ml-lg-4 text-left'>
                                        <i class="fa-sharp fa-solid fa-city usernames"></i>
                                        <label className="labelData ml-3">{this.state.currentdata.state}</label>
                                    </div>
                                    <div className='mt-lg-4 mt-sm-4 ml-lg-4 mb-sm-4 text-left'>
                                        <i class="fa-sharp fa-solid fa-city usernames"></i>
                                        <label className="labelData ml-3">{this.state.currentdata.country}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
            </>
        )
    }
}




