// src/components/ToursList.js
import React from "react";
import TourCard from "./TourCard";

const toursData = [
  {
    id: 1,
    title: "Paris City Tour",
    description: "Explore the city of love with expert guides.",
    price: 499,
    image: "https://source.unsplash.com/400x300/?paris",
  },
  {
    id: 2,
    title: "Safari Adventure",
    description: "Experience the wildlife up close in Africa.",
    price: 899,
    image: "https://source.unsplash.com/400x300/?safari",
  },
  {
    id: 3,
    title: "Beach Paradise",
    description: "Relax on the most beautiful beaches.",
    price: 699,
    image: "https://source.unsplash.com/400x300/?beach",
  },
];

const ToursList = () => {
  return (
    <section className="py-16 px-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">Featured Tours</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {toursData.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
};

export default ToursList;
