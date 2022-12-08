import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel';
export default class Team extends Component {
    state = {
        teamCarousel: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            }
        }
    }
    render() {
        return (
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="section-title text-center position-relative mb-5">
                        <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">Instructors</h6>
                        <h1 className="display-4">Meet Our Instructors</h1>
                    </div>
                    <OwlCarousel className='owl-carousel team-carousel position-relative' responsive={this.state.teamCarousel} smartSpeed={600} margin={30} items={3} loop={true} autoplay={true} nav={true}>
                        <div className="team-item">
                            <img className="img-fluid w-100" src="img/heaven.jpeg" alt="" />
                            <div className="bg-light text-center p-4">
                                <h5 className="mb-3">Heaven Kapopara</h5>
                                <p className="mb-2">Fullstack Developer</p>
                                <div className="d-flex justify-content-center">
                                    <a className="mx-1 p-1" href="https://twitter.com/Heaven_0715"><i
                                        className="fab fa-twitter"></i></a>
                                    <a className="mx-1 p-1" href="https://www.facebook.com/hevan.kapopara.3/"><i
                                        className="fab fa-facebook-f"></i></a>
                                    <a className="mx-1 p-1" href="https://www.linkedin.com/in/heaven-kapopara-41a517189/"><i
                                        className="fab fa-linkedin-in"></i></a>
                                    <a className="mx-1 p-1" href="https://www.instagram.com/decodesofttech/"><i
                                        className="fab fa-instagram"></i></a>

                                </div>
                            </div>
                        </div>
                        <div className="team-item">
                            <img className="img-fluid w-100" src="img/vandan.jpeg" alt="" />
                            <div className="bg-light text-center p-4">
                                <h5 className="mb-3">Vandan</h5>
                                <p className="mb-2">Flutter Developer</p>
                                <div className="d-flex justify-content-center">
                                    <a className="mx-1 p-1" href="#"><i className="fab fa-twitter"></i></a>
                                    <a className="mx-1 p-1" href="#"><i className="fab fa-facebook-f"></i></a>
                                    <a className="mx-1 p-1" href="#"><i className="fab fa-linkedin-in"></i></a>
                                    <a className="mx-1 p-1" href="https://www.instagram.com/decodesofttech/"><i
                                        className="fab fa-instagram"></i></a>
                                    <a className="mx-1 p-1" href="#"><i className="fab fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="team-item">
                            <img className="img-fluid w-100" src="img/dhara.jpeg" alt="" />
                            <div className="bg-light text-center p-4">
                                <h5 className="mb-3">Dhara</h5>
                                <p className="mb-2">Web Designer</p>
                                <div className="d-flex justify-content-center">
                                    <a className="mx-1 p-1" href="#"><i className="fab fa-twitter"></i></a>
                                    <a className="mx-1 p-1" href="#"><i className="fab fa-facebook-f"></i></a>
                                    <a className="mx-1 p-1" href="#"><i className="fab fa-linkedin-in"></i></a>
                                    <a className="mx-1 p-1" href="https://www.instagram.com/decodesofttech/"><i
                                        className="fab fa-instagram"></i></a>
                                    <a className="mx-1 p-1" href="#"><i className="fab fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </OwlCarousel>


                </div>
            </div>
        )
    }
}
