import React, { useState, useRef, useEffect } from "react"; 
import ReactDOM from "react-dom"; 
import "../styles/CampusMap.css"; 
import campusMapImg from "../assets/campusmap.png"; 
import pinMarkerImg from "../assets/marker.png"; 
 
function CampusMap({ onClose, onSave, initialCoords = null }) { 
  const [pin, setPin] = useState(null); 
  const [coords, setCoords] = useState(null); 
  const [readOnly, setReadOnly] = useState(false);
  const imageRef = useRef(null); 
 
  // Function to parse coordinates from string format "(x, y)"
  const parseCoordinates = (coordsString) => {
    if (!coordsString) return null;
    
    try {
      // Remove parentheses and split by comma
      const cleaned = coordsString.replace(/[()]/g, '').trim();
      const [x, y] = cleaned.split(',').map(num => parseInt(num.trim(), 10));
      
      if (isNaN(x) || isNaN(y)) {
        console.error("Invalid coordinate format:", coordsString);
        return null;
      }
      
      return { x, y };
    } catch (error) {
      console.error("Error parsing coordinates:", error);
      return null;
    }
  };

  // Initialize component with coords if provided
  useEffect(() => {
    if (initialCoords) {
      // Check if initialCoords is a string in format "(x, y)"
      if (typeof initialCoords === 'string') {
        const parsedCoords = parseCoordinates(initialCoords);
        if (parsedCoords) {
          setReadOnly(true);
          setCoords(parsedCoords);
          
          // Calculate pin position based on parsed coordinates
          if (imageRef.current) {
            const pinWidth = 35;
            const pinHeight = 32;
            setPin({ 
              left: parsedCoords.x - pinWidth / 2, 
              top: parsedCoords.y - pinHeight / 2 
            });
          }
        }
      } else if (typeof initialCoords === 'object' && initialCoords.x && initialCoords.y) {
        // Handle object format { x, y }
        setReadOnly(true);
        setCoords(initialCoords);
        
        const pinWidth = 35;
        const pinHeight = 32;
        setPin({ 
          left: initialCoords.x - pinWidth / 2, 
          top: initialCoords.y - pinHeight / 2 
        });
      }
    }
  }, [initialCoords]);

  // Initialize pin position after image loads
  const handleImageLoad = () => {
    if (readOnly && coords && imageRef.current) {
      const pinWidth = 35;
      const pinHeight = 32;
      setPin({ 
        left: coords.x - pinWidth / 2, 
        top: coords.y - pinHeight / 2 
      });
    }
  };

  const handleClick = (e) => { 
    // Don't allow clicks if in read-only mode
    if (readOnly) return;

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

  // Convert coords to string format
  const coordsToString = () => {
    if (!coords) return "";
    return `(${coords.x}, ${coords.y})`;
  };
 
  const modalContent = ( 
    <div className="campus-map-overlay"> 
      <div className="campus-map-modal"> 
        <h2>{readOnly ? "Saved Location" : "Click on the map to select a location"}</h2>
        {readOnly && coords && (
          <div className="campus-map-coords-display">
            Coordinates: {coordsToString()}
          </div>
        )}
        <div className="campus-map-container"> 
          <img 
            src={campusMapImg} 
            alt="Campus Map" 
            className={`campus-map-image ${readOnly ? 'read-only' : ''}`}
            onClick={handleClick} 
            ref={imageRef} 
            onLoad={handleImageLoad}
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
          {!readOnly ? (
            <>
              <button onClick={handleSave}>Save Pin</button> 
              <button onClick={onClose} className="cancel-btn">Cancel</button>
            </>
          ) : (
            <button onClick={onClose} className="close-btn">Close</button>
          )} 
        </div> 
      </div> 
    </div> 
  ); 
 
  return ReactDOM.createPortal(modalContent, document.body); 
} 
 
export default CampusMap;