// src/pages/DestinationHome.js
import React from "react";
import { useParams } from "react-router-dom";

const DestinationHome = ({ language }) => {
  const { destination } = useParams();

  // You can customize this with real content per destination
  const content = {
    "Addis-Ababa": {
      title: "Welcome to Addis Ababa",
      description: "The vibrant capital city of Ethiopia.",
      image: "/images/addis.jpg", // add your image path
    },
    Lalibela: {
      title: "Explore Lalibela",
      description: "Famous for its rock-hewn churches.",
      image: "/images/lalibela.jpg",
    },
    Axum: {
      title: "Discover Axum",
      description: "Ancient city with rich history.",
      image: "/images/axum.jpg",
    },
    Gondar: {
      title: "Visit Gondar",
      description: "City of castles and culture.",
      image: "/images/gondar.jpg",
    },
    Hawassa: {
      title: "Relax in Hawassa",
      description: "Beautiful lakeside city.",
      image: "/images/hawassa.jpg",
    },
    "Dire-Dawa": {
      title: "Dire-Dawa Awaits",
      description: "A mix of modern and traditional Ethiopia.",
      image: "/images/diredawa.jpg",
    },
    Harar: {
      title: "Historic Harar",
      description: "Ancient walled city full of culture.",
      image: "/images/harar.jpg",
    },
  };

  const destinationContent = content[destination] || {
    title: destination,
    description: "Explore this amazing destination!",
    image: "/images/default.jpg",
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">
        {language === "en" ? destinationContent.title : "የተመረጠ መዳረሻ"}
      </h1>
      <p className="text-lg mb-6 text-center">
        {language === "en" ? destinationContent.description : "እንኳን ወደ ዚህ መዳረሻ በደህና መጡ"}
      </p>
      <div className="flex justify-center">
        <img
          src={destinationContent.image}
          alt={destinationContent.title}
          className="rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>

      {/* Optional: add more sections like tours, activities, etc. */}
    </div>
  );
};

export default DestinationHome;
