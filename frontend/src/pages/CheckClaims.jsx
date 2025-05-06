import React, { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/CheckClaims.css";

function CheckClaims() {
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const res = await api.get("/api/claims/");
                setClaims(res.data);
            } catch (err) {
                console.error("Error fetching claims:", err);
                setError("Failed to fetch claims.");
            } finally {
                setLoading(false);
            }
        };

        fetchClaims();
    }, []);

    // Function to format date nicely
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <Navbar />
            <main className="check-main">
                <div className="check-container">
                    <h1>My Claims</h1>
                    {loading && <p>Loading claims information...</p>}
                    {error && <p className="error">{error}</p>}
                    {!loading && claims.length === 0 && <p>You have not made any claims yet.</p>}
                    {!loading && claims.length > 0 && (
                        <table className="claims-table">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Status</th>
                                    <th>Claim Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {claims.map((claim) => (
                                    <tr 
                                        key={claim.id} 
                                        data-status={claim.status.toLowerCase()}
                                    >
                                        <td>{claim.item.name}</td>
                                        <td>{claim.status}</td>
                                        <td>{formatDate(claim.approval_date)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default CheckClaims;