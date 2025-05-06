import React, { useState } from "react";
import api from "../api";
import "../styles/ItemConfirmation.css";
import { useNavigate } from "react-router-dom";

function ItemConfirmation({ itemId, isOpen, onClose }) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [debugInfo, setDebugInfo] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("access_token");
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

    const handleDecision = async (decision) => {
        if (decision === "no") {
            setResponse("Reservation cancelled.");
            setTimeout(() => {
                onClose();  // Close the modal first
                window.location.reload();  // Refresh the page after 1.5 seconds
            }, 1500);
            return;
        }

        setLoading(true);
        setError(null);
        setDebugInfo(null);

        try {
            const payload = {
                item: itemId,
                status: "approved"
            };

            console.log("Making API POST to /api/claims/ with:", payload);

            const res = await api.post("/api/claims/", payload);

            console.log("API success response:", res.data);

            setResponse("Your request has been approved. Please proceed to the Lost and Found station.");
            setTimeout(() => {
                onClose();
                navigate('/');
            }, 3000);
            
        } catch (err) {
            console.error("Error during claim submission:", err);

            const data = err.response?.data;
            if (typeof data === "object" && data !== null) {
                const messages = Object.entries(data).flatMap(([field, errors]) =>
                    errors.map((msg) => `${field === "non_field_errors" ? "Error" : field}: ${msg}`)
                );
                setError(messages);
            } else {
                setError(["An unknown error occurred."]);
            }

            setDebugInfo({
                errorData: data,
                status: err.response?.status,
                tokenExists: !!localStorage.getItem("access_token"),
                tokenPreview: (localStorage.getItem("access_token") || "").slice(0, 10) + "...",
                endpoint: "/api/claims/"
            });

            setTimeout(() => onClose(), 2000);

        } finally {
            setLoading(false);
        }
    };

    
    if (!isOpen) return null;

    return (
        <div className="item-confirmation-modal">
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Reserve Item for Verification</h2>
                    <p>Do you want to proceed with reserving the item for verification at a physical location on campus?</p>

                    {!response && !loading && (
                        <div className="modal-button-group">
                            <button
                                className="item-confirmation-btn yes-btn"
                                onClick={() => handleDecision("yes")}
                            >
                                Yes
                            </button>
                            <button
                                className="item-confirmation-btn no-btn"
                                onClick={() => handleDecision("no")}
                            >
                                No
                            </button>
                        </div>
                    )}

                    {loading && <div className="modal-loading">Processing your request...</div>}

                    {response && <p className="modal-success">{response}</p>}
                    
                    {error && (
                        <div className="modal-error">
                            <>
                                <strong>Error:</strong>
                                <ul className="modal-error-list">
                                    {error.map((msg, idx) => (
                                    <li key={idx}>{msg}</li>
                                    ))}
                                </ul>
                            </>
                            {/* {debugInfo && (
                                <details>
                                    <summary>Debug Info</summary>
                                    <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                                </details>
                            )} */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItemConfirmation;
