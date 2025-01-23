import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbaar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication
    const navigate = useNavigate();

    // Check the authentication state when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Set authentication state based on token presence
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsAuthenticated(false); // Update authentication state
        navigate('/login'); // Redirect to login page
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: 'linear-gradient(to right, #009688, #80cbc4)' }}>
                <div className="container-fluid">
                    {/* Brand Logo */}
                    <NavLink className="navbar-brand" to="/">
                        <span style={{ fontWeight: 'bold', fontSize: '1.5em', color: 'white' }}>C</span>
                        <span style={{ color: 'white' }}>RAFT</span>
                        <span style={{ fontWeight: 'bold', fontSize: '1.5em', color: 'white' }}>L</span>
                        <span style={{ color: 'white' }}>OG</span>
                    </NavLink>

                    {/* Navbar Toggler for Mobile */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Links */}
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            {isAuthenticated ? (
                                <li className="nav-item">
                                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/signup">Signup</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbaar;
