
import profilepicture from "./img/profilepicture.jpg"
import firebaseApp from './firebase/firebase'
import Navbarforprofile from './navbarforprofile'
import { useContext } from "react"
import Studentlayout from "./studentlayout/studentlayout"
import { Modal, Button } from "react-bootstrap";
import React, { Component } from 'react'
import Rules from "./Rules"

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
            isOpen: false,
            defaultcheked: false,
            language: true,
            isOpen1: false,
            email: "",
            dob: "",
            temp: [],
        }
    }



    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });



    openModal1 = () => this.setState({ isOpen1: true });
    closeModal1 = () => this.setState({ isOpen1: false });


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
                console.log(doc.data())
                this.setState({ currentdata: doc.data(), email: doc.data().email, dob: doc.data().dob }, () => {
                    if (Number(localStorage.getItem('userrole')) !== 2) {
                        if (this.state.sc !== this.state.currentdata.password) {
                            window.location.href = '/'
                        }
                    }
                    if (!this.state.currentdata.terms) {
                        this.openModal()
                    } else {
                        this.closeModal();
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


    handleChange = (event) => {
        if (event.target.checked) {
            this.setState({ defaultcheked: true })
        }
        else {
            this.setState({ defaultcheked: false })
        }
    }

    submitform = () => {
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", this.state.id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("Students").doc(doc.ref.id);

                return updateCollection.update({
                    terms: true
                })
                    .then(() => {
                        console.log("Document successfully updated!");
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            })
        }).catch(err => {
            console.error(err)
        });
    }


    clicks = () => {
        // this.submitform();
        this.closeModal();
    }

    chagees = () => {
        this.setState({ language: !this.state.language })
    }

    handleemail = (event) => {
        this.setState({ email: event.target.value })
    }
    handledob = (event) => {
        this.state({ dob: event.target.value })
    }

    editform1 = (data) => {
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", this.state.id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("Students").doc(doc.ref.id);


                return updateCollection.update({
                    email: data.email,
                    dob: data.dob,
                })
                    .then(() => {
                        console.log("Document successfully updated!");
                        this.closeModal1();

                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            })
        }).catch(err => {
            console.error(err)
        });
    }

    handlesave = (data) => {
        console.log(this.state.email)
        console.log(this.state.dob)
        this.editform1(data);
    }


    render() {
        return (
            <>
                <Studentlayout>
                    <Modal size='xl' show={this.state.isOpen} >
                        <Modal.Header  >
                            <Modal.Title>
                                <div className="lanfgauge d-flex">
                                    <h3>
                                        Rules & Regulations
                                    </h3>
                                    <button onClick={this.chagees}>{this.state.language == true ? 'English' : 'Gujarati'}</button>
                                </div>

                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Rules language={this.state.language} />
                        </Modal.Body>

                        <Modal.Body >

                            <div className="condition d-flex">
                                <input
                                    type="checkbox"
                                    name="agreement"
                                    onChange={this.handleChange}
                                />
                                <label for="js" className="ml-3 mt-2" > I agree with all the terms and condition </label>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-primary" disabled={!this.state.defaultcheked} onClick={this.clicks}>Continue</button>
                        </Modal.Footer>
                    </Modal>


                    <Modal show={this.state.isOpen1} onHide={this.closeModal1}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>



                            Email :  <input type="email" name="email" value={this.state.email} class="emailstyle" onChange={this.handleemail} />
                            birthday : <input type="date" value={this.state.dob} class="emailstyle" onChange={this.handledob} />

                            <Button className="btn btn-priamry mt-3gi" onClick={this.handlesave} >
                                Save Changes
                            </Button>



                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeModal1}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {this.state.currentdata !== '' && <>
                        <div className="content-main-section left">
                            <div className='container mt-5 studentdetail' >
                                <div className="showdiv">

                                    <div className='row'>
                                        <div className='col-lg-11 text-center mt-4'>
                                            <img src={profilepicture} className="profilepicture" />
                                        </div>
                                        <div className="col-lg-1 mt-5  abced">
                                            <button className="buttonedit btn btn-primary btn-lg" onClick={this.openModal1}>
                                                <i class="fa fa-pencil" aria-hidden="true"></i></button>
                                        </div>
                                    </div>

                                    <div className='row ml-4'>
                                        <div className='col-lg-6'>
                                            <div className='mt-lg-5 mt-5 d-flex text-left text-left'>
                                                <i className="fa fa-id-card usernames"></i>
                                                <label className="labelData ml-3 mb-2">{this.state.currentdata.er_num}</label>
                                            </div>
                                            <div className='mt-lg-5 d-flex mt-4 mb-sm-4 text-left'>
                                                <i class="fa fa-mobile usernames" aria-hidden="true"></i>
                                                <label className="labelData ml-3">{this.state.currentdata.phone}</label>
                                            </div>
                                            <div className='mt-lg-5 d-flex mb-lg-5 mt-4 text-left'>
                                                <i class='fas fa-graduation-cap usernames'></i>
                                                <label className="labelData ml-3">{this.state.currentdata.courses == 1 ? <label className="labelData">Master In Webdesign</label> : this.state.currentdata.courses == 2 ? <label className="labelData">Master In Frontend Development</label> : this.state.currentdata.courses == 3 ? <label className="labelData">Master In backend Development </label> : this.state.currentdata.courses == 4 ? <label className="labelData">firebase </label> : this.state.currentdata.courses == 5 ? <label className="labelData">Master in 360 & 3D Website</label> : this.state.currentdata.courses == 6 ? <label className="labelData">Master In Fullstack Development</label> : this.state.currentdata.courses == 7 ? <label className="labelData">Master In MERN-stack Development</label> : <div className='rendercon'></div>}</label>
                                            </div>
                                        </div>

                                        <div className='col-lg-6 '>
                                            <div className='mt-lg-5 d-flex mt-4 text-left'>
                                                <i class="fa fa-user usernames" aria-hidden="true"></i> <label className="labelData ml-3">{this.state.currentdata.f_name}</label>
                                            </div>
                                            <div className='mt-lg-5 d-flex mt-4 text-left'>
                                                <i class="fa fa-envelope usernames" aria-hidden="true"></i> <label className="labelData ml-3" style={{ wordBreak: "break-all" }}>{this.state.currentdata.email}</label>
                                            </div>
                                            <div className='mt-lg-5 d-flex mt-4 text-left '>
                                                <i class="fa fa-birthday-cake usernames" aria-hidden="true"></i> <label className="labelData ml-3">{this.state.currentdata.dob}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>

                            <div className='container mt-5 parentdetails '>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <div className='mt-4'>
                                                <h1>Parent's Detail</h1>
                                            </div>
                                            <div className='mt-lg-4 d-flex mt-sm-4 ml-lg-4 text-left'>
                                                <i class="fa fa-user usernames" aria-hidden="true"></i><label className="labelData ml-3">{this.state.currentdata.f_f_name}</label>
                                            </div>
                                            <div className='mt-lg-4 d-flex mt-sm-4 ml-lg-4 text-left'>
                                                <i class='fas fa-briefcase usernames'></i><label className="labelData ml-3">{this.state.currentdata.occupation}</label>
                                            </div>
                                            <div className='mt-lg-4  d-flex mt-sm-4 ml-lg-4 mb-sm-4 text-left'>
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
                                            <div className='mt-lg-4 d-flex mt-sm-4 ml-lg-4 text-left'>
                                                <i class="fa fa-map-marker usernames " aria-hidden="true"></i>
                                                <label className="labelData ml-3">{this.state.currentdata.line_1}</label>
                                            </div>
                                            <div className='mt-lg-4 d-flex mt-sm-4 ml-lg-4 text-left'>
                                                <i class="fa-sharp fa-solid fa-city usernames"></i>
                                                <label className="labelData ml-3">{this.state.currentdata.line_2}</label>
                                            </div>
                                            <div className='mt-lg-4 d-flex mt-sm-4 ml-lg-4 mb-sm-4 text-left'>
                                                <i class="fa-sharp fa-solid fa-city usernames"></i>
                                                <label className="labelData ml-3">{this.state.currentdata.city}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    }
                </Studentlayout>
            </>
        )
    }
}




