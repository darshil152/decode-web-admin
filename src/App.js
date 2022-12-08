import React, { Component } from 'react'
import Home from './home'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import CoursePage from './CoursePage';

export default class App extends Component {
  render() {
    return (
      <CoursePage />
    )
  }
}
