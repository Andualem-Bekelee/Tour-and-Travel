// src/pages/AdminHotels.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminHotels() {
  const [hotels, setHotels] = useState([]);
  const [hotelData, setHotelData] = useState({ name: "", image: "", latitude: "", longitude: "" });
  const [roomData, setRoomData] = useState({ name: "", price: "", image: "" });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    const res = await axios.get("http://localhost:5000/api/hotels");
    setHotels(res.data);
  };

  const handleHotelChange = (e) => setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  const handleRoomChange = (e) => setRoomData({ ...roomData, [e.target.name]: e.target.value });

  const addHotel = async () => {
    await axios.post("http://localhost:5000/api/hotels", hotelData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
    });
    setHotelData({ name: "", image: "", latitude: "", longitude: "" });
    fetchHotels();
  };

  const addRoom = async (hotelId) => {
    await axios.post(`http://localhost:5000/api/hotels/${hotelId}/rooms`, roomData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
    });
    setRoomData({ name: "", price: "", image: "" });
    fetchHotels();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add New Hotel</h2>
      <input placeholder="Hotel Name" name="name" value={hotelData.name} onChange={handleHotelChange} />
      <input placeholder="Image URL" name="image" value={hotelData.image} onChange={handleHotelChange} />
      <input placeholder="Latitude" name="latitude" value={hotelData.latitude} onChange={handleHotelChange} />
      <input placeholder="Longitude" name="longitude" value={hotelData.longitude} onChange={handleHotelChange} />
      <button onClick={addHotel}>Add Hotel</button>

      <hr />

      <h2>Hotels & Rooms</h2>
      {hotels.map((hotel) => (
        <div key={hotel._id} style={{ border: "1px solid #ddd", margin: "10px 0", padding: 10 }}>
          <h3>{hotel.name}</h3>
          <img src={hotel.image} alt={hotel.name} width={200} />
          <h4>Rooms</h4>
          {hotel.rooms.map((room) => (
            <div key={room._id}>
              {room.name} - ${room.price} <img src={room.image} alt={room.name} width={100} />
            </div>
          ))}

          <input placeholder="Room Name" name="name" value={roomData.name} onChange={handleRoomChange} />
          <input placeholder="Price" name="price" value={roomData.price} onChange={handleRoomChange} />
          <input placeholder="Image URL" name="image" value={roomData.image} onChange={handleRoomChange} />
          <button onClick={() => addRoom(hotel._id)}>Add Room</button>
        </div>
      ))}
    </div>
  );
}
