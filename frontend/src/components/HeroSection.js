// src/components/HeroSection.js
import React, { useState } from "react";
import { Link } from "react-router-dom"; // <- For SPA links

const HeroSection = ({ language = "en" }) => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [tourType, setTourType] = useState("");

  const handleSearch = () => {
    console.log({ destination, date, tourType });
  };

  return (
    <div className="relative w-full mt-16">
      {/* Banner Image */}
      <div className="w-full h-48 md:h-60 relative">
        <img
          src="http://localhost:5000/uploads/banner2.jpg"
          alt="Banner"
          className="w-full h-full object-cover rounded-b-lg"
        />
        <div className="absolute inset-0 bg-black/25 rounded-b-lg"></div>

        {/* Banner Title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-extrabold text-white text-center
            bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent px-4
            opacity-0 animate-fadeIn">
            {language === "en"
              ? "Life Is Adventure! Make The Best Of It"
              : "ኢትዮጵያን እና ውጪን ያሳዩ"}
          </h1>
        </div>

        {/* Search Panel */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2
          w-11/12 max-w-6xl bg-white rounded-full shadow-lg p-4
          flex flex-col md:flex-row gap-4 items-center">

          <input
            type="text"
            placeholder={language === "en" ? "Where" : "የሚሄዱበት ቦታ"}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
          />

          <input
            type="date"
            placeholder={language === "en" ? "When" : "መቀመጫ ቀን"}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
          />

          <select
            value={tourType}
            onChange={(e) => setTourType(e.target.value)}
            className={`flex-1 px-4 py-2 rounded-full border focus:outline-none ${
              tourType === "nature"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            <option value="">{language === "en" ? "All Tours" : "ሁሉም ጉብኝቶች"}</option>
            <option value="adventure">{language === "en" ? "Adventure" : "አድቨንቸር"}</option>
            <option value="cultural">{language === "en" ? "Cultural" : "ባህላዊ"}</option>
            <option value="nature">{language === "en" ? "Nature" : "ተፈጥሮ"}</option>
          </select>

          <button
            onClick={handleSearch}
            className="flex items-center px-6 py-2 bg-orange-500 text-white font-semibold rounded-full gap-2"
          >
            {language === "en" ? "Search" : "ፈልግ"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Example “See All” Link Section */}
      <div className="max-w-6xl mx-auto mt-24 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Popular Things To Do</h2>
          <Link
            to="/tours"
            className="text-orange-500 font-semibold hover:underline text-sm md:text-base"
          >
            See All
          </Link>
        </div>
        {/* Add your images grid here */}
      </div>

      {/* Tailwind animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default HeroSection;
