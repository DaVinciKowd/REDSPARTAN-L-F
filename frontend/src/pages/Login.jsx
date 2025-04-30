import React from "react";
import Form from "../components/Form"
import Navbar from "../components/Navbar";
import "../styles/Login.css";

function Login() {
    return (
        <>
            <Navbar />
            <main>
                <div className="main-content">
                    <div className="login-container">
                        <div className="welcome-text">
                            <h1>Welcome to the Batangas State University Lost and Found!</h1>
                            <p>
                                This platform is designed exclusively for the BatStateU community to help reunite lost items with their rightful owners. Whether you’ve misplaced something or found an item on campus, our system makes it easy to report and retrieve belongings.
                            </p>
                            <p>
                                Let’s work together to keep our university a secure and responsible space. Start browsing or reporting now, and let’s bring lost items back home!
                            </p>
                        </div>

                        <div className="login-box">
                            <h2>Hi, Welcome back!</h2>
                            <Form route="/api/token/" method="login" />
                            <p className="signup-link">
                                Don't have an account? <a href="/register">Register now</a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <div className="footer-content">
                    <div className="footer-links">
                        <a href="#">Home</a>
                        <a href="#">About Us</a>
                        <a href="#">Our Team</a>
                        <a href="#">Terms of Use</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                    <div className="contact-info">
                        <p>+639212121021</p>
                        <p>redspartanlandf@g.batstate-u.edu.ph</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Login;
