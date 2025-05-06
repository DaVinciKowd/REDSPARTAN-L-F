import React from 'react';
import '../styles/Terms.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Terms() {
  const navigate = useNavigate();

  const goToHub = () => {
    navigate('/');
  };

  return (
    <>
      <div className="terms-page">
        <Navbar />

        {/* Main Content Section */}
        <main className="terms-main">
          <div className="terms-container">
            <h1>Terms and Conditions</h1>
            <p>Last Update: May 04, 2025</p>
            <p>
              Welcome to the RedSpartan Lost and Found System. By accessing and using this website, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, please refrain from using the site.
            </p>

            {/* Terms Sections */}
            <section className='terms-section'>
              <h2>1. User Eligibility</h2>
              <p>Only registered students and authorized personnel of Batangas State University may access and use the system. All users must use their official university email for registration.</p>
            </section>
            <section className='terms-section'>
              <h2>2. Account Responsibility</h2>
              <p>Users are responsible for maintaining the confidentiality of their login credentials. Any actions performed under your account will be considered your responsibility. Please notify us immediately of any unauthorized use.</p>
            </section>
            <section className='terms-section'>
              <h2>3. Accurate Information</h2>
              <p>Users must provide truthful and complete information when registering, reporting lost items, or submitting claims. False claims or misleading reports may lead to account suspension or permanent removal from the system.</p>
            </section>
            <section className='terms-section'>
              <h2>4. Use of the System</h2>
              <p>This platform is intended solely for reporting, searching, and claiming lost or found items on campus. Users must not upload offensive, illegal, or irrelevant content. Abuse or misuse of the system may result in disciplinary action.</p>
            </section>
            <section className='terms-section'>
              <h2>5. Item Claim Process</h2>
              <p>Claiming an item requires submission of identifying details or proof of ownership. Claims will be reviewed and verified by an authorized administrator before approval. Submission does not guarantee approval.</p>
            </section>
            <section className='terms-section'>
              <h2>6. Administrator Rights</h2>
              <p>System administrators have the authority to review, approve, reject, or remove any report or claim. Administrators may flag inappropriate content and suspend accounts if terms are violated.</p>
            </section>
            <section className='terms-section'>
              <h2>7. Privacy and Data Use</h2>
              <p>All personal data submitted will be handled in accordance with applicable data protection policies. Email addresses, item information, and activity logs may be stored to improve system functionality and traceability.</p>
            </section>
            <section className='terms-section'>
              <h2>8. Limitation of Liability</h2>
              <p>The university and system developers shall not be held liable for any direct or indirect loss resulting from the use or misuse of the website. The system does not guarantee recovery of lost items.</p>
            </section>
            <section className='terms-section'>
              <h2>9. Modifications</h2>
              <p>These terms and conditions may be updated at any time without prior notice. Continued use of the system implies acceptance of the current version of the terms.</p>
            </section>

            <button className="terms-back-btn" onClick={goToHub}>
              Back to Home
            </button>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Terms;
