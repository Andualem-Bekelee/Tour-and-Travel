// backend/routes/hotelsRoutes.js
import express from "express";
import Hotel from "../models/Hotel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/hotels";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// GET all hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

// POST new hotel with multiple images and rooms
router.post("/", upload.fields([
  { name: "images", maxCount: 10 },       // hotel images
  { name: /.*/, maxCount: 5 },           // dynamic for room images: roomImages_0, roomImages_1...
]), async (req, res) => {
  try {
    const { name, location, description, starRating, amenities, rooms } = req.body;

    const hotel = new Hotel({
      name,
      location,
      description,
      starRating,
      amenities: JSON.parse(amenities),
      rooms: JSON.parse(rooms),
      images: req.files["images"] ? req.files["images"].map(f => "/uploads/hotels/" + f.filename) : [],
    });

    // Attach uploaded room images
    if (hotel.rooms.length > 0) {
      hotel.rooms = hotel.rooms.map((room, i) => {
        const roomKey = `roomImages_${i}`;
        if (req.files[roomKey]) {
          room.images = req.files[roomKey].map(f => "/uploads/hotels/" + f.filename);
        }
        return room;
      });
    }

    await hotel.save();
    res.status(201).json(hotel);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
