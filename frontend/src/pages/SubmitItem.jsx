import React from "react";
import ItemHandling from "../components/ItemHandling";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/SubmitItem.css";

function SubmitItem() {
    return (
        <>
            <Navbar />
            <main className="submit-main-content">
                <div className="submit-wrapper">
                    <div className="submit-container">
                        <div className="submit-welcome-text">
                            <h1>Submit a Lost Item</h1>
                            <p>
                                Help the BatStateU community by reporting a lost item. Fill in the necessary details below to submit your entry to the lost and found system.
                            </p>
                            <p>
                                Make sure to provide accurate information and images to increase the chances of finding the rightful owner.
                            </p>
                            
                            <div className="submit-info-card">
                                <h3>Submission Guidelines</h3>
                                <ul>
                                    <li>Include a clear description of the item</li>
                                    <li>Specify where and when you found the item</li>
                                    <li>Upload a clear image if available</li>
                                    <li>Provide your contact information</li>
                                    <li>Be as detailed as possible to help with identification</li>
                                </ul>
                            </div>
                        </div>

                        <div className="submit-box">
                            <h2>Submit Item Details</h2>
                            <ItemHandling route="api/items/" method="submit_item" />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default SubmitItem;