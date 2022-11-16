import { Outlet, Link } from "react-router-dom";
import { GrConfigure } from "react-icons/gr";
import React, { Component } from 'react';

export class Navbar extends Component {
    render() {
        return (
            <div className="navbar-page">
                <nav className="navbar navbar-expand-lg navbar-light p-2 ml-3" style={{ backgroundColor: "#0CC8A8" }}>
                    <div className="navbar-brand m-3 mr-5" href="#">Manage Desserts<i className="configure-icon"><GrConfigure /></i></div>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto ml-0">
                            <li className="nav-item active p-3">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item active p-3">
                                <Link to="/new" className="nav-link">New Dessert</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Outlet />
            </div>
        )
    }
};
