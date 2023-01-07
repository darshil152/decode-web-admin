import React, { Component } from 'react'
import HeaderForPage from './HeaderForPage'
import Layout from './Layout'
import OwlCarousel from 'react-owl-carousel';
import headerImg from './img/header.jpg'
import course1img from './img/courses-1.jpg'
import course2img from './img/courses-2.jpg'
import course3img from './img/courses-3.jpg'
import course4img from './img/courses-4.jpg'
import course5img from './img/courses-5.jpg'
import course6img from './img/courses-6.jpg'
import coursethumb from './img/courses-80x80.jpg'
import { Link } from 'react-router-dom';
export default class DetailsPage extends Component {

    state = {
        duration: '12',
        courseTitle: 'Master in Full-stack Development',
        codeDescription1: "Decode Softtech brings forward an exclusive and the best Full-Stack Web Developer course.We bestow an entire range of professional courses that would enhance your web development skills along with your soft skills.Programming skills would automatically have a stupendous impact on your resume. Programming jobs are highly coveted and are sought- after by numerous candidates.It’s one of the foremost essential skills and it is requisite to master this under the best guidance.Our Full Stack Development course would assist you in developing your proficiency in web development.",
        codeDescription2: "Get on board with the best industry experts and initiate your career efficiently.Besides, the full stack web developer course comes with Mould your professionalism by web Developer training.Get the certifications for the same and level up your skill game with us.Moreover, some of the most premium features such as Live Classes, Video Lectures, Practice Sets, and Assignments, quiz, detailed explanations and notes would amp up your web development skills even if you are not from a technical background.Unlatch your pathway to success by enrolling for the full stack developer course now. Join the Web Development Course here!"
    }

    componentDidMount() {
        let string = window.location.href
        let courseType = string.substring(string.lastIndexOf('/') + 1)
        if (courseType == '1') {
            this.setState({
                duration: '6',
                courseTitle: 'Master in Web Design',
                codeDescription1: 'A web designer is responsible for creating the design and layout of a website or web pages. It and can mean working on a brand new website or updating an already existing site. Their role is different to web developers , who specialise in making web designs a reality or writing code that dictates how different parts of the website fit together. However, there can be crossover between the two roles.',
                codeDescription2: 'There are routes into web design for both university graduates and school leavers. For jobs advertised to graduates, employers are likely to seek a degree in digital media design or a related subject. Whether you have a related degree or not, you will need to be able to present a portfolio of your best web design work.',
            })
        } else if (courseType == '2') {
            this.setState({
                duration: '10',
                courseTitle: 'Master in Frontend Development',
                codeDescription1: 'A Front-End Developer is responsible for developing new user-facing features, determining the structure and design of web pages, building reusable codes, optimizing page loading times, and using a variety of markup languages to create the web pages.',
                codeDescription2: 'A good Front-End Web Developer will have an understanding of the web development process from inception to deployment. They will also have a good understanding of industry trends and the newest software programs and languages. In addition to the technical skills, they need to have excellent problem-solving skills and flexibility due to the changing technologies.'
            })
        } else if (courseType == '3') {
            this.setState({
                duration: '10',
                courseTitle: 'Master in Backend Development',
                codeDescription1: 'Back-end development means working on server-side software, which focuses on everything you can’t see on a website. Back-end developers ensure the website performs correctly, focusing on databases, back-end logic, application programming interface (APIs), architecture, and servers. They use code that helps browsers communicate with databases, store, understand, and delete data.',
                codeDescription2: 'back-end developers collaborate with front-end developers, product managers, principal architects, and website testers to build the structure of a website or mobile app. Back-end developers must be familiar with many kinds of tools and frameworks, including languages such as Javascript, Node js, Express js. They make sure the back-end performs quickly and responsively to front-end user requests.'
            })
        } else if (courseType == '4') {
            this.setState({
                duration: '12',
                courseTitle: 'Master in Full-stack Development',
                codeDescription1: "Decode Softtech brings forward an exclusive and the best Full-Stack Web Developer course.We bestow an entire range of professional courses that would enhance your web development skills along with your soft skills.Programming skills would automatically have a stupendous impact on your resume. Programming jobs are highly coveted and are sought- after by numerous candidates.It’s one of the foremost essential skills and it is requisite to master this under the best guidance.Our Full Stack Development course would assist you in developing your proficiency in web development.",
                codeDescription2: "Get on board with the best industry experts and initiate your career efficiently.Besides, the full stack web developer course comes with Mould your professionalism by web Developer training.Get the certifications for the same and level up your skill game with us.Moreover, some of the most premium features such as Live Classes, Video Lectures, Practice Sets, and Assignments, quiz, detailed explanations and notes would amp up your web development skills even if you are not from a technical background.Unlatch your pathway to success by enrolling for the full stack developer course now. Join the Web Development Course here!"
            })
        } else if (courseType == '5') {
            this.setState({
                duration: '18',
                courseTitle: 'Master in 360 & 3D Web Development',
                codeDescription1: 'It is a common misconception that building applications that use 3D graphics can only be done within specialized environments like Unity or Unreal Engine. These days, nothing could be further from the truth. 3D objects can be visualized directly in the web browser. For web development, it was a breakthrough. Graphical elements could now be created with JavaScript, and not just HTML and CSS. Moreover, it was a viable native alternative to Adobe Flash, which required the (in)famous browser plug-in.',
                codeDescription2: 'New capabilities brought by WebGL2 coincided with rapidly growing market demand and the result was a surge in adoption. The trend to replace native software with web applications extended to 3D graphics, games, and simulators. Improving the performance of browser engines and users’ hardware made many new solutions possible.'
            })
        } else if (courseType == '6') {
            this.setState({
                duration: '14',
                courseTitle: 'Master in Firebase',
                codeDescription1: 'Firebase is a Backend-as-a-Service (Baas). It provides developers with a variety of tools and services to help them develop quality apps, grow their user base, and earn profit. It is built on Google’s infrastructure. Firebase is categorized as a NoSQL database program, which stores data in JSON- like documents.',
                codeDescription2: 'Firebase also gives developers a comprehensive list of products to aid them in the development process. Firstly, two database options are Firestore and Firebase’s Realtime Database.Likewise, Firebase lets you perform effortless cloud media storage and enables serverless application development through integrated Cloud Functions.'
            })
        }
    }




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
                                        <h1 class="display-4">{this.state.courseTitle}</h1>
                                    </div>
                                    <img class="img-fluid rounded w-100 mb-4" src={headerImg} alt="Image" />
                                    <p>{this.state.codeDescription1}
                                    </p>

