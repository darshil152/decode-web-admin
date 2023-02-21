import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel';
import dharmil from './img/dharmil.jfif'
export default class Testimonial extends Component {
    render() {
        return (
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-5 mb-5 mb-lg-0">
                            <div className="section-title position-relative mb-4">
                                <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">Testimonial</h6>
                                <h1 className="display-4">What Say Our Students</h1>
                            </div>
                            {/* <!-- <p className="m-0">Dolor est dolores et nonumy sit labore dolores est sed rebum amet, justo duo ipsum
                                        sanctus dolore magna rebum sit et. Diam lorem ea sea at. Nonumy et at at sed justo est nonumy
                                        tempor. Vero sea ea eirmod, elitr ea amet diam ipsum at amet. Erat sed stet eos ipsum diam</p> --> */}
                        </div>
                        <div className="col-lg-7">

                            <OwlCarousel className='owl-carousel testimonial-carousel' items={1} loop={true} smartSpeed={600} autoplay={true} dots={false} nav={true}>
                                <div className="bg-light p-sm-5 p-3 test-height">
                                    <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                                    <p>Decode Softtech provides great opportunities for someone who is just starting out with
                                        Coding or even has few years of
                                        experience.. Heaven sir's teaching methods are easy to understand and inclined towards
                                        more practical approach which
                                        helped me to land my first job!!!</p>
                                    <div className="d-flex flex-shrink-0 align-items-center mt-4">
                                        <img className="img-thumbnail w-25 mr-4" src="img/jeel.png" alt="" />
                                        <div>
                                            <h5>Jeel Thumar</h5>
                                            <span>Full-stack Developer</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-light p-sm-5 p-3 test-height">
                                    <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                                    <p>I found hevan sir's teaching techniques outstanding and very unique. I've always hated
                                        learning computer languages as I
                                        find it very difficult to understand; He is the one who made me fall in love with
                                        programming. Thank you sir!</p>
                                    <div className="d-flex flex-shrink-0 align-items-center mt-4">
                                        <img className="img-thumbnail w-25 mr-4" src="img/hiren.jfif" alt="" />
                                        <div>
                                            <h5>Hiren Khichadiya</h5>
                                            <span>Backend Developer</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-light p-sm-5 p-3 test-height">
                                    <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                                    <p>I would recommend to each and every beginner to start your journey from here. Great place
                                        to learn new technologies and
                                        to build our career.</p>
                                    <div className="d-flex flex-shrink-0 align-items-center mt-4">
                                        <img className="img-thumbnail w-25 mr-4" src={dharmil} alt="" />
                                        <div>
                                            <h5>Dharmil Vekariya</h5>
                                            <span>Frontend Developer</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-light p-sm-5 p-3 test-height">
                                    <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                                    <p>I just wanted let you know that the service provided, from registration to training was a
                                        very positive experience for
                                        me. I intend on taking more classes in the future and referring any new hires as well as
                                        friends/family members to take
                                        courses at Decode Softtech.</p>
                                    <div className="d-flex flex-shrink-0 align-items-center mt-4">
                                        <img className="img-thumbnail w-25 mr-4" src="img/lathiyo.png" alt="" />
                                        <div>
                                            <h5>Jaydeep Lathiya</h5>
                                            <span>Full-stack Developer</span>
                                        </div>
                                    </div>
                                </div>
                            </OwlCarousel>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
