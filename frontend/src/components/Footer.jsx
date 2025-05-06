import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/our-team">Our Team</Link>
          <Link to="/terms">Terms of Use</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
        <div className="contact-info">
          <p>+639212121021</p>
          <p>redspartanlandf@g.batstate-u.edu.ph</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
