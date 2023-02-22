
import profilepicture from "./img/profilepicture.jpg"
import firebaseApp from './firebase/firebase'
import Navbarforprofile from './navbarforprofile'
import { useContext } from "react"
import Studentlayout from "./studentlayout/studentlayout"
import { Modal, Button } from "react-bootstrap";
import React, { Component } from 'react'
import Rules from "./Rules"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import { FastField } from "formik"


export default class Profile extends Component {


    constructor() {
        super();
        this.state = {
            profile: '',
            id: "",
            currentdata: '',
            referencedata: '',
            sc: localStorage.getItem('sc'),
            isOpen: false,
            defaultcheked: false,
            language: true,
            isOpen1: false,
            isOpen2: false,
            email: "",
            dob: "",
            temp: [],
            line_1: "",
            line_2: "",
            city: "",
        }
    }



    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });



    openModal1 = () => this.setState({ isOpen1: true });
    closeModal1 = () => this.setState({ isOpen1: false });



    openModal2 = () => this.setState({ isOpen2: true });
    closeModal2 = () => this.setState({ isOpen2: false });

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
                this.setState({ currentdata: doc.data(), email: doc.data().email, dob: doc.data().dob, profile: doc.data().profile_img ? doc.data().profile_img : '' }, () => {
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
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("Students").doc(doc.ref.id);

                return updateCollection.update({
                    terms: true
                })
                    .then(() => {
                        console.log("Document successfully updated!");
                        this.closeModal()

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
        this.submitform();
        // this.closeModal();
    }

    chagees = () => {
        this.setState({ language: !this.state.language })
    }

    handleemail = (event) => {
        this.setState({ email: event.target.value })
    }
    handledob = (event) => {
        this.setState({ dob: event.target.value })
    }
    handleline1 = (event) => {
        this.setState({ line_1: event.target.value })
    }
    handleline2 = (event) => {
        this.setState({ line_2: event.target.value })
    }
    handlecity = (event) => {
        this.setState({ city: event.target.value })

    }

    editform1 = () => {
        console.log('coem', this.state.id)
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("Students").doc(doc.ref.id);


                return updateCollection.update({
                    email: this.state.email,
                    dob: this.state.dob,
                    profile_img: this.state.profile
                })
                    .then(() => {
                        console.log("Document successfully updated!");
                        this.getalldata();
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

    updateadd = () => {
        console.log('coem', this.state.id)
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("Students").doc(doc.ref.id);


                return updateCollection.update({
                    line_1: this.state.line_1,
                    line_2: this.state.line_2,
                    city: this.state.city
                })
                    .then(() => {
                        console.log("Document successfully updated!");
                        this.closeModal2();

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

    handlesave = () => {
        this.editform1();
    }
    handlesaveaddress = () => {
        this.updateadd();
    }

    UploadImageTOFirebase = (file) => {
        const guid = () => {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return String(this.state.id + '-' + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4());
        }


        let myPromise = new Promise((resolve, reject) => {

            const myGuid = guid();
            const storageUrl = firebaseApp.storage('gs://hey1-portfolio.appspot.com/')
            const storageRef = storageUrl.ref();
            console.log('ref : ', storageRef)
            const uploadTask = storageRef.child('decode').child('profile').child(myGuid).put(file)
            uploadTask.on('state_changed',
                (snapShot) => {

                }, (err) => {
                    //catches the errors
                    console.log(err)
                    reject(err)
                }, () => {

                    firebaseApp
                        .storage('gs://hey1-portfolio.appspot.com/')
                        .ref()
                        .child('decode')
                        .child('profile')
                        .child(myGuid)
                        .getDownloadURL()
                        .then(fireBaseUrl => {
                            resolve(fireBaseUrl)
                        }).catch(err => {
                            console.log('error caught', err)
                        })
                })
        })
        myPromise.then(url => {
            console.log(url)
            this.setState({ profile: url })
            // sendMessage(data)
        }).catch(err => {
            console.log('error caught', err)
        })
    }


    handleFileChange = (e) => {
        console.log('e :: ', e.target.files[0])
        this.UploadImageTOFirebase(e.target.files[0])
    }


    render() {
        return (
            <>
                <Studentlayout>


                    {this.state.currentdata !== '' && <>
                        <div className="content-main-section left">
                            <div className='container mt-5 studentdetail' >
                                <div className="showdiv">
                                    <div className="row">
                                        <div className="col-10 text-sm-center mt-3 mb-3">
                                            <h1>Personal Detail</h1>
                                        </div>
                                        <div className="col-2  text-sm-center text-lg-right mt-3" >
                                            <button className="buttonedit btn btn-primary btn-lg" onClick={this.openModal1}>
                                                <i class="fa fa-pencil" aria-hidden="true"></i></button>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-11 text-center mt-4'>
                                            <img src={this.state.profile !== '' ? this.state.profile : profilepicture} className="profilepicture" />
                                        </div>
                                        <div className="col-1 mt-5  abced">
                                            {/* <button className="buttonedit btn btn-primary btn-lg" onClick={this.openModal1}>
                                                <i class="fa fa-pencil" aria-hidden="true"></i></button> */}
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
                                    <div className="showdiv mt-3">

                                        <div className="row">
                                            <div className="col-10 text-sm-center mt-3 mb-3">
                                                <h1>Personal Detail</h1>
                                            </div>
                                            <div className="col-2 text-sm-center text-lg-right mt-3" >
                                                <button className="buttonedit btn btn-primary btn-lg" onClick={this.openModal2}>
                                                    <i class="fa fa-pencil" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='mt-4'>
                                            </div>
                                            <div className='mt-lg-4 d-flex mt-sm-4 ml-lg-4 text-left'>
                                                <i class="fa fa-map-marker-alt usernames" aria-hidden="true"></i>
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

                    <Modal size='xl' show={this.state.isOpen} >
                        <Modal.Header  >
                            <Modal.Title>
                                <Navbar collapseOnSelect expand="lg" >
                                    <Container>
                                        <Navbar.Brand >Rules & Regulations</Navbar.Brand>
                                        <Navbar aria-controls="responsive-navbar-nav" />
                                        <Nav>
                                            <Nav.Link eventKey={2} >
                                                <button className="btn btn-primary" onClick={this.chagees}>{this.state.language == true ? 'English' : 'Gujarati'}</button>
                                            </Nav.Link>
                                        </Nav>
                                    </Container>
                                </Navbar>
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

                            Change your Profile: <input type='file' className="emailstyle" onChange={this.handleFileChange} />
                            Email :  <input type="email" name="email" value={this.state.email} class="emailstyle" onChange={this.handleemail} />
                            birthday : <input type="date" value={this.state.dob} class="emailstyle" onChange={this.handledob} />

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeModal1}>
                                Close
                            </Button>
                            <Button className="btn btn-priamry mt-3gi" onClick={this.handlesave} >
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <Modal show={this.state.isOpen2} onHide={this.closeModal2}>
                        <Modal.Header >
                            <Modal.Title>Edit form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            {/* Change your Profile: <input type='file' className="emailstyle" onChange={this.handleFileChange} /> */}



                            <lable class="lbl-comn-info">Address 1:</lable>
                            <input type="text" name="line_1" value={this.state.line_1} class="emailstyle" onChange={this.handleline1} />

                            <lable class="lbl-comn-info mt-3">Address 2:</lable>
                            <lable class="lbl-comn-info"></lable>  <input type="text" name="line_2" value={this.state.line_2} class="emailstyle" onChange={this.handleline2} />

                            <lable class="lbl-comn-info mt-3">City: </lable>
                            <lable class="lbl-comn-info"></lable><input type="text" name="city" value={this.state.city} class="emailstyle" onChange={this.handlecity} />



                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeModal2}>
                                Close
                            </Button>
                            <Button className="btn btn-priamry mt-3gi" onClick={this.handlesaveaddress} >
                                Save Changes
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </Studentlayout>
            </>
        )
    }
}




