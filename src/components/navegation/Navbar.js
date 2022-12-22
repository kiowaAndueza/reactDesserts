import { Outlet, Link } from "react-router-dom";
import { GrConfigure } from "react-icons/gr";
import {BiExit} from "react-icons/bi";
import React from "react";
import Button from 'react-bootstrap/Button';
import { containerLogger } from "../../logger/IsLogger";
import { Nav, Navbar} from "react-bootstrap";

export function Menu() {
    const [isLogger, setLogger] = containerLogger.useState("isLogger");
    const handleLogout = async () => {
        setLogger(false);
        window.location.reload(false);
    }

    if(isLogger){
        return (
        <div>
            <div className="navbar-page p-1" style={{ backgroundColor: "#0CC8A8" }}>
                <Navbar collapseOnSelect expand="lg" className="navbar navbar-expand-lg navbar-light bg-ligh">
                    <Navbar.Brand>
                        Manage Desserts 
                        <i className="configure-icon"> <GrConfigure /></i>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link className="nav-item active mt-2 p-3"><Link  className="nav-link" to="/">Home</Link></Nav.Link>
                            <Nav.Link className="nav-item active mt-2 p-3"><Link  className="nav-link" to="/new">New Dessert</Link></Nav.Link>
                            <Nav.Link className="nav-item active mt-2 p-3"><Link  className="nav-link" to="/myLists">My Lists</Link></Nav.Link>
                            <Nav.Link className="nav-item active mt-2 p-3"><Link  className="nav-link" to="/profile">Profile</Link></Nav.Link>
                            <Button onClick={handleLogout} className="border-0 p-3 mt-2" style={{ backgroundColor: "#0CC8A8" }}>Exit <i><BiExit /></i></Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <Outlet />
        </div>
        );
    }

    return(
        <div>
            <div className="navbar-page p-1" style={{ backgroundColor: "#0CC8A8" }}>
                <Navbar collapseOnSelect expand="lg" className="navbar navbar-expand-lg navbar-light bg-ligh">
                    <Navbar.Brand>
                        Manage Desserts 
                        <i className="configure-icon"> <GrConfigure /></i>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link className="nav-item active mt-2 p-3"><Link  className="nav-link" to="/">Home</Link></Nav.Link>
                            <Nav.Link className="nav-item active mt-2 p-3"><Link  className="nav-link" to="/login">Login</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <Outlet />
        </div>
    );
}
