import React, { Component } from 'react'
import HeaderForPage from './HeaderForPage'
import Layout from './Layout'
import OwlCarousel from 'react-owl-carousel';
export default class DetailsPage extends Component {
    render() {
        return (
            <Layout>
                <HeaderForPage name='Course Detail' />
                <div class="container-fluid py-5">
                    <div class="container py-5">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="mb-5">
                                    <div class="section-title position-relative mb-5">
                                        <h6 class="d-inline-block position-relative text-secondary text-uppercase pb-2">Course
                                            Detail</h6>
                                        <h1 class="display-4">Master in Full-stack Development</h1>
                                    </div>
                                    <img class="img-fluid rounded w-100 mb-4" src="img/header.jpg" alt="Image" />
                                    <p>Decode Softtech brings forward an exclusive and the best Full-Stack Web Developer
                                        course. We bestow an entire
                                        range of professional courses that would enhance your web development skills along with your
                                        soft skills. Programming
                                        skills would automatically have a stupendous impact on your resume.

                                        Programming jobs are highly coveted and are sought-after by numerous candidates. It’s one of
                                        the foremost essential
                                        skills and it is requisite to master this under the best guidance. Our Full Stack
                                        Development course would assist
                                        you in developing your proficiency in web development.

                                    </p>

                                    <p>Get on board with the best industry experts and initiate your career efficiently. Besides,
                                        the full stack web developer
                                        course comes with Mould your professionalism by web Developer training. Get the
                                        certifications for the same and level up
                                        your skill game with us. Moreover, some of the most premium features such as Live Classes,
                                        Video Lectures, Practice
                                        Sets, and Assignments, quiz, detailed explanations and notes would amp up your web
                                        development skills even if you are
                                        not from a technical background. Unlatch your pathway to success by enrolling for the full
                                        stack developer course now.

                                        Join the Web Development Course here!</p>
                                </div>

                                <h2 class="mb-3">Related Courses</h2>
                                <OwlCarousel className='owl-carousel related-carousel position-relative pad-0-30' items={2} margin={30} loop={true} smartSpeed={600} autoplay={true} dots={false} nav={true}>
                                    <a class="courses-list-item position-relative d-block overflow-hidden mb-2" href="detail.html">
                                        <img class="img-fluid" src="img/courses-1.jpg" alt="" />
                                        <div class="courses-text">
                                            <h4 class="text-center text-white px-3">Master in Web Design</h4>
                                            {/* <!-- <div class="border-top w-100 mt-3">
                                                <div class="d-flex justify-content-between p-4">
                                                    <span class="text-white"><i class="fa fa-user mr-2"></i>Jhon Doe</span>
                                                    <span class="text-white"><i class="fa fa-star mr-2"></i>4.5
                                                        <small>(250)</small></span>
                                                </div>
                                            </div> --> */}
                                        </div>
                                    </a>
                                    <a class="courses-list-item position-relative d-block overflow-hidden mb-2" href="detail.html">
                                        <img class="img-fluid" src="img/courses-2.jpg" alt="" />
                                        <div class="courses-text">
                                            <h4 class="text-center text-white px-3">Master in Frontend Development</h4>
                                            {/* <!-- <div class="border-top w-100 mt-3">
                                                <div class="d-flex justify-content-between p-4">
                                                    <span class="text-white"><i class="fa fa-user mr-2"></i>Jhon Doe</span>
                                                    <span class="text-white"><i class="fa fa-star mr-2"></i>4.5
                                                        <small>(250)</small></span>
                                                </div>
                                            </div> --> */}
                                        </div>
                                    </a>
                                    <a class="courses-list-item position-relative d-block overflow-hidden mb-2" href="detail.html">
                                        <img class="img-fluid" src="img/courses-3.jpg" alt="" />
                                        <div class="courses-text">
                                            <h4 class="text-center text-white px-3">Master in Backend Development</h4>
                                            {/* <!-- <div class="border-top w-100 mt-3">
                                                <div class="d-flex justify-content-between p-4">
                                                    <span class="text-white"><i class="fa fa-user mr-2"></i>Jhon Doe</span>
                                                    <span class="text-white"><i class="fa fa-star mr-2"></i>4.5
                                                        <small>(250)</small></span>
                                                </div>
                                            </div> --> */}
                                        </div>
                                    </a>
                                    <a class="courses-list-item position-relative d-block overflow-hidden mb-2" href="detail.html">
                                        <img class="img-fluid" src="img/courses-4.jpg" alt="" />
                                        <div class="courses-text">
                                            <h4 class="text-center text-white px-3">Master in Fullstack Development</h4>
                                            {/* <!-- <div class="border-top w-100 mt-3">
                                                <div class="d-flex justify-content-between p-4">
                                                    <span class="text-white"><i class="fa fa-user mr-2"></i>Jhon Doe</span>
                                                    <span class="text-white"><i class="fa fa-star mr-2"></i>4.5
                                                        <small>(250)</small></span>
                                                </div>
                                            </div> --> */}
                                        </div>
                                    </a>
                                </OwlCarousel>

                                <div class="owl-carousel related-carousel position-relative pad-0-30" >
                                    <a class="courses-list-item position-relative d-block overflow-hidden mb-2" href="detail.html">
                                        <img class="img-fluid" src="img/courses-1.jpg" alt="" />
                                        <div class="courses-text">
                                            <h4 class="text-center text-white px-3">Master in Web Design</h4>
                                            {/* <!-- <div class="border-top w-100 mt-3">
                                                <div class="d-flex justify-content-between p-4">
                                                    <span class="text-white"><i class="fa fa-user mr-2"></i>Jhon Doe</span>
                                                    <span class="text-white"><i class="fa fa-star mr-2"></i>4.5
                                                        <small>(250)</small></span>
                                                </div>
                                            </div> --> */}
                                        </div>
                                    </a>
                                    <a class="courses-list-item position-relative d-block overflow-hidden mb-2" href="detail.html">
                                        <img class="img-fluid" src="img/courses-2.jpg" alt="" />
                                        <div class="courses-text">
                                            <h4 class="text-center text-white px-3">Master in Frontend Development</h4>
                                            {/* <!-- <div class="border-top w-100 mt-3">
                                                <div class="d-flex justify-content-between p-4">
                                                    <span class="text-white"><i class="fa fa-user mr-2"></i>Jhon Doe</span>
                                                    <span class="text-white"><i class="fa fa-star mr-2"></i>4.5
                                                        <small>(250)</small></span>
                                                </div>
                                            </div> --> */}
                                        </div>
                                    </a>
                                    <a class="courses-list-item position-relative d-block overflow-hidden mb-2" href="detail.html">
                                        <img class="img-fluid" src="img/courses-3.jpg" alt="" />
                                        <div class="courses-text">
                                            <h4 class="text-center text-white px-3">Master in Backend Development</h4>
                                            {/* <!-- <div class="border-top w-100 mt-3">
                                                <div class="d-flex justify-content-between p-4">
                                                    <span class="text-white"><i class="fa fa-user mr-2"></i>Jhon Doe</span>
                                                    <span class="text-white"><i class="fa fa-star mr-2"></i>4.5
                                                        <small>(250)</small></span>
                                                </div>
                                            </div> --> */}
                                        </div>
                                    </a>
                                    <a class="courses-list-item position-relative d-block overflow-hidden mb-2" href="detail.html">
                                        <img class="img-fluid" src="img/courses-4.jpg" alt="" />
                                        <div class="courses-text">
                                            <h4 class="text-center text-white px-3">Master in Fullstack Development</h4>
                                            {/* <!-- <div class="border-top w-100 mt-3">
                                                <div class="d-flex justify-content-between p-4">
                                                    <span class="text-white"><i class="fa fa-user mr-2"></i>Jhon Doe</span>
                                                    <span class="text-white"><i class="fa fa-star mr-2"></i>4.5
                                                        <small>(250)</small></span>
                                                </div>
                                            </div> --> */}
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div class="col-lg-4 mt-5 mt-lg-0">
                                <div class="bg-primary mb-5 py-3">
                                    <h3 class="text-white py-3 px-4 m-0">Course Features</h3>
                                    <div class="d-flex justify-content-between border-bottom px-4">
                                        <h6 class="text-white my-3">Instructor</h6>
                                        <h6 class="text-white my-3">Heaven Kapopara</h6>
                                    </div>
                                    <div class="d-flex justify-content-between border-bottom px-4">
                                        <h6 class="text-white my-3">Daily Time</h6>
                                        <h6 class="text-white my-3">2 Hours</h6>
                                    </div>

                                    <div class="d-flex justify-content-between border-bottom px-4">
                                        <h6 class="text-white my-3">Course Duration</h6>
                                        <h6 class="text-white my-3">12 Months</h6>
                                    </div>

                                    <div class="d-flex justify-content-between border-bottom px-4">
                                        <h6 class="text-white my-3">Other Activity</h6>
                                        <h6 class="text-white my-3">Hackathon</h6>
                                    </div>
                                    <div class="d-flex justify-content-between border-bottom px-4">
                                        <h6 class="text-white my-3">Who can Learn?</h6>
                                        <h6 class="text-white my-3">12<sup>th</sup>Pass & above</h6>
                                    </div>
                                    <div class="d-flex justify-content-between px-4">
                                        <h6 class="text-white my-3">Language</h6>
                                        <h6 class="text-white my-3">Gujarati, Hindi & English</h6>
                                    </div>
                                    <h5 class="text-white py-3 px-4 m-0">100% Job Guarantee</h5>
                                    <div class="py-3 px-4">
                                        <a class="btn btn-block btn-secondary py-3 px-5" href="contact.html">Enroll Now</a>
                                    </div>
                                </div>

                                <div class="mb-5">
                                    <h2 class="mb-3">Categories</h2>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                            <a href="" class="text-decoration-none h6 m-0">Master in Web Design</a>
                                            {/* <!-- <span class="badge badge-primary badge-pill">150</span> --> */}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                            <a href="" class="text-decoration-none h6 m-0">Master in Frontend Development</a>
                                            {/* <!-- <span class="badge badge-primary badge-pill">131</span> --> */}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                            <a href="" class="text-decoration-none h6 m-0">Master in Backend Development</a>
                                            {/* <!-- <span class="badge badge-primary badge-pill">78</span> --> */}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                            <a href="" class="text-decoration-none h6 m-0">Master in Fullstack Development</a>
                                            {/* <!-- <span class="badge badge-primary badge-pill">56</span> --> */}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                            <a href="" class="text-decoration-none h6 m-0">Master in Firebase</a>
                                            {/* <!-- <span class="badge badge-primary badge-pill">98</span> --> */}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                            <a href="" class="text-decoration-none h6 m-0">Master in 360 & 3D Website</a>
                                            {/* <!-- <span class="badge badge-primary badge-pill">98</span> --> */}
                                        </li>
                                    </ul>
                                </div>

                                <div class="mb-5">
                                    <h2 class="mb-4">Recent Courses</h2>
                                    <a class="d-flex align-items-center text-decoration-none mb-4" href="">
                                        <img class="img-fluid rounded" src="img/courses-80x80.jpg" alt="" />
                                        <div class="pl-3">
                                            <h6>React Js</h6>
                                            {/* <!-- <div class="d-flex">
                                                <small class="text-body mr-3"><i class="fa fa-user text-primary mr-2"></i>Jhon
                                                    Doe</small>
                                                <small class="text-body"><i class="fa fa-star text-primary mr-2"></i>4.5
                                                    (250)</small>
                                            </div> --> */}
                                        </div>
                                    </a>
                                    <a class="d-flex align-items-center text-decoration-none mb-4" href="">
                                        <img class="img-fluid rounded" src="img/courses-80x80.jpg" alt="" />
                                        <div class="pl-3">
                                            <h6>Node Js</h6>
                                            {/* <!-- <div class="d-flex">
                                                <small class="text-body mr-3"><i class="fa fa-user text-primary mr-2"></i>Jhon
                                                    Doe</small>
                                                <small class="text-body"><i class="fa fa-star text-primary mr-2"></i>4.5
                                                    (250)</small>
                                            </div> --> */}
                                        </div>
                                    </a>
                                    <a class="d-flex align-items-center text-decoration-none mb-4" href="">
                                        <img class="img-fluid rounded" src="img/courses-80x80.jpg" alt="" />
                                        <div class="pl-3">
                                            <h6>Firebase</h6>
                                            {/* <!-- <div class="d-flex">
                                                <small class="text-body mr-3"><i class="fa fa-user text-primary mr-2"></i>Jhon
                                                    Doe</small>
                                                <small class="text-body"><i class="fa fa-star text-primary mr-2"></i>4.5
                                                    (250)</small>
                                            </div> --> */}
                                        </div>
                                    </a>
                                    <a class="d-flex align-items-center text-decoration-none" href="">
                                        <img class="img-fluid rounded" src="img/courses-80x80.jpg" alt="" />
                                        <div class="pl-3">
                                            <h6>Aframe</h6>
                                            {/* <!-- <div class="d-flex">
                                                    <small class="text-body mr-3"><i class="fa fa-user text-primary mr-2"></i>Jhon
                                                        Doe</small>
                                                    <small class="text-body"><i class="fa fa-star text-primary mr-2"></i>4.5
                                                        (250)</small>
                                                </div> --> */}
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
