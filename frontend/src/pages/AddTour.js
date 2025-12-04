// src/pages/AddTour.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddTour({ language }) {
  const navigate = useNavigate();

  // Load backend URL safely with fallback
  const API_URL = process.env.REACT_APP_BACKEND_URL || "";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Adventure");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [itinerary, setItinerary] = useState([{ day: 1, title: "", description: "" }]);

  // Itinerary handlers
  const handleItineraryChange = (index, field, value) => {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
  };

  const addItineraryDay = () => {
    setItinerary([...itinerary, { day: itinerary.length + 1, title: "", description: "" }]);
  };

  const removeItineraryDay = (index) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };

  // Dates handler
  const handleDatesChange = (e) => {
    const dates = e.target.value.split(",").map((d) => d.trim());
    setAvailableDates(dates);
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!API_URL) {
      alert("❌ API URL is missing. Please check your .env file!");
      return;
    }

    const validDates = availableDates
      .map((d) => new Date(d))
      .filter((d) => !isNaN(d));

    if (validDates.length === 0) {
      alert("Please enter valid dates.");
      return;
    }

    const payload = {
      title,
      description,
      category,
      duration,
      price,
      destination: { country: destinationCountry, city: destinationCity },
      availableDates: validDates,
      itinerary,
    };

    try {
      await axios.post(`${API_URL}tours`, payload);
      alert("✅ Tour added successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("Add Tour Error:", err.response?.data || err);
      alert("❌ Failed to add tour");
    }
  };

  return (
    <div style={{ padding: 20, minHeight: "100vh", background: "#f0f4f8" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>
        {language === "en" ? "Add New Tour" : "አዲስ ጉብኝት ያክሉ"}
      </h1>

      {!API_URL && (
        <p style={{ textAlign: "center", color: "red", marginBottom: 20 }}>
          ⚠️ API URL missing! Check your .env file.
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 650,
          margin: "0 auto",
          padding: 40,
          borderRadius: 16,
          background: "#fff",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={textareaStyle}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={inputStyle}
        >
          <option>Adventure</option>
          <option>Historical</option>
          <option>Nature</option>
          <option>City Tour</option>
          <option>Cultural</option>
        </select>

        <input
          type="number"
          placeholder="Duration (days)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Destination Country"
          value={destinationCountry}
          onChange={(e) => setDestinationCountry(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Destination City"
          value={destinationCity}
          onChange={(e) => setDestinationCity(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Available Dates (YYYY-MM-DD, comma separated)"
          value={availableDates.join(", ")}
          onChange={handleDatesChange}
          required
          style={inputStyle}
        />

        <div>
          <h3>Itinerary</h3>
          {itinerary.map((day, idx) => (
            <div key={idx} style={{ marginBottom: 10 }}>
              <input
                type="text"
                placeholder="Title"
                value={day.title}
                onChange={(e) => handleItineraryChange(idx, "title", e.target.value)}
                required
                style={{ ...inputStyle, width: "45%", marginRight: 10 }}
              />
              <input
                type="text"
                placeholder="Description"
                value={day.description}
                onChange={(e) => handleItineraryChange(idx, "description", e.target.value)}
                required
                style={{ ...inputStyle, width: "45%" }}
              />
              <button type="button" onClick={() => removeItineraryDay(idx)} style={{ marginLeft: 10 }}>
                Remove
              </button>
            </div>
          ))}

          <button type="button" onClick={addItineraryDay}>
            Add Day
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
          <button type="button" onClick={() => navigate("/admin")} style={cancelBtnStyle}>
            Cancel
          </button>
          <button type="submit" style={submitBtnStyle}>
            Add Tour
          </button>
        </div>
      </form>
    </div>
  );
}

// Reusable styles
const inputStyle = { width: "100%", padding: 12, marginBottom: 15, borderRadius: 8, border: "1px solid #ccc" };
const textareaStyle = { ...inputStyle, minHeight: 120 };
const cancelBtnStyle = { padding: 12, borderRadius: 8, background: "#e74c3c", color: "#fff", border: "none", cursor: "pointer" };
const submitBtnStyle = { padding: 12, borderRadius: 8, background: "#27ae60", color: "#fff", border: "none", cursor: "pointer" };

export default AddTour;
