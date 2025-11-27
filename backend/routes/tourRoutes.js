// backend/routes/tourRoutes.js
import express from "express";
import multer from "multer";
import Tour from "../models/Tour.js";

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// GET all tours
router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to fetch tours" });
  }
});

// GET single tour by id
router.get("/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST: Add new tour (multiple images)
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const { title, description, price } = req.body;

    // Save image file names
    const imagePaths = req.files.map((file) => file.filename);

    const tour = await Tour.create({
      title,
      description,
      price,
      images: imagePaths,
    });

    res.status(201).json(tour);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add tour" });
  }
});
// SEARCH tours by destination or title
router.get("/search/:keyword", async (req, res) => {
  try {
    const keyword = req.params.keyword;

    const tours = await Tour.find({
      $or: [
        { location: { $regex: keyword, $options: "i" } },
        { title: { $regex: keyword, $options: "i" } }
      ]
    });

    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
});


export default router;
