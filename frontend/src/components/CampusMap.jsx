import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "../styles/CampusMap.css";
import campusMapImg from "../assets/campusmap.png";
import pinMarkerImg from "../assets/marker.png";

function CampusMap({ onClose, onSave }) {
  const [pin, setPin] = useState(null);
  const [coords, setCoords] = useState(null);
  const imageRef = useRef(null);

  const handleClick = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const pinWidth = 35; 
    const pinHeight = 32;
  
    const x = e.clientX - rect.left - pinWidth / 2;
    const y = e.clientY - rect.top - pinHeight / 2;
  
    setCoords({ x: Math.round(x + pinWidth / 2), y: Math.round(y + pinHeight / 2) }); // store true center
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

  const modalContent = (
    <div className="campus-map-overlay">
      <div className="campus-map-modal">
        <h2>Click on the map to select a location</h2>
        <div className="campus-map-container">
          <img
            src={campusMapImg}
            alt="Campus Map"
            className="campus-map-image"
            onClick={handleClick}
            ref={imageRef}
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

  return ReactDOM.createPortal(modalContent, document.body);
}

export default CampusMap;
