import React, { useState } from 'react';
import '../styles/OurTeam.css';
import logoImg from '../assets/bsu.png';
import ejImg from '../assets/ej.png';
import vinceImg from '../assets/vince.png';
import kimImg from '../assets/kim.png';
import princessImg from '../assets/princess.png';
import marcusImg from '../assets/marcus.png';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OurTeam = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filterTeam = (category) => {
    setActiveCategory(category);
  };

  const teamMembers = [
    {
      id: 1,
      name: "Emmanuel James Comprendio",
      role: "Project Leader",
      bio: "Emmanuel led the development process, ensuring that the system met all functional requirements and aligned with the project goals. He coordinated team tasks and oversaw design, development, and testing phases.",
      email: "22-07350@g.batstate-u.edu.ph",
      image: ejImg,
      categories: ["leadership"]
    },
    {
      id: 2,
      name: "Vince Paolo Ramilo",
      role: "Co-Project Leader & Full-stack Developer",
      bio: "Vince contributed heavily to the server-side logic, database integration, and overall system architecture. He also played a vital role in managing project timelines and backend functionality.",
      email: "22-09336@g.batstate-u.edu.ph",
      image: vinceImg,
      categories: ["leadership", "backend"]
    },
    {
      id: 3,
      name: "Kim Harrie Abel",
      role: "UI/UX Designer & Frontend Developer",
      bio: "Kim focused on designing a user-centered interface and implementing responsive, intuitive frontend components that enhance the overall user experience.",
      email: "22-07459@g.batstate-u.edu.ph",
      image: kimImg,
      categories: ["frontend"]
    },
    {
      id: 4,
      name: "Princess De Belen",
      role: "Frontend Support Developer",
      bio: "Princess assisted with styling and component layout, contributing to the visual consistency and usability of the system's interface.",
      email: "22-04310@g.batstate-u.edu.ph",
      image: princessImg,
      categories: ["frontend"]
    },
    {
      id: 5,
      name: "Marcus Angelo Claveria",
      role: "Frontend Support Developer",
      bio: "Marcus supported frontend development tasks, ensuring interface elements were properly aligned and functioned as intended.",
      email: "22-02163@g.batstate-u.edu.ph",
      image: marcusImg,
      categories: ["frontend"]
    }
  ];

  const filteredMembers = teamMembers.filter(member => {
    if (activeCategory === 'all') return true;
    return member.categories.includes(activeCategory);
  });

  return (
    <>
        <Navbar />
        {/* Main Content Section */}
        <div className='team-page'>
        <main>
            <div className="team-container">
            <h1>Meet Our Team</h1>
            <p>The dedicated individuals behind RedSpartanL&F</p>
            
            <div className="team-intro">
                <p>The RedSpartan Lost and Found System was developed by a dedicated team of Computer Engineering students from Batangas State University, working collaboratively to create a secure and efficient platform tailored to the university's needs.</p>
            </div>
            
            <div className="team-categories">
                {['all', 'leadership', 'frontend', 'backend'].map(category => (
                <button 
                    key={category}
                    className={`team-category-btn ${activeCategory === category ? 'team-active' : ''}`} 
                    onClick={() => filterTeam(category)}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
                ))}
            </div>
            
            <div className={`team-members ${filteredMembers.length <= 3 ? 'team-centered-grid' : ''}`}>
                {filteredMembers.map((member) => (
                <div key={member.id} className="team-member-card">
                    <div className="team-member-header">
                    <div className="team-member-avatar">
                        <img src={member.image} alt={member.name} />
                    </div>                        
                    </div>
                    <div className="team-member-info">
                    <h2>{member.name}</h2>
                    <div className="team-member-role">{member.role}</div>
                    <p className="team-member-bio">{member.bio}</p>
                    <div className="team-social-links">
                        <a href={`mailto:${member.email}`} className="team-email-link">{member.email}</a>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            
            <div className="team-btn-row">
                <Link to="/">
                    <button className="team-back-btn">Back to Home</button>
                </Link>
            </div>
            </div>
        </main>
        </div>
        <Footer />
    </>
  );
};

export default OurTeam;