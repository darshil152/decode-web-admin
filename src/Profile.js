
import profilepicture from "./img/profilepicture.jpg"
import firebaseApp from './firebase/firebase'
import Navbarforprofile from './navbarforprofile'
import { useContext } from "react"
import Studentlayout from "./studentlayout/studentlayout"
import { Modal, Button } from "react-bootstrap";
import React, { Component } from 'react'
import Rules from "./Rules"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Context } from "./contexts/HeaderContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
            line_1: "",
            line_2: "",
            city: "",
            birthdaydata: [],
            dummyarray: [],

            todaydate: new Date().toJSON().slice(0, 10),
            // time: Date.now()

        }
    }

    componentDidMount() {
        document.getElementById('get-all-data').click()
        // const date = new Date();
        // const final = date.toLocaleTimeString();
        // console.log(final);
        // localStorage.setItem('firsttime', final)
        const url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        this.setState({ id }, () => {
            this.getalldata();
        })
    }


    // componentWillUnmount() {
    //     console.log('come')
    //     const date = new Date();
    //     const final = date.toLocaleTimeString();

    //     localStorage.setItem('second', final)
    // }

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });



    openModal1 = () => this.setState({ isOpen1: true });
    closeModal1 = () => this.setState({ isOpen1: false });



    openModal2 = () => this.setState({ isOpen2: true });
    closeModal2 = () => this.setState({ isOpen2: false });



    getalldata = () => {
        let isbday = false;
        let currentDate = new Date().toJSON().slice(0, 10);
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                this.setState({ currentdata: doc.data(), email: doc.data().email, dob: doc.data().dob, profile: doc.data().profile_img ? doc.data().profile_img : '', line_1: doc.data().line_1, line_2: doc.data().line_2, city: doc.data().city }, () => {
                    document.getElementById('profile-btn').click()
                    if (Number(localStorage.getItem('userrole')) !== 2) {
                        if (this.state.sc !== this.state.currentdata.password) {
                            window.location.href = '/'
                        }
                        if (!this.state.currentdata.terms) {
                            this.openModal()
                        } else {
                            this.closeModal();
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


    handleChange = (event) => {
        if (event.target.checked) {
            this.setState({ defaultcheked: true })
        }
        else {
            this.setState({ defaultcheked: false })
        }
    }

    getAllData = (data) => {
        let check = false;
        this.setState({ birthdaydata: data.state.data }, () => {
            // console.log(this.state.birthdaydata)
            for (let i = 0; i < this.state.birthdaydata.length; i++) {
                if (this.state.birthdaydata[i].dob == this.state.todaydate) {
                    // console.log(this.state.birthdaydata[i].dob, "===", this.state.todaydate)
                    this.setState({ dummyarray: this.state.birthdaydata[i] }, () => {
                        // console.log(this.state.dummyarray.f_name + this.state.dummyarray.l_name)
                        toast("Today is " + this.state.dummyarray.f_name + this.state.dummyarray.l_name + "'s Birthday", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    })
                }
            }

        })
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
                        this.getalldata();
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

        if (e.target.files[0].size > 10e6) {
            toast.error('Please select image 1mb or below 1mb!', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            this.UploadImageTOFirebase(e.target.files[0])
        }
    }


    render() {
        return (
            <Context.Consumer>
                {value => <>

                    <Studentlayout>
                        {this.state.currentdata !== '' && <>
                            <div className="content-main-section left">
                                <div className='container mt-5 studentdetail' >
                                    <div className="showdiv">
                                        <div className="row">
                                            <div className="col-10 text-sm-center mt-3 mb-3">
                                                <h1 className="text-left">Personal Detail</h1>
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
                                                    <i class="fa fa-user usernames" style={{ lineHeight: "inherit" }} aria-hidden="true"></i> <label className="labelData ml-3">{this.state.currentdata.f_name}</label>
                                                </div>
                                                <div className='mt-lg-5 d-flex mt-4 text-left'>
                                                    <i class="fa fa-envelope usernames" style={{ lineHeight: "inherit" }} aria-hidden="true"></i> <label className="labelData ml-3" style={{ wordBreak: "break-all" }}>{this.state.currentdata.email}</label>
                                                </div>
                                                <div className='mt-lg-5 d-flex mt-4 text-left '>
                                                    <i class="fa fa-birthday-cake usernames" style={{ lineHeight: "inherit" }} aria-hidden="true"></i> <label className="labelData ml-3">{this.state.currentdata.dob}</label>
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
                                                    <h1 className="text-left mb-5">Parent's Detail</h1>
                                                </div>
                                                <div className='mt-lg-4 d-flex mt-sm-4 ml-lg-4 text-left'>
                                                    <i class="fa fa-user usernames" style={{ lineHeight: "inherit" }} aria-hidden="true"></i><label className="labelData ml-3">{this.state.currentdata.f_f_name}</label>
                                                </div>
                                                <div className='mt-lg-4 d-flex mt-sm-4 ml-lg-4 text-left'>
                                                    <i class='fas fa-briefcase usernames' style={{ lineHeight: "inherit" }}></i><label className="labelData ml-3">{this.state.currentdata.occupation}</label>
                                                </div>
                                                <div className='mt-lg-4  d-flex mt-sm-4 ml-lg-4 mb-sm-4 text-left'>
                                                    <i class="fa fa-mobile usernames" style={{ lineHeight: "inherit" }} aria-hidden="true"></i><label className="labelData ml-3">{this.state.currentdata.f_phone}</label>
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
                                                    <h1 className="text-left">Residental Detail</h1>
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
                                                    <i class="fa fa-map-marker-alt usernames" style={{ lineHeight: "inherit" }} aria-hidden="true"></i>
                                                    <label className="labelData ml-3">{this.state.currentdata.line_1}</label>
                                                </div>
                                                <div className='mt-lg-4 d-flex mt-sm-4 ml-lg-4 text-left'>
                                                    <i class="fa-sharp fa-solid fa-city usernames" style={{ lineHeight: "inherit" }}></i>
                                                    <label className="labelData ml-3">{this.state.currentdata.line_2}</label>
                                                </div>
                                                <div className='mt-lg-4 d-flex mt-sm-4 ml-lg-4 mb-sm-4 text-left'>
                                                    <i class="fa-sharp fa-solid fa-city usernames" style={{ lineHeight: "inherit" }}></i>
                                                    <label className="labelData ml-3">{this.state.currentdata.city}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ToastContainer />
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
                            <Modal.Body >

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


                        <Modal show={this.state.isOpen1} onHide={this.closeModal1} >
                            <Modal.Header>
                                <Modal.Title>Edit form</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 rounded ">
                                            <img src={this.state.profile !== '' ? this.state.profile : profilepicture} className="rounded mx-auto d-block" style={{ width: "100px" }} />
                                        </div>




                                        <div class="file-input">

                                            <lable class="lbl-comn-info " > Change your Profile:</lable>
                                            <input
                                                type="file"
                                                name="file-input"
                                                id="file-input"
                                                class="file-input__input"
                                                onChange={this.handleFileChange}
                                            />
                                            <label class="file-input__label" for="file-input">
                                                <svg
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    data-prefix="fas"
                                                    data-icon="upload"
                                                    class="svg-inline--fa fa-upload fa-w-16"
                                                    role="img"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                    ></path>
                                                </svg>
                                                <span>Upload file</span></label>

                                        </div>

                                    </div>
                                </div>

                                {/* <lable class="lbl-comn-info " > Change your Profile:</lable> */}

                                {/* <input type='file' className="emailstyle" onChange={this.handleFileChange} />  */}

                                <lable class="lbl-comn-info mt-2">Email</lable>
                                <input type="email" name="email" value={this.state.email} class="emailstyle" onChange={this.handleemail} />

                                <lable class="lbl-comn-info mt-2">birthdate:</lable>
                                <input type="date" value={this.state.dob} class="emailstyle" onChange={this.handledob} />

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


                        <Modal show={this.state.isOpen2} onHide={this.closeModal2} style={{ marginTop: "150px" }}>
                            <Modal.Header >
                                <Modal.Title>Edit form</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>


                                {/* Change your Profile: <input type='file' className="emailstyle" onChange={this.handleFileChange} /> */}



                                <lable class="lbl-comn-info">Address 1:</lable>
                                <input type="text" name="line_1" value={this.state.line_1} class="emailstyle" onChange={this.handleline1} />

                                <lable class="lbl-comn-info mt-3">Address 2:</lable>
                                <input type="text" name="line_2" value={this.state.line_2} class="emailstyle" onChange={this.handleline2} />

                                <lable class="lbl-comn-info mt-3">City: </lable>
                                <input type="text" name="city" value={this.state.city} class="emailstyle" onChange={this.handlecity} />



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
                    <button className='d-none' id="profile-btn" onClick={() => { value.setCurrentData(this.state.currentdata); }}>click me</button>
                    <button className='d-none' id="get-all-data" onClick={() => { this.getAllData(value) }}>click me</button>
                    <ToastContainer />
                </>}

            </Context.Consumer>

        )
    }
}




