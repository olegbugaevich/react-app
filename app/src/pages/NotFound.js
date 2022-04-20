import React from 'react';
import {NavLink} from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <h1>Page not found</h1>
            <NavLink to="/" className="btn btn-primary">Go Home</NavLink>
        </>
    );
};

export default NotFound;