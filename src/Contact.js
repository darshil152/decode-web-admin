import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import firebaseApp from './firebase/firebase';

export default class Contact extends Component {

    state = {
        cname: '',
        cemail: '',
        csubject: '',
        cmessage: '',
        cphone: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    sendMessage = () => {

        let registerQuery = new Promise((resolve, reject) => {
            let db = firebaseApp.firestore();
            db.collection("ContactUsPortfolio").add({
                name: this.state.cname,
                phone: this.state.cphone,
                subject: this.state.csubject,
                message: this.state.cmessage,
                email: this.state.cemail,
                createdAt: new Date().getTime(),
                project: 'decode-contact'
            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    resolve(docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                    reject(error);
                });
        });
        registerQuery.then(result => {
            console.warn('register successful')
            toast.success("Thank you for reaching out. We will contact you soon.")
            this.setState({
                cname: '',
                cemail: '',
                csubject: '',
                cmessage: '',
                cphone: ''
            })

        }).catch(error => {
            console.error(error)
        })

    }

    render() {
        return (
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-5 mb-5 mb-lg-0">
                            <div className="bg-light d-flex flex-column justify-content-center px-5" style={{ height: '500px' }}>
                                <div className="d-flex align-items-center mb-5">
                                    <div className="btn-icon bg-primary mr-4">
                                        <a className="text-white" href="https://goo.gl/maps/tY68pnXuMjLQ1Jc19" target="_blank">
                                            <i className="fa fa-2x fa-map-marker-alt text-white"></i>
                                        </a>
                                    </div>
                                    <div className="mt-n1">
                                        <h4>Our Location</h4>
                                        <p className="m-0">408-409, Dhara Trade Center, Mahadev Chowk, Mota
                                            Varachha, Surat</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mb-5">
                                    <div className="btn-icon bg-secondary mr-4">
                                        <i className="fa fa-2x fa-phone text-white"></i>
                                    </div>
                                    <div className="mt-n1">
                                        <h4>Call Us</h4>
                                        <p className="m-0">+91 834 776 3858</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="btn-icon bg-warning mr-4">
                                        <i className="fa fa-2x fa-envelope text-white"></i>
                                    </div>
                                    <div className="mt-n1">
                                        <h4>Email Us</h4>
                                        <p className="m-0 text-break">info@decodesofttech.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="section-title position-relative mb-4">
                                <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">Need Help?</h6>
                                <h1 className="display-4">Send Us A Message</h1>
                            </div>
                            <div className="contact-form">
                                {/* <!-- <form> --> */}
                                <div className="row">
                                    <div className="col-6 form-group">
                                        <input onChange={this.handleChange} value={this.state.cname} name='cname' type="text" id="c-name"
                                            className="form-control border-top-0 border-right-0 border-left-0 p-0"
                                            placeholder="Your Name" required="required" />
                                    </div>
                                    <div className="col-6 form-group">
                                        <input onChange={this.handleChange} value={this.state.cemail} type="email" name='cemail' id="c-email"
                                            className="form-control border-top-0 border-right-0 border-left-0 p-0"
                                            placeholder="Your Email" required="required" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <select onChange={this.handleChange} name='csubject' id="c-subject"
                                                className="form-control border-top-0 border-right-0 border-left-0 p-0">
                                                <option value="">Select a course</option>
                                                <option value="webdesign">Master in Web Design</option>
                                                <option value="frontend">Master in Frontend Development</option>
                                                <option value="backend">Master in Backend Development</option>
                                                <option value="fullstack">Master in Fullstack Development</option>
                                                <option value="firebase">Master in Firebase</option>
                                                <option value="360&3d">Master in 360 & 3D Website</option>
                                                <option value="react">Master in Reactjs</option>
                                                <option value="node">Master in Nodejs</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group col-6">
                                        <input onChange={this.handleChange} value={this.state.cphone} name='cphone' type="text" id="c-number"
                                            className="form-control border-top-0 border-right-0 border-left-0 p-0"
                                            placeholder="Enter Contact Number" required="required" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <textarea onChange={this.handleChange} value={this.state.cmessage} name='cmessage' className="form-control border-top-0 border-right-0 border-left-0 p-0" rows="5"
                                        id="c-message" placeholder="Message" required="required"></textarea>
                                </div>
                                <div>
                                    <button onClick={this.sendMessage} className="btn btn-primary py-3 px-5" >Send Message</button>
                                </div>
                                {/* <!-- </form> --> */}
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                {/* Same as */}
                <ToastContainer />
            </div>
        )
    }
}
