// src/pages/AddTour.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddTour({ language }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
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

  // Remove preview & image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit tour
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    images.forEach((img) => formData.append("images", img));

    try {
      await axios.post("http://localhost:5000/api/tours", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Tour added successfully!");
      navigate("/admin");
    } catch (err) {
      console.error(err);
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
        <input
          type="text"
          placeholder={language === "en" ? "Tour Title" : "ጉብኝት ርዕስ"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: 12, marginBottom: 15, borderRadius: 8, border: "1px solid #ccc" }}
        />

        <textarea
          placeholder={language === "en" ? "Description" : "መግለጫ"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ width: "100%", padding: 12, minHeight: 120, marginBottom: 15, borderRadius: 8, border: "1px solid #ccc" }}
        />

        <input
          type="number"
          placeholder={language === "en" ? "Price ($)" : "ዋጋ ($)"}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ width: "100%", padding: 12, marginBottom: 15, borderRadius: 8, border: "1px solid #ccc" }}
        />

        <label style={{ display: "block", padding: 20, border: "2px dashed #3498db", borderRadius: 8, textAlign: "center", cursor: "pointer", marginBottom: 15 }}>
          {language === "en" ? "Upload Images" : "ምስሎች ያክሉ"}
          <input type="file" multiple onChange={handleImageChange} style={{ display: "none" }} />
        </label>

        {/* Previews */}
        {previewImages.length > 0 && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            {previewImages.map((src, idx) => (
              <div key={idx} style={{ position: "relative", width: 80, height: 80 }}>
                <img src={src} alt={`preview-${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} />
                <button type="button" onClick={() => removeImage(idx)} style={{ position: "absolute", top: -5, right: -5, background: "red", color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20, cursor: "pointer" }}>✖</button>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="button" onClick={() => navigate("/admin")} style={{ padding: 12, borderRadius: 8, background: "#e74c3c", color: "#fff", border: "none", cursor: "pointer" }}>
            {language === "en" ? "Cancel" : "ሰርዝ"}
          </button>
          <button type="submit" style={{ padding: 12, borderRadius: 8, background: "#27ae60", color: "#fff", border: "none", cursor: "pointer" }}>
            {language === "en" ? "Add Tour" : "ጉብኝት ያክሉ"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTour;
