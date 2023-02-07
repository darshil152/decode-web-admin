import React, { Component } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from './img/logo.png'

export default class NavbarComponent extends Component {
    state = {
        currentPage: ''
    }
    componentDidMount() {
        let url = window.location.href
        url = url.split('/')
        this.setState({ currentPage: url[3] ? url[3] : '' })

    }
    render() {
        return (
            <div className="container-fluid p-0">
                <Navbar bg="white" expand="lg" className='py-3 py-lg-0 px-lg-4'>

                    <Navbar.Brand href="/"> <img className="m-0 logo" src={logo} alt="Decode Softtech" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="navbar-light py-3 py-lg-0 px-lg-5">
                            <Link to={'/'} className={this.state.currentPage == '' ? "nav-item nav-link active" : "nav-item nav-link "}>Home</Link>
                            <Link to={'/about'} className={this.state.currentPage == 'about' ? "nav-item nav-link active" : "nav-item nav-link "}>About</Link>
                            <Link to={'/courses'} className={this.state.currentPage == 'courses' ? "nav-item nav-link active" : "nav-item nav-link "}>Courses</Link>


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
                                <NavDropdown.Item>
                                    <Link to={'/placement-partners'}>Placement Partners</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Link to={'/contact'} className={this.state.currentPage == 'contact' ? "nav-item nav-link active" : "nav-item nav-link "}>Contact Us</Link>

                        </Nav>
                        <Link to={'/login'} className={this.state.currentPage == 'login' ? "nav-item nav-link active" : "nav-item nav-link btn btn-primary py-2 px-4 ml-auto d-none d-lg-block"}>Login</Link>

                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
