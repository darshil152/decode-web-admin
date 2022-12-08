import React, { Component } from 'react'

export default class Feature extends Component {
    render() {
        return (
            <div className="container-fluid bg-image margin-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 my-5 pt-5 pb-lg-5">
                            <div className="section-title position-relative mb-4">
                                <h6 className="d-inline-block position-relative text-secondary-new text-uppercase pb-2">Why Choose Us?
                                </h6>
                                <h1 className="display-4 my-5">Why You Should Start Learning with Us?</h1>
                            </div>
                            {/* <!-- <p className="mb-4 pb-2">Aliquyam accusam clita nonumy ipsum sit sea clita ipsum clita, ipsum dolores
                                        amet voluptua duo dolores et sit ipsum rebum, sadipscing et erat eirmod diam kasd labore clita
                                        est. Diam sanctus gubergren sit rebum clita amet.</p> --> */}
                            <div className="d-flex mb-3">
                                <div className="btn-icon bg-primary-new mr-4">
                                    <i className="fa fa-2x fa-graduation-cap text-white"></i>
                                </div>
                                <div className="mt-auto mb-auto">
                                    <h4>Skilled Instructors</h4>
                                    {/* <!-- <p>Labore rebum duo est Sit dolore eos sit tempor eos stet, vero vero clita magna kasd no
                                                nonumy et eos dolor magna ipsum.</p> --> */}
                                </div>
                            </div>
                            <div className="d-flex mb-3">
                                <div className="btn-icon bg-secondary-new mr-4">
                                    <i className="fa fa-2x fa-certificate text-white"></i>
                                </div>
                                <div className="mt-auto mb-auto">
                                    <h4>Personal Training</h4>
                                    {/* <!-- <p>Labore rebum duo est Sit dolore eos sit tempor eos stet, vero vero clita magna kasd no
                                                nonumy et eos dolor magna ipsum.</p> --> */}
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="btn-icon bg-warning mr-4">
                                    <i className="fa fa-2x fa-book-reader text-white"></i>
                                </div>
                                <div className="mt-auto mb-auto">
                                    <h4>100% Job Placements</h4>
                                    {/* <!-- <p className="m-0">Labore rebum duo est Sit dolore eos sit tempor eos stet, vero vero clita
                                                magna kasd no nonumy et eos dolor magna ipsum.</p> --> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 min-h-500" >
                            <div className="position-relative h-100">
                                <img className="position-absolute w-100 h-100 img-cover" src="img/feature.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
