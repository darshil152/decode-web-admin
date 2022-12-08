import React, { Component } from 'react'
import Footer from './Footer'
import Navbar from './navbar'
import TopBar from './topBar'

export default class Layout extends Component {
    render() {
        return (
            <>
                <TopBar />
                <Navbar />
                {this.props.children}
                <Footer />
            </>
        )
    }
}
