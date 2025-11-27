import React from "react";
import { useParams } from "react-router-dom";

const tourData = [
  { id: 1, img: "banner24.png", title: "Amazing Tour 24", desc: "Full details about Tour 24", oldPrice: 300, newPrice: 114 },
  { id: 2, img: "banner19.png", title: "Amazing Tour 19", desc: "Full details about Tour 19", oldPrice: 300, newPrice: 114 },
  { id: 3, img: "banner25.png", title: "Amazing Tour 25", desc: "Full details about Tour 25", oldPrice: 250, newPrice: 99 },
  // ... add others
];

const TourDetails = () => {
  const { id } = useParams();

  const tour = tourData.find((t) => t.id === Number(id));

  if (!tour) return <h1>Tour not found</h1>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={`http://localhost:5000/uploads/${tour.img}`}
        alt={tour.title}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>

      <p className="text-gray-700 mb-4">{tour.desc}</p>

      <div className="flex items-center gap-4">
        <span className="text-gray-400 line-through text-lg">${tour.oldPrice}</span>
        <span className="text-orange-500 font-bold text-2xl">${tour.newPrice}</span>
      </div>
    </div>
  );
};

export default TourDetails;
