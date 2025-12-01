import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Import DB connection
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import {seedAdmin} from "./seeder/seed.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import hotelsRoutes from "./routes/hotelsRoutes.js";
import discountRoutes from "./routes/Discount.js"; // Capital D
import destinationRoutes from "./routes/DestinationRoutes.js";

dotenv.config();
connectDB(); // connect to MongoDB

// Run seeder safely, not as middleware
seedAdmin().catch((err) => console.error("Seeder error:", err));

const app = express();

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/discount", discountRoutes);
app.use("/api/destinations", destinationRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Tour & Travel API is running!");
});



// 🔹 Error Handler Middleware (keep last)
app.use(errorHandler);


// Server startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
