import React, { Component } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import logo from './img/logo.png'
export default class Navbar extends Component {
    render() {
        return (
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
                    <a href="index.html" className="navbar-brand ml-lg-3">
                        {/* <!-- <h1 className="m-0 text-uppercase text-primary"><i className="fa fa-book-reader mr-3"></i>Edukate</h1> --> */}
                        <img className="m-0 logo" src={logo} alt="Decode Softtech" />
                    </a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
                        <div className="navbar-nav mx-auto py-0">
                            <Link to={'/'} className="nav-item nav-link active">Home</Link>
                            <Link to={'/about'} className="nav-item nav-link ">About</Link>
                            <Link to={'/courses'} className="nav-item nav-link ">Courses</Link>


                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Pages"

                            >
                                <NavDropdown.Item><Link to={'/details/4'}>Course Details</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to={'/feature'}>      Our Features</Link>

                                </NavDropdown.Item>
                                <NavDropdown.Item ><Link to={'/instructors'}>Instructors</Link></NavDropdown.Item>

                                <NavDropdown.Item>
                                    <Link to={'/testimonial'}>Testimonial</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Link to={'/contact'} className="nav-item nav-link ">Contact Us</Link>
                        </div>
                        <a href="https://wa.me/918347763858" target="_blank"
                            className="btn btn-primary py-2 px-4 d-none d-lg-block"> <i className="fa-brands fa-whatsapp mr-2"></i> Join
                            Us</a>
                    </div>
                </nav>
            </div>
        )
    }
}
