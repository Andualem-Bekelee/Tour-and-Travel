// src/pages/AddTour.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddTour({ language }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Adventure");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [itinerary, setItinerary] = useState([{ day: 1, title: "", description: "" }]);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const navigate = useNavigate();

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle itinerary change
  const handleItineraryChange = (index, field, value) => {
    const newItinerary = [...itinerary];
    newItinerary[index][field] = value;
    setItinerary(newItinerary);
  };

  const addItineraryDay = () => {
    setItinerary([...itinerary, { day: itinerary.length + 1, title: "", description: "" }]);
  };

  const removeItineraryDay = (index) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };

  // Handle available dates input (comma separated YYYY-MM-DD)
  const handleDatesChange = (e) => {
    const dates = e.target.value.split(",").map((d) => d.trim());
    setAvailableDates(dates);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category); // must match enum exactly
    formData.append("duration", duration);
    formData.append("price", price);
    formData.append("destination", JSON.stringify({ country: destinationCountry, city: destinationCity }));
    formData.append("availableDates", JSON.stringify(availableDates));
    formData.append("itinerary", JSON.stringify(itinerary));
    images.forEach((img) => formData.append("images", img));

    try {
      await axios.post("http://localhost:5000/api/tours", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required style={textareaStyle} />

        <select value={category} onChange={(e) => setCategory(e.target.value)} required style={inputStyle}>
          <option>Adventure</option>
          <option>Historical</option>
          <option>Nature</option>
          <option>City Tour</option>
          <option>Cultural</option>
        </select>

        <input type="number" placeholder="Duration (days)" value={duration} onChange={(e) => setDuration(e.target.value)} required style={inputStyle} />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required style={inputStyle} />

        <input type="text" placeholder="Destination Country" value={destinationCountry} onChange={(e) => setDestinationCountry(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder="Destination City" value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)} required style={inputStyle} />

        <input type="text" placeholder="Available Dates (YYYY-MM-DD, comma separated)" value={availableDates.join(", ")} onChange={handleDatesChange} required style={inputStyle} />

        <div>
          <h3>Itinerary</h3>
          {itinerary.map((day, idx) => (
            <div key={idx} style={{ marginBottom: 10 }}>
              <input type="text" placeholder="Title" value={day.title} onChange={(e) => handleItineraryChange(idx, "title", e.target.value)} required style={{ ...inputStyle, width: "45%", marginRight: 10 }} />
              <input type="text" placeholder="Description" value={day.description} onChange={(e) => handleItineraryChange(idx, "description", e.target.value)} required style={{ ...inputStyle, width: "45%" }} />
              <button type="button" onClick={() => removeItineraryDay(idx)} style={{ marginLeft: 10 }}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addItineraryDay}>Add Day</button>
        </div>

        <label style={fileLabelStyle}>
          Upload Images
          <input type="file" multiple onChange={handleImageChange} style={{ display: "none" }} />
        </label>

        {previewImages.length > 0 && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            {previewImages.map((src, idx) => (
              <div key={idx} style={{ position: "relative", width: 80, height: 80 }}>
                <img src={src} alt={`preview-${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} />
                <button type="button" onClick={() => removeImage(idx)} style={removeBtnStyle}>✖</button>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="button" onClick={() => navigate("/admin")} style={cancelBtnStyle}>Cancel</button>
          <button type="submit" style={submitBtnStyle}>Add Tour</button>
        </div>
      </form>
    </div>
  );
}

// Reusable styles
const inputStyle = { width: "100%", padding: 12, marginBottom: 15, borderRadius: 8, border: "1px solid #ccc" };
const textareaStyle = { ...inputStyle, minHeight: 120 };
const fileLabelStyle = { display: "block", padding: 20, border: "2px dashed #3498db", borderRadius: 8, textAlign: "center", cursor: "pointer", marginBottom: 15 };
const removeBtnStyle = { position: "absolute", top: -5, right: -5, background: "red", color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20, cursor: "pointer" };
const cancelBtnStyle = { padding: 12, borderRadius: 8, background: "#e74c3c", color: "#fff", border: "none", cursor: "pointer" };
const submitBtnStyle = { padding: 12, borderRadius: 8, background: "#27ae60", color: "#fff", border: "none", cursor: "pointer" };

export default AddTour;
