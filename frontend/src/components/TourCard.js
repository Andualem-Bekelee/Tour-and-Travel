import React from "react";

const TourCard = ({ tour }) => {
  let firstImage = "";

  if (tour.photo) {
    if (typeof tour.photo === "string") {
      firstImage = tour.photo.split(",")[0]; // handle comma-separated images
    } else if (Array.isArray(tour.photo) && tour.photo.length > 0) {
      firstImage = tour.photo[0]; // handle array of images
    }
  }

  const imageUrl = firstImage.startsWith("http")
    ? firstImage
    : `${API_URL}uploads/${firstImage}`;

  return (
    <div className="tour-card border p-4 rounded shadow hover:shadow-lg transition">
      <img
        src={imageUrl}
        alt={tour.title}
        className="w-full h-48 object-cover rounded mb-2"
      />
      <h2 className="font-bold text-lg">{tour.title}</h2>
      <p className="text-gray-600">{tour.description}</p>
    </div>
  );
};

export default TourCard;
