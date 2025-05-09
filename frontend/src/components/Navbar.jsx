import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const storedUsername = localStorage.getItem("username");
        if (token) {
            setIsAuthenticated(true);
            setUsername(storedUsername || "Student");
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">
                        <img
                            src="https://i.ibb.co/LzVvjVjm/Final-Logo.png"
                            alt="Logo"
                        />
                    </Link>
                </div>

                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/my-claims">Check Claims</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>

                <div className="auth-buttons">
                    {isAuthenticated ? (
                        <>
                            <span className="welcome-message">Welcome, {username}!</span>
                            <button onClick={() => {
                                localStorage.removeItem(ACCESS_TOKEN);
                                localStorage.removeItem("username");
                                window.location.reload();
                            }}>
                                <Link to="/logout">Logout</Link>
                            </button>
                        </>
                    ) : (
                        <>
                            <button><Link to="/login">Login</Link></button>
                            <button><Link to="/register">Register</Link></button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
