import React, { Component } from 'react'
import CountUp from 'react-countup';
export default class About extends Component {
    render() {
        return (
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-5 mb-5 mb-lg-0 min-h-500 ">
                            <div className="position-relative h-100">
                                <img className="position-absolute w-100 h-100 img-cover" src="img/about.jpg" />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="section-title position-relative mb-4">
                                <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">About Us</h6>
                                <h1 className="display-4">First Choice For Starting Career in IT</h1>
                            </div>
                            <p>Decode softtech is a Surat-based IT Education and Training Institution. Founded in 2022,Decode
                                softtech Surat has built
                                an industry-specific and cost effective education ecosystem in IT Service. Decode softtech Surat
                                Provides various
                                enterprise level courses.Decode softtech Surat is also one of the best organizations in Gujarat
                                for providing enterprise
                                level information technologies education and training to corporate and government clients.</p>
                            <div className="row pt-3 mx-0">
                                <div className="col-3 px-0">
                                    <div className="bg-success text-center pt-4 pb-4">
                                        <h1 className="text-white" data-toggle="counter-up"><CountUp delay={1} end={25} /></h1>
                                        <h6 className="text-uppercase text-white">Available<span className="d-block">Subjects</span>
                                        </h6>
                                    </div>
                                </div>
                                <div className="col-3 px-0">
                                    <div className="bg-primary text-center pt-4 pb-4">
                                        <h1 className="text-white" data-toggle="counter-up"><CountUp delay={1} end={10} /></h1>
                                        <h6 className="text-uppercase text-white">Online<span className="d-block">Courses</span></h6>
                                    </div>
                                </div>
                                <div className="col-3 px-0">
                                    <div className="bg-secondary text-center pt-4 pb-4">
                                        <h1 className="text-white" data-toggle="counter-up"><CountUp delay={1} end={3} /></h1>
                                        <h6 className="text-uppercase text-white">Skilled<span className="d-block">Instructors</span>
                                        </h6>
                                    </div>
                                </div>
                                <div className="col-3 px-0">
                                    <div className="bg-warning text-center pt-4 pb-4">
                                        <h1 className="text-white" data-toggle="counter-up"><CountUp delay={1} end={50} /></h1>
                                        <h6 className="text-uppercase text-white">Happy<span className="d-block">Students</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
