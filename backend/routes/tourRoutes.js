import express from "express";
import {
  createTour,
  getTours,
  getTourById,
  updateTour,
  deleteTour,
  searchTours
} from "../controllers/tourController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import multer from "multer";

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/tours/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router();

// ================================
// Public Routes
// ================================
router.get("/", getTours);
router.get("/search", searchTours);
router.get("/:id", getTourById);

// ================================
// Admin Routes
// ================================
router.post("/", protect, adminOnly, upload.array("images"), createTour);
router.put("/:id", protect, adminOnly, upload.array("images"), updateTour);
router.delete("/:id", protect, adminOnly, deleteTour);

export default router;
