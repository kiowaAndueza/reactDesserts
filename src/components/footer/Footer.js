import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram, FaGoogle, FaGithub } from "react-icons/fa";
import React, { Component } from 'react';

export class Footer extends Component {
    render() {
        return (
            <footer className="text-center text-white mt-5" style={{ backgroundColor: "#0CC8A8" }}>
                <div className="container pt-4">
                    <section>
                        <a
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="facebook"><FaFacebook /></i
                        ></a>
                        <a
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="twitter"><FaTwitter /></i
                        ></a>
                        <a
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="google"><FaGoogle /></i
                        ></a>
                        <a
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="instagram"><FaInstagram /></i
                        ></a>
                        <a
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="linkedin"><FaLinkedin /></i
                        ></a>
                        <a
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="github"><FaGithub /></i
                        ></a>
                    </section>
                </div>
                <div className="text-center text-dark p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    © 2022 Copyright:
                    <a className="text-dark" href="http://localhost:3000/" style={{ textDecoration: 'none' }}> manageDesserts.com</a>
                </div>
            </footer>
        );
    }
}