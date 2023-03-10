import { Link } from "react-router-dom";
import Logo from '../img/logo.png'

function AdminSidebar(props) {
    const sidebar_change = (name) => {
        if (name) {
            // window.location.href = "/" + name;
            document.getElementById("root").classList.remove("dash-main-class-add");
        }
    };

    const urlName = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);

    return (
        <>
            <div className="sidebar-main-section">
                <div className="brand-title">
                    <Link to="/" className="d-inline-flex align-items-center cursor-pointer">
                        <img src={Logo} className="img-fluid" alt="logo" />
                    </Link>
                </div>
                <div className="sidebar-main-section-inner pt-xl-3">
                    <div className="sidebar-main-inner-menu">
                        <div className="sidebar-main-inner-list">
                            <ul>
                                <Link to="/dashboard" onClick={sidebar_change}>
                                    <li>
                                        <bdi className={urlName === "dashboard" ? "active" : ""}>
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 5.06299C18.5523 5.06299 19 5.5107 19 6.06299C19 6.61527 18.5523 7.06299 18 7.06299H16C15.4477 7.06299 15 6.61527 15 6.06299C15 5.5107 15.4477 5.06299 16 5.06299H18ZM8 5.06299C8.55228 5.06299 9 5.5107 9 6.06299V10.063C9 10.6153 8.55228 11.063 8 11.063H6C5.44772 11.063 5 10.6153 5 10.063V6.06299C5 5.5107 5.44772 5.06299 6 5.06299H8ZM18 13.063C18.5523 13.063 19 13.5107 19 14.063V18.063C19 18.6153 18.5523 19.063 18 19.063H16C15.4477 19.063 15 18.6153 15 18.063V14.063C15 13.5107 15.4477 13.063 16 13.063H18ZM8 17.063C8.55228 17.063 9 17.5107 9 18.063C9 18.6153 8.55228 19.063 8 19.063H6C5.44772 19.063 5 18.6153 5 18.063C5 17.5107 5.44772 17.063 6 17.063H8ZM21 4.06299C21 3.5107 20.5523 3.06299 20 3.06299H14C13.4477 3.06299 13 3.5107 13 4.06299V8.06299C13 8.61527 13.4477 9.06299 14 9.06299H20C20.5523 9.06299 21 8.61527 21 8.06299V4.06299ZM11 4.06299C11 3.5107 10.5523 3.06299 10 3.06299H4C3.44772 3.06299 3 3.5107 3 4.06299V12.063C3 12.6153 3.44772 13.063 4 13.063H10C10.5523 13.063 11 12.6153 11 12.063V4.06299ZM21 12.063C21 11.5107 20.5523 11.063 20 11.063H14C13.4477 11.063 13 11.5107 13 12.063V20.063C13 20.6153 13.4477 21.063 14 21.063H20C20.5523 21.063 21 20.6153 21 20.063V12.063ZM11 16.063C11 15.5107 10.5523 15.063 10 15.063H4C3.44772 15.063 3 15.5107 3 16.063V20.063C3 20.6153 3.44772 21.063 4 21.063H10C10.5523 21.063 11 20.6153 11 20.063V16.063Z" fill="#84879E" />
                                            </svg>
                                            <span className="sidebars">Dashboard</span>
                                        </bdi>
                                    </li>
                                </Link>
                                <Link to="/add-student" onClick={sidebar_change}>
                                    <li>
                                        <bdi className={urlName === "add-student" ? "active" : ""}>
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 5.06299C18.5523 5.06299 19 5.5107 19 6.06299C19 6.61527 18.5523 7.06299 18 7.06299H16C15.4477 7.06299 15 6.61527 15 6.06299C15 5.5107 15.4477 5.06299 16 5.06299H18ZM8 5.06299C8.55228 5.06299 9 5.5107 9 6.06299V10.063C9 10.6153 8.55228 11.063 8 11.063H6C5.44772 11.063 5 10.6153 5 10.063V6.06299C5 5.5107 5.44772 5.06299 6 5.06299H8ZM18 13.063C18.5523 13.063 19 13.5107 19 14.063V18.063C19 18.6153 18.5523 19.063 18 19.063H16C15.4477 19.063 15 18.6153 15 18.063V14.063C15 13.5107 15.4477 13.063 16 13.063H18ZM8 17.063C8.55228 17.063 9 17.5107 9 18.063C9 18.6153 8.55228 19.063 8 19.063H6C5.44772 19.063 5 18.6153 5 18.063C5 17.5107 5.44772 17.063 6 17.063H8ZM21 4.06299C21 3.5107 20.5523 3.06299 20 3.06299H14C13.4477 3.06299 13 3.5107 13 4.06299V8.06299C13 8.61527 13.4477 9.06299 14 9.06299H20C20.5523 9.06299 21 8.61527 21 8.06299V4.06299ZM11 4.06299C11 3.5107 10.5523 3.06299 10 3.06299H4C3.44772 3.06299 3 3.5107 3 4.06299V12.063C3 12.6153 3.44772 13.063 4 13.063H10C10.5523 13.063 11 12.6153 11 12.063V4.06299ZM21 12.063C21 11.5107 20.5523 11.063 20 11.063H14C13.4477 11.063 13 11.5107 13 12.063V20.063C13 20.6153 13.4477 21.063 14 21.063H20C20.5523 21.063 21 20.6153 21 20.063V12.063ZM11 16.063C11 15.5107 10.5523 15.063 10 15.063H4C3.44772 15.063 3 15.5107 3 16.063V20.063C3 20.6153 3.44772 21.063 4 21.063H10C10.5523 21.063 11 20.6153 11 20.063V16.063Z" fill="#84879E" />
                                            </svg>
                                            <span className="sidebars">Add Student</span>
                                        </bdi>
                                    </li>
                                </Link>
                                <Link to="/attandance" onClick={sidebar_change}>
                                    <li>
                                        <bdi className={urlName === "attandance" ? "active" : ""}>
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 5.06299C18.5523 5.06299 19 5.5107 19 6.06299C19 6.61527 18.5523 7.06299 18 7.06299H16C15.4477 7.06299 15 6.61527 15 6.06299C15 5.5107 15.4477 5.06299 16 5.06299H18ZM8 5.06299C8.55228 5.06299 9 5.5107 9 6.06299V10.063C9 10.6153 8.55228 11.063 8 11.063H6C5.44772 11.063 5 10.6153 5 10.063V6.06299C5 5.5107 5.44772 5.06299 6 5.06299H8ZM18 13.063C18.5523 13.063 19 13.5107 19 14.063V18.063C19 18.6153 18.5523 19.063 18 19.063H16C15.4477 19.063 15 18.6153 15 18.063V14.063C15 13.5107 15.4477 13.063 16 13.063H18ZM8 17.063C8.55228 17.063 9 17.5107 9 18.063C9 18.6153 8.55228 19.063 8 19.063H6C5.44772 19.063 5 18.6153 5 18.063C5 17.5107 5.44772 17.063 6 17.063H8ZM21 4.06299C21 3.5107 20.5523 3.06299 20 3.06299H14C13.4477 3.06299 13 3.5107 13 4.06299V8.06299C13 8.61527 13.4477 9.06299 14 9.06299H20C20.5523 9.06299 21 8.61527 21 8.06299V4.06299ZM11 4.06299C11 3.5107 10.5523 3.06299 10 3.06299H4C3.44772 3.06299 3 3.5107 3 4.06299V12.063C3 12.6153 3.44772 13.063 4 13.063H10C10.5523 13.063 11 12.6153 11 12.063V4.06299ZM21 12.063C21 11.5107 20.5523 11.063 20 11.063H14C13.4477 11.063 13 11.5107 13 12.063V20.063C13 20.6153 13.4477 21.063 14 21.063H20C20.5523 21.063 21 20.6153 21 20.063V12.063ZM11 16.063C11 15.5107 10.5523 15.063 10 15.063H4C3.44772 15.063 3 15.5107 3 16.063V20.063C3 20.6153 3.44772 21.063 4 21.063H10C10.5523 21.063 11 20.6153 11 20.063V16.063Z" fill="#84879E" />
                                            </svg>
                                            <span className="sidebars" x>attandance</span>
                                        </bdi>
                                    </li>
                                </Link>
                                <Link to="/announcment" onClick={sidebar_change}>
                                    <li>
                                        <bdi className={urlName === "attandance" ? "active" : ""}>
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 5.06299C18.5523 5.06299 19 5.5107 19 6.06299C19 6.61527 18.5523 7.06299 18 7.06299H16C15.4477 7.06299 15 6.61527 15 6.06299C15 5.5107 15.4477 5.06299 16 5.06299H18ZM8 5.06299C8.55228 5.06299 9 5.5107 9 6.06299V10.063C9 10.6153 8.55228 11.063 8 11.063H6C5.44772 11.063 5 10.6153 5 10.063V6.06299C5 5.5107 5.44772 5.06299 6 5.06299H8ZM18 13.063C18.5523 13.063 19 13.5107 19 14.063V18.063C19 18.6153 18.5523 19.063 18 19.063H16C15.4477 19.063 15 18.6153 15 18.063V14.063C15 13.5107 15.4477 13.063 16 13.063H18ZM8 17.063C8.55228 17.063 9 17.5107 9 18.063C9 18.6153 8.55228 19.063 8 19.063H6C5.44772 19.063 5 18.6153 5 18.063C5 17.5107 5.44772 17.063 6 17.063H8ZM21 4.06299C21 3.5107 20.5523 3.06299 20 3.06299H14C13.4477 3.06299 13 3.5107 13 4.06299V8.06299C13 8.61527 13.4477 9.06299 14 9.06299H20C20.5523 9.06299 21 8.61527 21 8.06299V4.06299ZM11 4.06299C11 3.5107 10.5523 3.06299 10 3.06299H4C3.44772 3.06299 3 3.5107 3 4.06299V12.063C3 12.6153 3.44772 13.063 4 13.063H10C10.5523 13.063 11 12.6153 11 12.063V4.06299ZM21 12.063C21 11.5107 20.5523 11.063 20 11.063H14C13.4477 11.063 13 11.5107 13 12.063V20.063C13 20.6153 13.4477 21.063 14 21.063H20C20.5523 21.063 21 20.6153 21 20.063V12.063ZM11 16.063C11 15.5107 10.5523 15.063 10 15.063H4C3.44772 15.063 3 15.5107 3 16.063V20.063C3 20.6153 3.44772 21.063 4 21.063H10C10.5523 21.063 11 20.6153 11 20.063V16.063Z" fill="#84879E" />
                                            </svg>
                                            <span className="sidebars" x>announcment</span>
                                        </bdi>
                                    </li>
                                </Link>
                                <Link to="/fees" onClick={sidebar_change}>
                                    <li>
                                        <bdi className={urlName === "fees" ? "active" : ""}>
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 5.06299C18.5523 5.06299 19 5.5107 19 6.06299C19 6.61527 18.5523 7.06299 18 7.06299H16C15.4477 7.06299 15 6.61527 15 6.06299C15 5.5107 15.4477 5.06299 16 5.06299H18ZM8 5.06299C8.55228 5.06299 9 5.5107 9 6.06299V10.063C9 10.6153 8.55228 11.063 8 11.063H6C5.44772 11.063 5 10.6153 5 10.063V6.06299C5 5.5107 5.44772 5.06299 6 5.06299H8ZM18 13.063C18.5523 13.063 19 13.5107 19 14.063V18.063C19 18.6153 18.5523 19.063 18 19.063H16C15.4477 19.063 15 18.6153 15 18.063V14.063C15 13.5107 15.4477 13.063 16 13.063H18ZM8 17.063C8.55228 17.063 9 17.5107 9 18.063C9 18.6153 8.55228 19.063 8 19.063H6C5.44772 19.063 5 18.6153 5 18.063C5 17.5107 5.44772 17.063 6 17.063H8ZM21 4.06299C21 3.5107 20.5523 3.06299 20 3.06299H14C13.4477 3.06299 13 3.5107 13 4.06299V8.06299C13 8.61527 13.4477 9.06299 14 9.06299H20C20.5523 9.06299 21 8.61527 21 8.06299V4.06299ZM11 4.06299C11 3.5107 10.5523 3.06299 10 3.06299H4C3.44772 3.06299 3 3.5107 3 4.06299V12.063C3 12.6153 3.44772 13.063 4 13.063H10C10.5523 13.063 11 12.6153 11 12.063V4.06299ZM21 12.063C21 11.5107 20.5523 11.063 20 11.063H14C13.4477 11.063 13 11.5107 13 12.063V20.063C13 20.6153 13.4477 21.063 14 21.063H20C20.5523 21.063 21 20.6153 21 20.063V12.063ZM11 16.063C11 15.5107 10.5523 15.063 10 15.063H4C3.44772 15.063 3 15.5107 3 16.063V20.063C3 20.6153 3.44772 21.063 4 21.063H10C10.5523 21.063 11 20.6153 11 20.063V16.063Z" fill="#84879E" />
                                            </svg>
                                            <span className="sidebars" x>fees</span>
                                        </bdi>
                                    </li>
                                </Link>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminSidebar;
