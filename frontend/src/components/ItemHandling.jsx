import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/ItemHandling.css";
import LoadingIndicator from "./LoadingIndicator";
import CampusMap from "./CampusMap"; 


import { FaTag, FaMapMarkerAlt, FaFileAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

const ITEM_CATEGORIES = [
  "electronics", "hygiene", "clothing", "accessories", "documents",
  "stationery", "sports", "toys", "food", "tools",
  "pet_items", "medical", "musical", "others"
];

function ItemHandling({ route, method }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    image: null,
  });

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const [errorMsg, setErrorMsg] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const navigate = useNavigate();

  const title = method === "submit_item" ? "Submit Item" : "Claim Item";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, image: e.dataTransfer.files[0] });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg([]);
    setSuccessMsg("");
    setLoading(true);

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) payload.append(key, value);
    });

    try {
      await api.post(route, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMsg(`${title} successful!`);
      setFormData({
        name: "",
        category: "",
        description: "",
        location: "",
        image: null,
      });

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      const data = error.response?.data;
      const messages = data ? Object.values(data).flat() : ["Submission failed. Please try again."];
      setErrorMsg(messages);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="itemhandling-form">
      <h2 className="itemhandling-title">{title}</h2>

      <div className="itemhandling-group">
        <label>Item Name</label>
        <div className="itemhandling-input-with-icon">
          <FaTag className="itemhandling-icon" id="itemhandling-name"/>
          <input
            className="itemhandling-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="itemhandling-group">
        <label>Category</label>
        <div className="itemhandling-input-with-icon">
          <MdCategory className="itemhandling-icon" id="itemhandling-category"/>
          <select
            className="itemhandling-input"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {ITEM_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat.replace("_", " ")}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="itemhandling-group">
        <label>Location</label>
        <div className="itemhandling-input-with-icon">
          <FaMapMarkerAlt className="itemhandling-icon" id="itemhandling-location"/>
          <button
            type="button"
            className="itemhandling-input"
            onClick={() => setShowMap(true)}
          >
            {formData.location
              ? `Pinned at ${formData.location}`
              : "Select location on map"}
          </button>
        </div>
      </div>


      <div className="itemhandling-group">
        <label>Description</label>
        <div className="itemhandling-input-with-icon">
          <FaFileAlt className="itemhandling-icon" id="itemhandling-description"/>
          <textarea
            className="itemhandling-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="itemhandling-group">
        <label>Image (optional)</label>
        <div
          className={`itemhandling-dropzone ${dragActive ? "active" : ""}`}
          onClick={handleImageClick}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <p>{formData.image ? formData.image.name : "Drag & drop an image or click to select"}</p>
          <input
            type="file"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>

        {formData.image && (
          <button
            type="button"
            className="itemhandling-remove-image-btn"
            onClick={() => setFormData({ ...formData, image: null })}
          >
            Remove Image
          </button>
        )}
      </div>


      {errorMsg.length > 0 && (
        <div className="itemhandling-error">
          {errorMsg.map((msg, idx) => <div key={idx}>{msg}</div>)}
        </div>
      )}
      {successMsg && <div className="itemhandling-success">{successMsg}</div>}

      <div className="itemhandling-loader">
        {loading && <LoadingIndicator />}
      </div>

      <button className="itemhandling-button" type="submit">{title}</button>

      {showMap && (
        <CampusMap
          onClose={() => setShowMap(false)}
          onSave={({ x, y }) =>
            setFormData({ ...formData, location: `(${x}, ${y})` })
          }
        />
      )}

    </form>
  );
}

export default ItemHandling;
