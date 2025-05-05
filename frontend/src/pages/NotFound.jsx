import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <>
      <div className="not-found-container">
        <div className="not-found-background"></div>
        
        <div className="not-found-content">
          <div className="not-found-graphic">
            <div className="not-found-circle">
              <svg
                className="not-found-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
          </div>
          
          <h1 className="not-found-error-code">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-message">
            Sorry, we couldn't find the page you're looking for. The page might have been removed, 
            renamed, or is temporarily unavailable.
          </p>
          
          <Link to="/" className="not-found-button">
            Return to Homepage
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;