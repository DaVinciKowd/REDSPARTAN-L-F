import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
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
  );
}

export default Footer;
