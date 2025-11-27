// src/pages/InfoDetail.js
import React from "react";
import { useLocation } from "react-router-dom";

const InfoDetail = () => {
  const location = useLocation();
  const hash = location.hash.replace("#", "");

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tour Detail Info</h1>

      {hash === "duration" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Duration</h2>
          <p>Typical tour duration is 3 days and 2 nights.</p>
        </div>
      )}

      {hash === "language" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Languages</h2>
          <p>The tour is available in English, Amharic, and French.</p>
        </div>
      )}

      {hash === "age-group" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Age Group</h2>
          <p>Recommended for ages 5 to 65 years.</p>
        </div>
      )}

      {hash === "group-size" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Group Size</h2>
          <p>Minimum 2 people, maximum 20 people per group.</p>
        </div>
      )}

      {!["duration", "language", "age-group", "group-size"].includes(hash) && (
        <p>Select an info category from the previous page.</p>
      )}
    </div>
  );
};

export default InfoDetail;
