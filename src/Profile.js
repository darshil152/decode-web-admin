
import profilepicture from "./img/profilepicture.jpg"
import firebaseApp from './firebase/firebase'
import Navbarforprofile from './navbarforprofile'
import React, { Component } from 'react'

export default class Profile extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            currentdata: '',
            referencedata: '',
        }
    }

    componentDidMount() {
        const url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        this.setState({ id }, () => {
            this.getalldata();
        })

    }

    getalldata = () => {
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.setState({ currentdata: doc.data() }, () => {
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
                                    <lable className="lablesdata ml-3">{this.state.currentdata.er_num}</lable>

                                </div>
                                <div className='mt-lg-5  mt-4 mb-sm-4 text-left'>
                                    <i class="fa fa-mobile usernames" aria-hidden="true"></i>
                                    <lable className="lablesdata ml-3">{this.state.currentdata.phone}</lable>
                                </div>
                                <div className='mt-lg-5 mb-lg-5 mt-4 text-left'>
                                    <i class='fas fa-graduation-cap usernames'></i>
                                    <lable className="lablesdata ml-3">{this.state.currentdata.courses}</lable>
                                </div>
                            </div>

                            <div className='col-lg-6 '>
                                <div className='mt-lg-5 mt-4 text-left'>
                                    <i class="fa fa-user usernames" aria-hidden="true"></i> <lable className="lablesdata ml-3">{this.state.currentdata.f_name}</lable>
                                </div>
                                <div className='mt-lg-5 mt-4 text-left'>
                                    <i class="fa fa-envelope usernames" aria-hidden="true"></i> <lable className="lablesdata ml-3">{this.state.currentdata.email}</lable>
                                </div>
                                <div className='mt-lg-5 mt-4 text-left '>
                                    <i class="fa fa-birthday-cake usernames" aria-hidden="true"></i> <lable className="lablesdata ml-3">{this.state.currentdata.dob}</lable>
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
                                    <div className='mt-lg-4 mt-sm-4 ml-lg-4 text-left'>
                                        <i class="fa fa-user usernames" aria-hidden="true"></i><lable className="lablesdata ml-3">{this.state.currentdata.f_f_name}</lable>
                                    </div>
                                    <div className='mt-lg-4 mt-sm-4 ml-lg-4 text-left'>
                                        <i class='fas fa-briefcase usernames'></i><lable className="lablesdata ml-3">{this.state.currentdata.occupation}</lable>
                                    </div>
                                    <div className='mt-lg-4 mt-sm-4 ml-lg-4 mb-sm-4 text-left'>
                                        <i class="fa fa-mobile usernames" aria-hidden="true"></i><lable className="lablesdata ml-3">{this.state.currentdata.f_phone}</lable>
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
                                        <lable className="lablesdata ml-3">{this.state.currentdata.city}</lable>
                                    </div>
                                    <div className='mt-lg-4 mt-sm-4 ml-lg-4 text-left'>
                                        <i class="fa-sharp fa-solid fa-city usernames"></i>
                                        <lable className="lablesdata ml-3">{this.state.currentdata.state}</lable>
                                    </div>
                                    <div className='mt-lg-4 mt-sm-4 ml-lg-4 mb-sm-4 text-left'>
                                        <i class="fa-sharp fa-solid fa-city usernames"></i>
                                        <lable className="lablesdata ml-3">{this.state.currentdata.country}</lable>
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
                                    <div className='mt-lg-4 mt-sm-4 ml-lg-4 text-left'>
                                        <i class="fa fa-link usernames" aria-hidden="true"></i>
                                        <lable className="lablesdata ml-3">{this.state.referencedata.f_name}</lable>
                                    </div>
                                    <div className='mt-lg-4 mt-sm-4 ml-lg-4 text-left'>
                                        <i class="fa fa-inr usernames" aria-hidden="true"></i>
                                        <lable className="lablesdata ml-3">2000</lable>
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




