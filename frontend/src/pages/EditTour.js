// src/pages/EditTour.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditTour({ language = "en" }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    duration: "",
    category: "",
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    fetchTour();
  }, [id]);

  const fetchTour = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tours/${id}`);
      setTour({
        title: res.data.title,
        description: res.data.description,
        price: res.data.price,
        location: res.data.location,
        duration: res.data.duration,
        category: res.data.category,
      });
      setExistingImages(res.data.images || []);
    } catch (err) {
      console.error("Error fetching tour:", err);
      alert("❌ Failed to load tour data.");
    }
  };

  const handleChange = (e) => {
    setTour({ ...tour, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(tour).forEach(([key, value]) =>
      formData.append(key, value)
    );
    newImages.forEach((img) => formData.append("images", img));

    try {
      await axios.put(`http://localhost:5000/api/tours/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Tour updated successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("Error updating tour:", err);
      alert("❌ Failed to update tour.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url("/images/1762421067242-1762242446138-tour2.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 700,
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: 16,
          padding: 30,
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          backdropFilter: "blur(8px)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 25,
            color: "#2c3e50",
            fontWeight: "bold",
          }}
        >
          {language === "en" ? "✏️ Edit Tour" : "✏️ ጉብኝት ያስተካክሉ"}
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {renderInput("title", "Title", "ርዕስ", tour.title, handleChange)}
          {renderTextarea("description", "Description", "መግለጫ", tour.description, handleChange)}
          {renderInput("price", "Price ($)", "ዋጋ ($)", tour.price, handleChange, "number")}
          {renderInput("location", "Location", "ቦታ", tour.location, handleChange)}
          {renderInput("duration", "Duration", "ቆይታ", tour.duration, handleChange)}
          {renderInput("category", "Category", "መደብ", tour.category, handleChange)}

          <label style={labelStyle}>
            {language === "en" ? "Existing Images" : "ነባር ምስሎች"}
          </label>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
            {existingImages.length > 0 ? (
              existingImages.map((img, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:5000${img}`}
                  alt="tour"
                  style={{
                    width: 90,
                    height: 90,
                    objectFit: "cover",
                    borderRadius: 10,
                    border: "1px solid #ddd",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  }}
                />
              ))
            ) : (
              <p style={{ color: "#999" }}>No images yet</p>
            )}
          </div>

          <label style={labelStyle}>
            {language === "en" ? "Upload New Images" : "አዲስ ምስሎች ያስገቡ"}
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            style={inputStyle}
          />

          <div style={{ textAlign: "center", marginTop: 25 }}>
            <button type="submit" style={submitBtnStyle}>
              {language === "en" ? "Update Tour" : "ጉብኝት አዘምን"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              style={cancelBtnStyle}
            >
              {language === "en" ? "Cancel" : "ሰርዝ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 🧩 Helper components
const renderInput = (name, labelEn, labelAm, value, onChange, type = "text") => (
  <div>
    <label style={labelStyle}>{labelEn} / {labelAm}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      style={inputStyle}
      required
    />
  </div>
);

const renderTextarea = (name, labelEn, labelAm, value, onChange) => (
  <div>
    <label style={labelStyle}>{labelEn} / {labelAm}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      style={{ ...inputStyle, resize: "none" }}
      required
    />
  </div>
);

const labelStyle = {
  display: "block",
  marginBottom: 6,
  marginTop: 15,
  color: "#2c3e50",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 14,
  outline: "none",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const submitBtnStyle = {
  padding: "10px 25px",
  background: "linear-gradient(135deg, #27ae60, #2ecc71)",
  border: "none",
  borderRadius: 10,
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
  cursor: "pointer",
  marginRight: 10,
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
};

const cancelBtnStyle = {
  padding: "10px 25px",
  background: "#7f8c8d",
  border: "none",
  borderRadius: 10,
  color: "#fff",
  fontSize: 16,
  cursor: "pointer",
};

export default EditTour;
