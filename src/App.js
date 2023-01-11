import React, { Component } from 'react'
import RouterContainer from './router-container';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'react-toastify/dist/ReactToastify.css';
import './css/style.css'

export default class App extends Component {
  render() {
    return (
      <RouterContainer />
    )
  }
}