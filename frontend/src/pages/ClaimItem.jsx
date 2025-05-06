import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ItemConfirmation from "../components/ItemConfirmation";
import CampusMap from "../components/CampusMap";
import api from "../api";
import "../styles/ClaimItem.css";

function ClaimItem() {
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const itemId = parseInt(id);
    const [itemData, setItemData] = useState(null);
    const [showMapModal, setShowMapModal] = useState(false); 

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await api.get(`/api/items/${itemId}/`);
                setItemData(response.data);
            } catch (err) {
                console.error("Failed to fetch item data:", err.response || err);
                alert("Error fetching item data: " + err.response?.data?.detail || "Unknown error");
            }
        };        
        fetchItemData();
    }, [itemId]);

    return (
        <>
            <Navbar />
            <main>
                <div className="claim-main-content">
                    <div className="claim-container">
                        <div className="claim-welcome-text">
                            <h1>Claim a Found Item</h1>
                            <p>
                                Think you found your lost item? Click below to proceed with claiming and schedule an in-person verification.
                            </p>
                            <p>
                                False claims may result in account restrictions.
                            </p>
                        </div>

                        {itemData && (
                            <div className="claim-item-details">
                                {itemData.image && (
                                    <div className="claim-image-container">
                                        <img
                                            src={itemData.image}
                                            alt={itemData.name}
                                            className="claim-item-image"
                                        />
                                    </div>
                                )}
                                <h2>{itemData.name}</h2>
                                <p><strong>Category:</strong> {itemData.category}</p>
                                <p><strong>Description:</strong> {itemData.description}</p>
                                <p><strong>Location:</strong> {itemData.location}</p>
                                <p><strong>Date Reported:</strong> {new Date(itemData.date_reported).toLocaleDateString()}</p>
                            </div>
                        )}
                        <div className="claim-submit-box-container">
                            <div className="claim-submit-box">
                                {/* View Map button next to Proceed to Claim */}
                                <h2>Location</h2>
                                <button
                                    className="claim-button"
                                    onClick={() => setShowMapModal(true)}
                                    disabled={!itemData?.location}  // Disable if no location is available
                                >
                                    View Map
                                </button>
                            </div>

                            <div className="claim-submit-box">
                                <h2>Claim Item</h2>
                                <button
                                    className="claim-button"
                                    onClick={() => setShowModal(true)}
                                >
                                    Proceed to Claim
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <ItemConfirmation
                    itemId={itemId}
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                />

                {/* Map Modal */}
                {showMapModal && (
                    <div className="map-modal-overlay">
                        <div className="map-modal-content">
                            <CampusMap
                                initialCoords={itemData?.location}  // Pass location to CampusMap component
                                readOnly={true}
                                onClose={() => setShowMapModal(false)}
                            />
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}

export default ClaimItem;
