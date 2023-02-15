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
import Attandancesheet from './Attandancesheet';
import Chart from './Chart';
import Fees from './Fees';
import Paymentdetail from './Paymentdetail';
import ProtectedRouteAdmin from './ProtectedRouterAdmin';
import ProtectedRouteStudent from './ProtectedRouterStudent';
import ReferenceDetails from './ReferenceDetails';
import Navbarforprofile from './navbarforprofile';


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
                    <Route path="/test" element={<Navbarforprofile />} />
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                    {/* <Route path="/profile/:id" element={<Profile />} /> */}
                    {/* <Route path="/Login" element={<Login />} /> */}
                    {/* <Route path="/attandancesheet/:id" element={<Attandancesheet />} /> */}
                    {/* <Route path='/chart' element={<Chart />} /> */}
                    {/* <Route path='/paymentdetail/:id' element={<Paymentdetail />} /> */}


                    <Route path="/dashboard" element={
                        <ProtectedRouteStudent>
                            <Dashboard />
                        </ProtectedRouteStudent>
                    } />


                    <Route path="/profile/:id" element={
                        <ProtectedRouteStudent>
                            <Profile />
                        </ProtectedRouteStudent>
                    } />


                    <Route path="/Login" element={<Login />} />

                    <Route path="/attandancesheet/:id" element={
                        <ProtectedRouteStudent>
                            <Attandancesheet />
                        </ProtectedRouteStudent>
                    } />


                    <Route path="/paymentdetail/:id" element={
                        <ProtectedRouteStudent>
                            <Paymentdetail />
                        </ProtectedRouteStudent>
                    } />

                    <Route path="/referencedetail/:id" element={
                        <ProtectedRouteStudent>
                            <ReferenceDetails />
                        </ProtectedRouteStudent>
                    } />


                    <Route path="/add-student" element={
                        <ProtectedRouteAdmin>
                            <AddStudent />
                        </ProtectedRouteAdmin>
                    } />

                    <Route path="/fees" element={
                        <ProtectedRouteAdmin>
                            <Fees />
                        </ProtectedRouteAdmin>
                    } />



                    <Route path="/attandance" element={
                        <ProtectedRoute>
                            <Attandance />
                        </ProtectedRoute>
                    } />


                    <Route path="*" element={<Home />} />
                </Routes>
            </Router>
        )
    }
}
