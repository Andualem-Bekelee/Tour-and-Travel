// backend/seedHotels.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Hotel from "./models/Hotel.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tour-travel";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const seedHotels = async () => {
  try {
    await Hotel.deleteMany({}); // Remove existing hotels

    const hotels = [
      {
        name: "Skylite",
        image: "/uploads/skylite.jpg",
        latitude: 9.03,
        longitude: 38.74,
        rooms: [
          { name: "room1", price: 100, image: "/uploads/skylite1.jpg" },
          { name: "room2", price: 110, image: "/uploads/skylite2.jpg" },
          { name: "room3", price: 120, image: "/uploads/skylite3.jpg" },
          { name: "room4", price: 130, image: "/uploads/skylite4.jpg" },
          { name: "room5", price: 140, image: "/uploads/skylite5.jpg" },
          { name: "room6", price: 150, image: "/uploads/skylite6.jpg" },
          { name: "room7", price: 160, image: "/uploads/skylite7.jpg" },
        ],
      },
      {
        name: "Golden Hotel",
        image: "/uploads/golden.jpg",
        latitude: 9.05,
        longitude: 38.75,
        rooms: [
          { name: "room1", price: 90, image: "/uploads/room-placeholder.jpg" },
          { name: "room2", price: 95, image: "/uploads/room-placeholder.jpg" },
          { name: "room3", price: 100, image: "/uploads/room-placeholder.jpg" },
          { name: "room4", price: 110, image: "/uploads/room-placeholder.jpg" },
          { name: "room5", price: 120, image: "/uploads/room-placeholder.jpg" },
          { name: "room6", price: 130, image: "/uploads/room-placeholder.jpg" },
          { name: "room7", price: 140, image: "/uploads/room-placeholder.jpg" },
        ],
      },
      {
        name: "Dimond",
        image: "/uploads/dimond.jpg",
        latitude: 9.07,
        longitude: 38.78,
        rooms: [
          { name: "dimond1", price: 95, image: "/uploads/dimond1.jpg" },
          { name: "dimond2", price: 115, image: "/uploads/dimond2.jpg" },
          { name: "dimond3", price: 135, image: "/uploads/dimond3.jpg" },
          { name: "dimond4", price: 150, image: "/uploads/dimond4.jpg" },
        ],
      },
    ];

    for (const hotel of hotels) {
      const newHotel = new Hotel(hotel);
      await newHotel.save();
      console.log("✅ Hotel seeded:", hotel.name);
    }

    console.log("🎉 All hotels seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedHotels();
