import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDiscount() {
  const [discount, setDiscount] = useState("");
  const [discountId, setDiscountId] = useState("");

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const res = await axios.get(`${API_URL}discount`);
        if (res.data) {
          setDiscount(res.data.value);
          setDiscountId(res.data._id);
        }
      } catch (err) {
        alert("Failed to fetch discount.");
      }
    };
    fetchDiscount();
  }, []);

  const handleUpdate = async () => {
    if (!discountId) return alert("No discount record found to update.");
    try {
      await axios.put(`${API_URL}discount/${discountId}`, { value: discount });
      alert("Discount updated!");
    } catch (err) {
      alert("Failed to update discount.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>Update Discount</h2>
      <input
        type="text"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        placeholder="e.g., 20% off"
        style={{ padding: 10, width: "100%", marginBottom: 10, borderRadius: 5 }}
      />
      <button
        onClick={handleUpdate}
        style={{ padding: 10, width: "100%", borderRadius: 5, background: "teal", color: "#fff", fontWeight: "bold" }}
      >
        Update
      </button>
    </div>
  );
}

export default AdminDiscount;
