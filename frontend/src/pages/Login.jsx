import React from "react";
import Form from "../components/Form"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import "../styles/Login.css";

function Login() {
    return (
        <>
            <div className="login-page">
                <Navbar />
                <main>
                    <div className="login-main-content">
                        <div className="login-container">
                            <div className="login-welcome-text">
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

                                <p className="login-forgot-password-link">
                                    <a href="/forgot-password">Forgot your password?</a>
                                </p>

                                <p className="login-signup-link">
                                    Don't have an account? <a href="/register">Register now</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    );
}

export default Login;
