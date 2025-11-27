// src/pages/Bookings.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Unable to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
      alert("✅ Booking deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete booking.");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading bookings...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `url("http://localhost:5000/uploads/skylite.jpg") center/cover no-repeat`,
        padding: 20,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.95)",
          padding: 20,
          borderRadius: 15,
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>All Bookings</h2>

        {bookings.length === 0 ? (
          <p style={{ textAlign: "center" }}>No bookings yet.</p>
        ) : (
          <table
            border="1"
            cellPadding="8"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead style={{ backgroundColor: "#007b7f", color: "white" }}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Arrival</th>
                <th>Nights</th>
                <th>Guests</th>
                <th>Total Price</th>
                <th>Special Requests</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.name}</td>
                  <td>{b.email || "-"}</td>
                  <td>{b.phone || "-"}</td>
                  <td>
                    {b.hotelId?.name || "-"}
                    {b.hotelId?.image && (
                      <img
                        src={`http://localhost:5000${b.hotelId.image}`}
                        alt={b.hotelId.name}
                        style={{ width: 80, height: 50, objectFit: "cover", display: "block", marginTop: 5, borderRadius: 5 }}
                      />
                    )}
                  </td>
                  <td>
                    {b.roomId?.name || "-"}
                    {b.roomId?.image && (
                      <img
                        src={`http://localhost:5000${b.roomId.image}`}
                        alt={b.roomId.name}
                        style={{ width: 80, height: 50, objectFit: "cover", display: "block", marginTop: 5, borderRadius: 5 }}
                      />
                    )}
                  </td>
                  <td>{new Date(b.arrivalDate).toLocaleDateString()}</td>
                  <td>{b.nights}</td>
                  <td>{b.totalGuests}</td>
                  <td>${b.totalPrice}</td>
                  <td>{b.specialRequests || "-"}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(b._id)}
                      style={{
                        padding: "5px 10px",
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: 5,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Bookings;
