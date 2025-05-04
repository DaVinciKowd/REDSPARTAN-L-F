import React from "react";
import ItemHandling from "../components/ItemHandling";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/SubmitItem.css";

function SubmitItem() {
    return (
        <>
            <Navbar />
            <main>
                <div className="submit-main-content">
                    <div className="submit-container">
                        <div className="submit-welcome-text">
                            <h1>Submit a Lost Item</h1>
                            <br></br>
                            <p>
                                Help the BatStateU community by reporting a lost item. Fill in the necessary details below to submit your entry to the lost and found system.
                            </p>
                            <p>
                                Make sure to provide accurate information and images to increase the chances of finding the rightful owner.
                            </p>
                        </div>

                        <div className="submit-box">
                            <h2>Submit Item</h2>
                            <ItemHandling route="api/items/" method="submit_item" />
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default SubmitItem;
