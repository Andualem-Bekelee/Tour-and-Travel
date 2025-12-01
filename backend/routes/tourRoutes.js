// import express from "express";
// import {
//   createTour,
//   getTours,
//   getTour,
//   updateTour,
//   deleteTour,
// } from "../controllers/tourController.js";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";
// import { uploadTourImages } from "../middleware/uploadMiddleware.js";

// const router = express.Router();

// // Public
// router.get("/", getTours);
// router.get("/:id", getTour);

// // Admin
// router.post("/", protect, adminOnly, uploadTourImages.array("images"), createTour);
// router.put("/:id", protect, adminOnly, uploadTourImages.array("images"), updateTour);
// router.delete("/:id", protect, adminOnly, deleteTour);


// export default router;

import express from "express";
import {
  createTour,
  updateTour,
  deleteTour,
  getTours,
  getTourById,
  searchTours,
} from "../controllers/tourController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getTours);
router.get("/search", searchTours);
router.get("/:id", getTourById);

// Admin
router.post("/", protect, adminOnly, createTour);
router.put("/:id", protect, adminOnly, updateTour);
router.delete("/:id", protect, adminOnly, deleteTour);

export default router;
