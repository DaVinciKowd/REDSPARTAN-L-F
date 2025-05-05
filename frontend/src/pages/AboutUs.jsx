import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../styles/AboutUs.css";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main className="about-main">
        <div className="about-container">
          <h1 className="about-title">About Us</h1>
          <p className="about-subtitle">
            Reuniting lost items with their rightful owners at Batangas State
            University.
          </p>

          <section className="about-section">
            <h2>Who We Are</h2>
            <p>
              We are CPE students of Batangas State University Alangilan Campus...
            </p>

            <div className="about-mission-vision">
              <div className="about-mission">
                <h2>Our Mission</h2>
                <p>RedSpartanL&amp;F is committed to enhancing the recovery of lost items...</p>
              </div>
              <div className="about-vision">
                <h2>Our Vision</h2>
                <p>To be the leading digital solution for campus lost and found...</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Our Objectives</h2>
            <p>RedSpartanL&amp;F is guided by the following objectives:</p>
            <ul className="about-objectives-list">
            <li>
                <strong>Secure Authentication</strong> - To ensure secure and verified access through domain-specific login restricted to BatStateU email accounts..</li>
                <li><strong>Streamlined Reporting</strong> - To enable users to report lost or found items with complete and accurate details, including descriptions, categories, and locations.</li>
                <li><strong>Smart Search System</strong> - To provide a searchable and organized item database that allows filtering by keywords, categories, dates, and status.</li>
                <li><strong>Interactive Campus Mapping</strong> - To integrate an interactive campus map for precise tagging of reported items within BatStateU Alangilan.</li>
                <li><strong>Digital Claim Verification</strong> - To implement a digital claim verification process that supports the secure and accurate validation of item ownership.</li>
                <li><strong>Administrative Dashboard</strong> - To offer an administrative dashboard for managing user activity, reviewing reports, and monitoring overall system transactions.</li>
            </ul>
          </section>

          <button className="about-back-btn" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default AboutUs;
