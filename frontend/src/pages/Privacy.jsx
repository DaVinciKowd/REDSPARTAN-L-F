import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Privacy.css';

function Privacy() {
    const navigate = useNavigate();

    const goToHub = () => {
        navigate('/');
    };

return (
    <>
      <Navbar />
      {/* Main Content Section */}
      <div className='privacy-page'>
        <main className='privacy-main'>
            <div className="privacy-container">
            <h1>Privacy Policy</h1>
            <p>Last updated: April 27, 2025</p>
            
            <section className='privacy-section'>
                <h2>1. Introduction</h2>
                <p>At the Lost & Found service for Batangas State University-Alangilan Campus, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you use our website.</p>
            </section>
            
            <section className='privacy-section'>
                <h2>2. Information We Collect</h2>
                <p>We may collect the following types of information:<br />
                - <strong>Personal Information</strong>: Email address, name, and contact details when you create an account or report a lost/found item.<br />
                - <strong>Item Information</strong>: Descriptions, images, and location details of lost or found items you submit.<br />
                - <strong>Usage Data</strong>: Information about how you interact with our website, such as IP address, browser type, and pages visited.</p>
            </section>
            
            <section className='privacy-section'>
                <h2>3. How We Use Your Information</h2>
                <p>We use the collected information to:<br />
                - Facilitate the reporting and searching of lost and found items.<br />
                - Communicate with you regarding your reports or inquiries.<br />
                - Improve our website's functionality and user experience.<br />
                - Ensure the security of our platform.</p>
            </section>
            
            <section className='privacy-section'>
                <h2>4. Sharing Your Information</h2>
                <p>We do not share your personal information with third parties except:<br />
                - When required by law or to comply with legal processes.<br />
                - To protect the safety and security of our users and the platform.<br />
                - With your consent, such as when facilitating the return of a lost item to its owner.</p>
            </section>
            
            <section className='privacy-section'>
                <h2>5. Data Security</h2>
                <p>We implement reasonable security measures to protect your information from unauthorized access, disclosure, or loss. However, no system is completely secure, and we cannot guarantee absolute security.</p>
            </section>
            
            <section className='privacy-section'>
                <h2>6. Your Rights</h2>
                <p>You have the right to:<br />
                - Access and update your personal information in your account.<br />
                - Request deletion of your account and associated data by contacting us.<br />
                - Opt out of communications by following the unsubscribe instructions in our emails.</p>
            </section>
            
            <section className='privacy-section'>
                <h2>7. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:redspartanlandf@g.batstate-u.edu.ph">redspartanlandf@g.batstate-u.edu.ph</a> or call us at +639212121021.</p>
            </section>
            
            <button className="privacy-back-btn" onClick={goToHub}>Back to Home</button>
            </div>
        </main>
    </div>
      <Footer />
    </>
  );
};

export default Privacy;