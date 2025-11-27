// backend/routes/hotels.js
import express from "express";
import Hotel from "../models/Hotel.js";
const router = express.Router();

// Add hotel
router.post("/", async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