                                    <p>{this.state.codeDescription2}</p>
                                </div>

                                <h2 class="mb-3">Related Courses</h2>
                                <OwlCarousel className='owl-carousel related-carousel position-relative pad-0-30' items={2} margin={30} loop={true} smartSpeed={600} autoplay={true} dots={false} nav={true}>
                                    <a class="courses-list-item position-relative d-block overflow-hidden mb-2" href="/details/1">
                                        {/* <Link class="courses-list-item position-relative d-block overflow-hidden mb-2" to={'/details/1'}> */}
                                        <img class="img-fluid" src={course1img} alt="" />
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
                                        {/* </Link> */}
                                    </a>
                                    <a class="courses-list-item position-relative d-block overflow-hidden mb-2" href="/details/2">
                                        {/* <Link class="courses-list-item position-relative d-block overflow-hidden mb-2" to={'/details/2'}> */}
                                        <img class="img-fluid" src={course2img} alt="" />
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
                                    {/* </Link> */}
                                    <a class="courses-list-item position-relative d-block overflow-hidden mb-2" href="/details/3">
                                        {/* <Link class="courses-list-item position-relative d-block overflow-hidden mb-2" to={'/details/3'}> */}
                                        <img class="img-fluid" src={course3img} alt="" />
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
                                    {/* </Link> */}
                                    <a class="courses-list-item position-relative d-block overflow-hidden mb-2" href="/details/4">
                                        {/* <Link class="courses-list-item position-relative d-block overflow-hidden mb-2" to={'/details/4'}> */}
                                        <img class="img-fluid" src={course4img} alt="" />
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
                                    {/* </Link> */}
                                </OwlCarousel>


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
                                        <h6 class="text-white my-3">{this.state.duration} Months</h6>
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
                                        <Link class="btn btn-block btn-secondary py-3 px-5" to={'/contact'}>Enroll Now</Link>
                                        {/* <a class="btn btn-block btn-secondary py-3 px-5" href="contact.html">Enroll Now</a> */}
                                    </div>
                                </div>

                                <div class="mb-5">
                                    <h2 class="mb-3">Categories</h2>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                            {/* <Link to={'/details/1'} class="text-decoration-none h6 m-0" >Master in Web Design</Link> */}
                                            <a href="/details/1" class="text-decoration-none h6 m-0">Master in Web Design</a>
                                            {/* <!-- <span class="badge badge-primary badge-pill">150</span> --> */}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                            {/* <Link to={'/details/2'} class="text-decoration-none h6 m-0" >Master in Frontend Development</Link> */}
                                            <a href="/details/2" class="text-decoration-none h6 m-0">Master in Frontend Development</a>
                                            {/* <!-- <span class="badge badge-primary badge-pill">131</span> --> */}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                            {/* <Link to={'/details/3'} class="text-decoration-none h6 m-0" >Master in Backend Development</Link> */}
                                            <a href="/details/3" class="text-decoration-none h6 m-0">Master in Backend Development</a>
                                            {/* <!-- <span class="badge badge-primary badge-pill">78</span> --> */}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                            {/* <Link to={'/details/4'} class="text-decoration-none h6 m-0" >Master in Fullstack Development</Link> */}
                                            <a href="/details/4" class="text-decoration-none h6 m-0">Master in Fullstack Development</a>
                                            {/* <!-- <span class="badge badge-primary badge-pill">56</span> --> */}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                            {/* <Link to={'/details/6'} class="text-decoration-none h6 m-0" >Master in Firebase</Link> */}
                                            <a href="/details/6" class="text-decoration-none h6 m-0">Master in Firebase</a>
                                            {/* <!-- <span class="badge badge-primary badge-pill">98</span> --> */}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                            {/* <Link to={'/details/5'} class="text-decoration-none h6 m-0" >Master in 360 & 3D Website</Link> */}
                                            <a href="/details/5" class="text-decoration-none h6 m-0">Master in 360 & 3D Website</a>
                                            {/* <!-- <span class="badge badge-primary badge-pill">98</span> --> */}
                                        </li>
                                    </ul>
                                </div>

                                <div class="mb-5">
                                    <h2 class="mb-4">Recent Courses</h2>
                                    <a class="d-flex align-items-center text-decoration-none mb-4" href="/details/2">

                                        <img class="img-fluid rounded" src={coursethumb} alt="" />
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
                                    <a class="d-flex align-items-center text-decoration-none mb-4" href="/details/3">
                                        <img class="img-fluid rounded" src={coursethumb} alt="" />
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
                                    <a class="d-flex align-items-center text-decoration-none mb-4" href="/details/6">
                                        <img class="img-fluid rounded" src={coursethumb} alt="" />
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
                                    <a class="d-flex align-items-center text-decoration-none" href="/details/5">
                                        <img class="img-fluid rounded" src={coursethumb} alt="" />
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
                    </div >
                </div >
            </Layout >
        )
    }
}
