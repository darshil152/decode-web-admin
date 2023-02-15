import React, { Component } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from './img/logo.png'



export default class Navbarforprofile extends Component {
    state = {
        currentPage: '',
        id: '',
    }
    componentDidMount() {
        let url = window.location.href
        var id = url.substring(url.lastIndexOf('/') + 1);
        this.setState({ id })
        console.log(id);
        url = url.split('/')
        this.setState({ currentPage: url[3] ? url[3] : '' })
    }

    render() {
        return (
            // <div className="container-fluid p-0">
            //     <Navbar bg="white" expand="lg" className='py-3 py-lg-0 px-lg-4'>

            //         <Navbar.Brand href="/"> <img className="m-0 logo" src={logo} alt="Decode Softtech" /></Navbar.Brand>
            //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
            //         <Navbar.Collapse id="basic-navbar-nav">
            //             <NavDropdown title="Other Details" id="basic-nav-dropdowns" className='btn btn-primary py-2 px-4 ml-auto d-none d-lg-block'>


            //                 <NavDropdown.Item>
            //                     <Link to={'/attandancesheet/' + this.state.id}>Attandance</Link>
            //                 </NavDropdown.Item>
            //                 <NavDropdown.Item>
            //                     <Link to={'/paymentdetail/' + this.state.id}>Payment Details</Link>
            //                 </NavDropdown.Item>
            //                 <NavDropdown.Item>
            //                     <Link to={'/referencedetail/' + this.state.id}>Reference Detail</Link>
            //                 </NavDropdown.Item>
            //             </NavDropdown>
            //             {/* <Link to={'/login'} className={this.state.currentPage == 'login' ? "nav-item nav-link active" : "nav-item nav-link btn btn-primary py-2 px-4 ml-auto d-none d-lg-block"}>Login</Link> */}

            //         </Navbar.Collapse>
            //     </Navbar>
            // </div>
            <Navbar expand="lg">
                <Navbar.Brand href="/"><img className="m-0 logo" src={logo} alt="Decode Softtech" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <NavDropdown title="Details" id="basic-nav-dropdown">
                            <NavDropdown.Item>
                                <Link to={'/attandancesheet/' + this.state.id}>Attandance</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to={'/paymentdetail/' + this.state.id}>Payment Details</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to={'/referencedetail/' + this.state.id}>Reference Detail</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


        )
    }
}
