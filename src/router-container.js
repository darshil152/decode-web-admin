import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import CoursePage from './CoursePage';
import DetailsPage from './DetailsPage';
import FeaturePage from './FeaturePage';
import Home from './home';
import TeamPage from './TeamPage';
import TestimonialPage from './TestimonialPage';
export default class RouterContainer extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/courses" element={<CoursePage />} />
                    <Route path="/details/:id" element={<DetailsPage />} />
                    <Route path="/testimonial" element={<TestimonialPage />} />
                    <Route path="/instructors" element={<TeamPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/feature" element={<FeaturePage />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </Router>
        )
    }
}
