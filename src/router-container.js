import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from './AboutPage';
import AddStudent from './add-student';
import ContactPage from './ContactPage';
import CoursePage from './CoursePage';
import DetailsPage from './DetailsPage';
import FeaturePage from './FeaturePage';
import Home from './home';
import PlacementPartners from './PlacementPartners';
import TeamPage from './TeamPage';
import TearmsCondition from './TearmsCondition';
import TestimonialPage from './TestimonialPage';
import "../src/css/admincss/style.css";
import "../src/css/admincss/style.scss";
import ProtectedRoute from './ProtectedRouter';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Login from './Login';
import Attandance from './Attandance';

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
                    <Route path="/terms" element={<TearmsCondition />} />
                    <Route path="/placement-partners" element={<PlacementPartners />} />
                    <Route path="*" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/attandance" element={<Attandance />} />




                    <Route path="/add-student" element={
                        <ProtectedRoute>
                            <AddStudent />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        )
    }
}
