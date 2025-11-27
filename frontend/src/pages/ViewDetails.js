import React from "react";
import { useLocation, Link } from "react-router-dom";

const ViewDetailsPage = () => {
  const location = useLocation();
  const { tour } = location.state || {}; // get data passed from Destination page

  if (!tour) {
    return <p className="p-6 text-center text-red-500">No tour data found!</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-24">
      {/* Back Button */}
      <Link
        to="/destination"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Destination
      </Link>

      {/* Banner Image */}
      <img
        src={`http://localhost:5000/uploads/${tour.img}`}
        alt={tour.title}
        className="w-full h-64 object-cover rounded-xl shadow-lg mb-6"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">{tour.title}</h1>

      {/* Full Details */}
      <p className="text-gray-700 mb-4">
        This is the full details page for <strong>{tour.title}</strong>.
        You can add a full description, highlights, itinerary, schedule, reviews, or any other info here.
      </p>

      {/* Prices */}
      <div className="flex items-center gap-4 text-lg">
        <span className="line-through text-gray-400">${tour.oldPrice}</span>
        <span className="text-orange-500 font-bold">${tour.newPrice}</span>
      </div>

      {/* Extra Sections */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Highlights</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Customizable itineraries</li>
          <li>Experienced guides</li>
          <li>Flexible dates & pricing</li>
        </ul>
      </div>
    </div>
  );
};

export default ViewDetailsPage;
