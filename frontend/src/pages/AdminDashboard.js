// src/pages/AdminDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard({ language }) {
  const [tours, setTours] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTours();
    fetchHotels();
    fetchBookings();
    fetchUsers();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tours");
      setTours(res.data);
    } catch (err) {
      console.error("Error fetching tours:", err);
    }
  };

  const fetchHotels = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/hotels");
      setHotels(res.data);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleDeleteTour = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tours/${id}`);
      alert("✅ Tour deleted successfully!");
      fetchTours();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete tour.");
    }
  };

  const handleDeleteHotel = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/hotels/${id}`);
      alert("✅ Hotel deleted successfully!");
      fetchHotels();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete hotel.");
    }
  };

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "'Poppins', sans-serif",
        minHeight: "100vh",
        background: `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url("http://localhost:5000/uploads/1762421067242-1762242446138-tour2.jpg") center/cover no-repeat`,
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 30, color: "#2c3e50" }}>
        {language === "en" ? "Admin Dashboard" : "አስተዳዳሪ ዳሽቦርድ"}
      </h1>

      {/* Add Buttons */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <button onClick={() => navigate("/addtour")} style={buttonStyle}>
          {language === "en" ? "➕ Add Tour" : "➕ ጉብኝት ያክሉ"}
        </button>
        <button
          onClick={() => navigate("/addhotel")}
          style={{ ...buttonStyle, background: "#ff7f50", marginLeft: 15 }}
        >
          {language === "en" ? "🏨 Add Hotel" : "🏨 ሆቴል ያክሉ"}
        </button>
      </div>

      {/* Tours Section */}
      <section style={{ marginBottom: 50 }}>
        <h2 style={sectionTitleStyle}>
          {language === "en" ? "Available Tours" : "ያሉ ጉብኝቶች"}
        </h2>
        {tours.length === 0 ? (
          <p style={{ color: "#555" }}>No tours found.</p>
        ) : (
          <div style={cardContainerStyle}>
            {tours.map((tour) => (
              <div key={tour._id} style={cardStyle}>
                <h3 style={cardTitleStyle}>{tour.title}</h3>
                <p style={cardDescStyle}>{tour.description?.slice(0, 80)}...</p>
                <p style={{ fontWeight: "bold", color: "#27ae60" }}>${tour.price}</p>
                <div style={cardButtonContainerStyle}>
                  <button
                    onClick={() => navigate(`/admin/edit/${tour._id}`)}
                    style={editButtonStyle}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTour(tour._id)}
                    style={deleteButtonStyle}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Hotels Section */}
      <section style={{ marginBottom: 50 }}>
        <h2 style={sectionTitleStyle}>{language === "en" ? "Hotels" : "ሆቴሎች"}</h2>
        {hotels.length === 0 ? (
          <p style={{ color: "#555" }}>No hotels found.</p>
        ) : (
          <div style={cardContainerStyle}>
            {hotels.map((hotel) => (
              <div key={hotel._id} style={cardStyle}>
                <h3 style={cardTitleStyle}>{hotel.name}</h3>
                <p style={cardDescStyle}>{hotel.description?.slice(0, 100)}...</p>
                <p style={{ fontWeight: "bold", color: "#ff7f50" }}>{hotel.category}</p>

                {/* Mini Image Gallery */}
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    overflowX: "auto",
                    paddingTop: 6,
                    marginBottom: 8,
                  }}
                >
                  {hotel.images && hotel.images.length > 0 ? (
                    hotel.images.map((img, i) => (
                      <img
                        key={i}
                        src={`http://localhost:5000${img}`}
                        alt={`${hotel.name} ${i + 1}`} // ESLint-compliant
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 6,
                          objectFit: "cover",
                          flexShrink: 0,
                        }}
                      />
                    ))
                  ) : (
                    <img
                      src="https://via.placeholder.com/60"
                      alt={hotel.name} // ESLint-compliant
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 6,
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>

                <div style={cardButtonContainerStyle}>
                  <button
                    onClick={() => navigate(`/admin/edithotel/${hotel._id}`)}
                    style={editButtonStyle}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteHotel(hotel._id)}
                    style={deleteButtonStyle}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bookings Section */}
      <section style={{ marginBottom: 50 }}>
        <h2 style={sectionTitleStyle}>
          {language === "en" ? "Bookings" : "ቦታ መያዣዎች"}
        </h2>
        {bookings.length === 0 ? (
          <p style={{ color: "#555" }}>No bookings yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Tour</th>
                  <th>User</th>
                  <th>People</th>
                  <th>Date</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td>{b.tour?.title}</td>
                    <td>{b.user?.name}</td>
                    <td>{b.people}</td>
                    <td>{new Date(b.date).toLocaleDateString()}</td>
                    <td>${b.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Users Section */}
      <section>
        <h2 style={sectionTitleStyle}>{language === "en" ? "Users" : "ተጠቃሚዎች"}</h2>
        {users.length === 0 ? (
          <p style={{ color: "#555" }}>No users yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;

// --- Styles ---
const buttonStyle = {
  padding: "10px 25px",
  background: "teal",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 16,
  fontWeight: "bold",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  transition: "transform 0.2s",
};
const sectionTitleStyle = { marginBottom: 15, color: "#34495e" };
const cardContainerStyle = { display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" };
const cardStyle = {
  width: 280,
  background: "rgba(255,255,255,0.95)",
  borderRadius: 12,
  padding: 15,
  boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};
const cardTitleStyle = { margin: 0, color: "#2c3e50" };
const cardDescStyle = { fontSize: 14, color: "#555" };
const cardButtonContainerStyle = { display: "flex", justifyContent: "space-between", marginTop: 10 };
const editButtonStyle = { padding: "5px 10px", background: "#3498db", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer" };
const deleteButtonStyle = { padding: "5px 10px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer" };
const tableStyle = { width: "100%", borderCollapse: "collapse", background: "rgba(255,255,255,0.95)", borderRadius: 8, overflow: "hidden" };
