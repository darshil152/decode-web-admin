import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel';
export default class Courses extends Component {
    state = {
        courseCarousel: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            1080: {
                items: 4
            }
        },
    }
    render() {
        return (
            <div className="container-fluid px-0 py-5">
                <div className="row mx-0 justify-content-center pt-5">
                    <div className="col-lg-6">
                        <div className="section-title text-center position-relative mb-4">
                            <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">Our Courses</h6>
                            <h1 className="display-4">Checkout New Releases Of Our Courses</h1>
                        </div>
                    </div>
                </div>
                <OwlCarousel className='owl-carousel courses-carousel' responsive={this.state.courseCarousel} items={4} loop={true} autoplay={true} >
                    <div className="courses-item position-relative">
                        <img className="img-fluid" src="img/courses-1.jpg" alt="" />
                        <div className="courses-text">
                            <h4 className="text-center text-white px-3">Web design course for beginners</h4>
                            {/* <!-- <div className="border-top w-100 mt-3">
                                            <div className="d-flex justify-content-between p-4">
                                                <span className="text-white"><i className="fa fa-user mr-2"></i>Jhon Doe</span>
                                                <span className="text-white"><i className="fa fa-star mr-2"></i>4.5 <small>(250)</small></span>
                                            </div>
                                        </div> --> */}
                            <div className="w-100 bg-white text-center p-4">
                                <a className="btn btn-primary" href="detail.html">Course Detail</a>
                            </div>
                        </div>
                    </div>
                    <div className="courses-item position-relative">
                        <img className="img-fluid" src="img/courses-2.jpg" alt="" />
                        <div className="courses-text">
                            <h4 className="text-center text-white px-3">Frontend development course for beginners</h4>
                            {/* <!-- <div className="border-top w-100 mt-3">
                                            <div className="d-flex justify-content-between p-4">
                                                <span className="text-white"><i className="fa fa-user mr-2"></i>Jhon Doe</span>
                                                <span className="text-white"><i className="fa fa-star mr-2"></i>4.5 <small>(250)</small></span>
                                            </div>
                                        </div> --> */}
                            <div className="w-100 bg-white text-center p-4">
                                <a className="btn btn-primary" href="detail.html">Course Detail</a>
                            </div>
                        </div>
                    </div>
                    <div className="courses-item position-relative">
                        <img className="img-fluid" src="img/courses-3.jpg" alt="" />
                        <div className="courses-text">
                            <h4 className="text-center text-white px-3">Backend development course for beginners</h4>
                            {/* <!-- <div className="border-top w-100 mt-3">
                                            <div className="d-flex justify-content-between p-4">
                                                <span className="text-white"><i className="fa fa-user mr-2"></i>Jhon Doe</span>
                                                <span className="text-white"><i className="fa fa-star mr-2"></i>4.5 <small>(250)</small></span>
                                            </div>
                                        </div> --> */}
                            <div className="w-100 bg-white text-center p-4">
                                <a className="btn btn-primary" href="detail.html">Course Detail</a>
                            </div>
                        </div>
                    </div>
                    <div className="courses-item position-relative">
                        <img className="img-fluid" src="img/courses-4.jpg" alt="" />
                        <div className="courses-text">
                            <h4 className="text-center text-white px-3">Fullstack development course for beginners</h4>
                            {/* <!-- <div className="border-top w-100 mt-3">
                                            <div className="d-flex justify-content-between p-4">
                                                <span className="text-white"><i className="fa fa-user mr-2"></i>Jhon Doe</span>
                                                <span className="text-white"><i className="fa fa-star mr-2"></i>4.5 <small>(250)</small></span>
                                            </div>
                                        </div> --> */}
                            <div className="w-100 bg-white text-center p-4">
                                <a className="btn btn-primary" href="detail.html">Course Detail</a>
                            </div>
                        </div>
                    </div>
                    <div className="courses-item position-relative">
                        <img className="img-fluid" src="img/courses-5.jpg" alt="" />
                        <div className="courses-text">
                            <h4 className="text-center text-white px-3">360 & 3D Web development course for beginners</h4>
                            {/* <!-- <div className="border-top w-100 mt-3">
                                            <div className="d-flex justify-content-between p-4">
                                                <span className="text-white"><i className="fa fa-user mr-2"></i>Jhon Doe</span>
                                                <span className="text-white"><i className="fa fa-star mr-2"></i>4.5 <small>(250)</small></span>
                                            </div>
                                        </div> --> */}
                            <div className="w-100 bg-white text-center p-4">
                                <a className="btn btn-primary" href="detail.html">Course Detail</a>
                            </div>
                        </div>
                    </div>
                    <div className="courses-item position-relative">
                        <img className="img-fluid" src="img/courses-6.jpg" alt="" />
                        <div className="courses-text">
                            <h4 className="text-center text-white px-3">Firebase course for beginners</h4>
                            {/* <!-- <div className="border-top w-100 mt-3">
                                            <div className="d-flex justify-content-between p-4">
                                                <span className="text-white"><i className="fa fa-user mr-2"></i>Jhon Doe</span>
                                                <span className="text-white"><i className="fa fa-star mr-2"></i>4.5 <small>(250)</small></span>
                                            </div>
                                        </div> --> */}
                            <div className="w-100 bg-white text-center p-4">
                                <a className="btn btn-primary" href="detail.html">Course Detail</a>
                            </div>
                        </div>
                    </div>
                </OwlCarousel>;

                <div className="row justify-content-center bg-image mx-0 mb-5">
                    <div className="col-lg-6 py-5">
                        <div className="bg-white p-5 my-5">
                            <h1 className="text-center mb-4"> For New Students</h1>
                            {/* <!-- <form > --> */}
                            <div className="form-row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input id="s-name" type="text" className="form-control bg-light border-0 pad-30-20"
                                            placeholder="Your Name" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input id="s-number" type="tel" className="form-control bg-light border-0 pad-30-20"
                                            placeholder="Your Contact No" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <select id="s-subject" className="custom-select bg-light border-0 px-3"
                                            style={{ height: '60px' }}>
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
                                <div className="col-sm-6">
                                    <button className="btn btn-primary btn-block"
                                        style={{ height: '60px' }}>Sign Up
                                        Now</button>
                                </div>
                            </div>
                            {/* <!-- </form> --> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
