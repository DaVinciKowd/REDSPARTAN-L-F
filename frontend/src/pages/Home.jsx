import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";

function Home() {
    return (
        <>
            <Navbar />

            <main className="home-main">
                <div className="home-content">
                    <h1>Welcome to the Lost and Found System</h1>
                    <p>Choose an option below to get started:</p>

                    <div className="home-options">
                        <Link to="/submit" className="home-option-card">
                            <h2>Submit a Lost Item</h2>
                            <p>Report an item you've found and help reunite it with its owner.</p>
                        </Link>

                        <Link to="/claim" className="home-option-card">
                            <h2>Find an Item</h2>
                            <p>Search for items you may have lost and submit a claim request.</p>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Home;
