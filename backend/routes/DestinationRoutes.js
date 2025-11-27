import express from "express";
import Destination from "../models/destination.js";

const router = express.Router();

// GET all destinations
router.get("/", async (req, res) => {
  try {
    const data = await Destination.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching destinations" });
  }
});

// Add one destination
router.post("/", async (req, res) => {
  try {
    const newDest = await Destination.create(req.body);
    res.status(201).json(newDest);
  } catch (err) {
    res.status(500).json({ message: "Failed to add destination" });
  }
});

export default router;
