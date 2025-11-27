import React, { useState } from "react";

const BookingForm = ({ language }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    guests: 1,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with backend API call
    alert(language === "en" ? "Booking submitted!" : "ቦኪንግ ተላከ!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {language === "en" ? "Book Your Tour" : "ጉዞዎን ያስያዙ"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder={language === "en" ? "Full Name" : "ሙሉ ስም"}
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
        required
      />

      <input
        type="email"
        name="email"
        placeholder={language === "en" ? "Email Address" : "ኢሜል አድራሻ"}
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
        required
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
        required
      />

      <input
        type="number"
        name="guests"
        min="1"
        value={formData.guests}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
      >
        {language === "en" ? "Book Now" : "አሁን ያስያዙ"}
      </button>
    </form>
  );
};

export default BookingForm;
