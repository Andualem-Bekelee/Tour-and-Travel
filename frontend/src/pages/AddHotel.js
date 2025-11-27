// src/pages/AddHotel.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddHotel({ language }) {
  const navigate = useNavigate();
  const [hotel, setHotel] = useState({
    name: "",
    location: "",
    description: "",
    starRating: 3,
    amenities: {
      pool: false,
      spa: false,
      gym: false,
      restaurant: false,
      wifi: false,
    },
    rooms: [],
    images: [],
  });

  const [room, setRoom] = useState({
    name: "",
    type: "",
    price: "",
    beds: 1,
    maxGuests: 1,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenitiesChange = (amenity) => {
    setHotel((prev) => ({
      ...prev,
      amenities: { ...prev.amenities, [amenity]: !prev.amenities[amenity] },
    }));
  };

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoomImages = (e) => {
    setRoom((prev) => ({ ...prev, images: [...e.target.files] }));
  };

  const handleHotelImages = (e) => {
    setHotel((prev) => ({ ...prev, images: [...e.target.files] }));
  };

  const addRoom = () => {
    if (!room.name || !room.type || !room.price) return alert("Please fill all room fields!");
    setHotel((prev) => ({ ...prev, rooms: [...prev.rooms, room] }));
    setRoom({ name: "", type: "", price: "", beds: 1, maxGuests: 1, images: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", hotel.name);
      formData.append("location", hotel.location);
      formData.append("description", hotel.description);
      formData.append("starRating", hotel.starRating);
      formData.append("amenities", JSON.stringify(hotel.amenities));
      formData.append("rooms", JSON.stringify(hotel.rooms.map(r => ({ ...r, images: undefined }))));

      hotel.images.forEach((img) => formData.append("images", img));
      hotel.rooms.forEach((r, i) => {
        if (r.images && r.images.length > 0) {
          r.images.forEach((img) => formData.append(`roomImages_${i}`, img));
        }
      });

      await axios.post("http://localhost:5000/api/hotels", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Hotel added successfully!");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add hotel.");
    }
  };

  const facilityImages = {
    pool: "http://localhost:5000/uploads/pool.jpg",
    spa: "http://localhost:5000/uploads/spa.jpg",
    gym: "http://localhost:5000/uploads/gym.jpg",
    restaurant: "http://localhost:5000/uploads/restaurant.jpg",
    wifi: "http://localhost:5000/uploads/wifi.jpg",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url("http://localhost:5000/uploads/1762248400711-tour1.jpg") center/cover no-repeat`,
        padding: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={titleStyle}>{language === "en" ? "Add Hotel" : "ሆቴል ያክሉ"}</h2>

        {/* Hotel Info */}
        <input placeholder="Hotel Name" name="name" value={hotel.name} onChange={handleChange} style={inputStyle} required />
        <input placeholder="Location / Address" name="location" value={hotel.location} onChange={handleChange} style={inputStyle} required />
        <textarea placeholder="Description" name="description" value={hotel.description} onChange={handleChange} style={textAreaStyle} />

        <label style={{ color: "#fff" }}>Star Rating:</label>
        <input type="number" name="starRating" value={hotel.starRating} min={1} max={5} onChange={handleChange} style={inputStyle} />

        <label style={{ color: "#fff", marginTop: 10 }}>Amenities:</label>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 15 }}>
          {Object.keys(hotel.amenities).map((amenity) => (
            <div key={amenity} style={{ textAlign: "center", cursor: "pointer" }} onClick={() => handleAmenitiesChange(amenity)}>
              <img src={facilityImages[amenity]} alt={amenity} style={{ width: 50, height: 50, borderRadius: 8, objectFit: "cover", border: hotel.amenities[amenity] ? "2px solid teal" : "2px solid #fff" }} />
              <div style={{ color: "#fff", fontSize: 12, marginTop: 4 }}>{amenity.toUpperCase()}</div>
            </div>
          ))}
        </div>

        <label style={{ color: "#fff" }}>Hotel Images:</label>
        <input type="file" multiple accept="image/*" onChange={handleHotelImages} style={inputStyle} />

        {/* Rooms */}
        <h3 style={{ color: "#fff", marginTop: 20 }}>Rooms</h3>
        <input placeholder="Room Name" name="name" value={room.name} onChange={handleRoomChange} style={inputStyle} />
        <input placeholder="Type (Deluxe, Suite...)" name="type" value={room.type} onChange={handleRoomChange} style={inputStyle} />
        <input placeholder="Price" type="number" name="price" value={room.price} onChange={handleRoomChange} style={inputStyle} />
        <input placeholder="Beds" type="number" name="beds" value={room.beds} onChange={handleRoomChange} style={inputStyle} />
        <input placeholder="Max Guests" type="number" name="maxGuests" value={room.maxGuests} onChange={handleRoomChange} style={inputStyle} />
        <input type="file" multiple accept="image/*" onChange={handleRoomImages} style={inputStyle} />
        <button type="button" onClick={addRoom} style={roomButtonStyle}>➕ Add Room</button>

        {hotel.rooms.length > 0 && (
          <div style={{ marginTop: 15, color: "#fff" }}>
            <h4>Added Rooms:</h4>
            <ul>
              {hotel.rooms.map((r, i) => (
                <li key={i}>{r.name} - {r.type} - ${r.price} - Images: {r.images.length}</li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" style={submitButtonStyle}>Submit Hotel</button>
      </form>
    </div>
  );
}

// Styles
const formStyle = { background: "rgba(0,0,0,0.75)", padding: 25, borderRadius: 14, maxWidth: 700, width: "100%", color: "#fff", boxShadow: "0 12px 30px rgba(0,0,0,0.5)" };
const inputStyle = { width: "100%", padding: 10, marginBottom: 10, borderRadius: 8, border: "none", boxSizing: "border-box" };
const textAreaStyle = { width: "100%", padding: 10, marginBottom: 10, borderRadius: 8, border: "none", minHeight: 60 };
const roomButtonStyle = { padding: 10, marginBottom: 15, background: "teal", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" };
const submitButtonStyle = { padding: 12, background: "orange", color: "#fff", border: "none", borderRadius: 8, fontWeight: "bold", cursor: "pointer", marginTop: 10 };
const titleStyle = { textAlign: "center", color: "#fff", marginBottom: 25, textShadow: "2px 2px 5px rgba(0,0,0,0.7)" };
