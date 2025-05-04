import React, { useState } from "react";
import "../styles/CampusMap.css"; // Optional: for extracted styles
import campusMapImg from "../assets/campusmap.png";
import pinMarkerImg from "../assets/marker.png";

function CampusMap({ onClose, onSave }) {
  const [pin, setPin] = useState(null);
  const [coords, setCoords] = useState(null);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCoords({ x, y });
    setPin({ left: x, top: y });
  };

  const handleSave = () => {
    if (!coords) {
      alert("Please pin a location first.");
      return;
    }
    onSave(coords);
    onClose();
  };

  return (
    <div className="campus-map-overlay">
      <div className="campus-map-modal">
        <h2>Click on the map to select a location</h2>
        <div className="campus-map-container" onClick={handleClick}>
          <img
            src={campusMapImg}
            alt="Campus Map"
            className="campus-map-image"
          />
          {pin && (
            <div
              className="campus-map-pin"
              style={{
                left: `${pin.left}px`,
                top: `${pin.top}px`,
                backgroundImage: `url(${pinMarkerImg})`,
              }}
            />
          )}
        </div>
        <div className="campus-map-buttons">
          <button onClick={handleSave}>Save Pin</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default CampusMap;
