import React from "react";
import ItemHandling from "../components/ItemHandling";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/ClaimItem.css";

function ClaimItem() {
    return (
        <>
          <Navbar />
          <main>
              <div className="submit-main-content">
                  <div className="submit-container">
                      <div className="submit-welcome-text">
                          <h1>Claim a Found Item</h1>
                          <br />
                          <p>
                              Think you found your lost item? Fill out the form below with accurate details so we can verify your ownership.
                          </p>
                          <p>
                              Please describe the item clearly and honestly. False claims may result in account restrictions.
                          </p>
                      </div>

                      <div className="submit-box">
                          <h2>Claim Item</h2>
                          <ItemHandling route="api/claims/" method="claim_item" />
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

export default ClaimItem;
