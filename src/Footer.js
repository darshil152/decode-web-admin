import React, { Component } from 'react'
import whiteLogo from './img/white logo.png'

export default class Footer extends Component {
    render() {
        return (
            <>

                <div className="container-fluid position-relative overlay-top bg-dark text-white-50 py-5" style={{ marginTop: '90px' }}>
                    <div className="container mt-5 pt-5">
                        <div className="row">
                            <div className="col-md-6 mb-5">
                                <a href="index.html" className="navbar-brand">
                                    <img className="m-0 logo" src={whiteLogo} alt="Decode Softtech" />
                                </a>
                                {/* <!-- <p className="m-0">Accusam nonumy clita sed rebum kasd eirmod elitr. Ipsum ea lorem at et diam est,
                                        tempor rebum ipsum sit ea tempor stet et consetetur dolores. Justo stet diam ipsum lorem vero
                                        clita diam</p> --> */}
                            </div>
                            {/* <!-- <div className="col-md-6 mb-5">
                                    <h3 className="text-white mb-4">Newsletter</h3>
                                    <div className="w-100">
                                        <div className="input-group">
                                            <input type="text" className="form-control border-light" style="padding: 30px;"
                                                placeholder="Your Email Address">
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary px-4">Sign Up</button>
                                                </div>
                                        </div>
                                    </div>
                                </div> --> */}
                        </div>
                        <div className="row">
                            <div className="col-md-4 mb-5">
                                <h3 className="text-white mb-4">Get In Touch</h3>
                                <p> <a className="text-white" href="https://goo.gl/maps/tY68pnXuMjLQ1Jc19" target="_blank"><i
                                    className="fa fa-map-marker-alt mr-2"></i>
                                </a>408-409, Dhara Trade Center, Mahadev Chowk, Mota
                                    Varachha, Surat</p>
                                <p>
                                    <a className="text-white" href="tel:8347763858"> <i className="fa fa-phone-alt mr-2"></i></a>+91 834 776
                                    3858
                                </p>
                                <p>
                                    <a className="text-white" href="mailto:info@decodesofttech.com">
                                        <i className="fa fa-envelope mr-2"></i>
                                    </a>info@decodesofttech.com
                                </p>
                                <div className="d-flex justify-content-start mt-4">
                                    <a className="text-white mr-4" href="#"><i className="fab fa-2x fa-twitter"></i></a>
                                    <a className="text-white mr-4" href="https://www.facebook.com/Decode-Softtech-108716078502384"><i
                                        className="fab fa-2x fa-facebook-f"></i></a>
                                    <a className="text-white mr-4" href="https://www.linkedin.com/company/81620839/admin/"><i
                                        className="fab fa-2x fa-linkedin-in"></i></a>
                                    <a className="text-white" href="https://www.instagram.com/decodesofttech/"><i
                                        className="fab fa-2x fa-instagram"></i></a>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h3 className="text-white mb-4">We Provide</h3>
                                <div className="d-flex flex-column justify-content-start">
                                    <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Web Design</a>
                                    <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Frontend
                                        Development</a>
                                    <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Backend
                                        Development</a>
                                    <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Fullstack
                                        Development</a>
                                    <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Firebase</a>
                                    <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>360 & 3D
                                        Website</a>
                                    <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>React Js</a>
                                    <a className="text-white-50 " href="#"><i className="fa fa-angle-right mr-2"></i>Node Js</a>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h3 className="text-white mb-4">Quick Links</h3>
                                <div className="d-flex flex-column justify-content-start">
                                    <a className="text-white-50 mb-2" href="index.html"><i className="fa fa-angle-right mr-2"></i>Home</a>
                                    <a className="text-white-50 mb-2" href="about.html">
                                        <i className="fa fa-angle-right mr-2"></i>About Us</a>
                                    <a className="text-white-50 mb-2" href="course.html">
                                        <i className="fa fa-angle-right mr-2"></i>Courses</a>
                                    <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Terms &
                                        Condition</a>
                                    <a className="text-white-50" href="contact.html">
                                        <i className="fa fa-angle-right mr-2"></i>Contact Us</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid bg-dark text-white-50 border-top py-4 border-color">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
                                <p className="m-0">© Copyright 2022. <a className="text-white" href="https://decodesofttech.com">Decode
                                    Softtech</a>. All Rights
                                    Reserved.
                                </p>
                            </div>
                            {/* <!-- <div className="col-md-6 text-center text-md-right">
                                    <p className="m-0">Designed by <a className="text-white" href="https://htmlcodex.com">HTML Codex</a>
                                    </p>
                                </div> --> */}
                        </div>
                    </div>
                </div>
                <a href="#" className="btn btn-lg btn-primary rounded-0 btn-lg-square back-to-top"><i
                    className="fa fa-angle-double-up"></i></a>
            </>
        )
    }
}
