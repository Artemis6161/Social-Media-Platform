// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
    return (
        <nav className="navbar">
             <Link to="/" className="navbar-brand">MyApp</Link>
            <ul className="navbar-links">
                {user ? (
                    <>
                    <li>
                    <Link to="/" className="active">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                        <li >Hello, {user.username}</li>
                        <li ><Link to="/logout">Logout</Link></li>
                    </>
                ) : (
                    <>
                        <li ><Link to="/login">Login</Link></li>
                        <li ><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};



export default Navbar;