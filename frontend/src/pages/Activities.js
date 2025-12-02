// src/pages/Activities.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Activities = ({ language }) => {
  const backendUrl = "http://localhost:5000"; // Backend URL for images
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const sampleActivities = [
      { title: "City Historical Walking Tour", description: "Stroll through ancient streets and discover local history.", image: "banner24.png" },
      { title: "Mountain Hiking Adventure", description: "Explore scenic trails and enjoy breathtaking views.", image: "banner25.png" },
      { title: "River Rafting Experience", description: "Feel the adrenaline of rafting through pristine rivers.", image: "banner26.png" },
      { title: "Cultural Village Visit", description: "Engage with local communities and experience traditional customs.", image: "banner27.png" },
      { title: "Safari Wildlife Excursion", description: "Spot exotic wildlife in their natural habitat.", image: "banner28.png" },
      { title: "Evening Cultural Show", description: "Enjoy live music, dance performances, and traditional cuisine.", image: "banner29.png" },
      { title: "Island Boat Trip", description: "Relax on a scenic boat tour and explore nearby islands.", image: "banner30.png" },
      { title: "Photography Tour", description: "Capture stunning landscapes and cultural landmarks.", image: "banner31.png" },
      { title: "Adventure Zipline", description: "Soar through the treetops and experience thrilling zipline adventures.", image: "banner5.png" },
      { title: "Food Tasting Experience", description: "Sample local delicacies and learn traditional cooking methods.", image: "banner33.png" },
      { title: "Night Stargazing Tour", description: "Marvel at the night sky with guided telescopes.", image: "banner34.png" },
    ];

    setActivities(sampleActivities);
  }, [language]);

  return (
    <div className="min-h-screen font-poppins bg-gray-100">
      <Navbar />

      {/* Hero section */}
      <div
        className="w-full h-96 flex items-center justify-center text-white text-4xl font-bold bg-cover bg-center"
        style={{ backgroundImage: `url(${backendUrl}/uploads/banner24.png)` }}
      >
        {language === "en" ? "Our Activities" : "እንቅስቃሴዎች"}
      </div>

      {/* Activities Grid */}
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden group">
            {/* Image as background */}
            <div
              className="w-full h-64 bg-cover bg-center rounded-t-xl"
              style={{ backgroundImage: `url(${backendUrl}/uploads/${activity.image})` }}
            ></div>

            {/* Text under image as link */}
            <div className="p-4 flex flex-col gap-2">
              <a
                href="#"
                className="text-xl font-semibold text-gray-800 hover:text-orange-500 transition"
              >
                {activity.title}
              </a>
              <a href="#" className="text-gray-600 text-sm hover:text-gray-800 transition">
                {activity.description}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
