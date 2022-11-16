import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="pageNotFound-page mt-5 w-100">
            <div className="mt-5">
                <div className="d-flex align-items-center justify-content-center mt-5">
                    <div className="text-center mt-5">
                        <h1 className="display-1 fw-bold">404</h1>
                        <p className="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
                        <p className="lead">
                            The page you’re looking for doesn’t exist.
                        </p>
                        <Link to="/" className="btn btn-primary">Go Home</Link>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default PageNotFound;