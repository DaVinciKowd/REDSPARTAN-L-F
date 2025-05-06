// Home.jsx
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";

function Home() {
    return (
        <div className="home-page">
            <Navbar />
            <div className="home-page">
                <main className="home-main">
                    <div className="home-content">
                        <h1>Welcome to the RedSpartan<br />Lost and Found System</h1>
                        <p className="home-subtitle">A secure platform to connect lost items with their owners</p>

                        <div className="home-options">
                            <Link to="/submit" className="home-option-card">
                                <div className="option-icon submit-icon"></div>
                                <h2>Submit a Found Item</h2>
                                <p>Report an item you've found and help reunite it with its owner.</p>
                                <span className="card-cta">Submit Item</span>
                            </Link>

                            <Link to="/search" className="home-option-card">
                                <div className="option-icon search-icon"></div>
                                <h2>Find an Item</h2>
                                <p>Search for items you may have lost and submit a claim request.</p>
                                <span className="card-cta">Search Now</span>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default Home;