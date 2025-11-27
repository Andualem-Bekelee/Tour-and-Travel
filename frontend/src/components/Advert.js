// src/components/Advert.js
import React from "react";
import { Link } from "react-router-dom";

const Advert = ({ language = "en" }) => {
  return (
    <div className="max-w-xs bg-white/90 text-gray-800 rounded-xl p-4 shadow-lg">
      <h4 className="font-bold mb-1">{language === "en" ? "Special Offer" : "ልዩ ዕድል"}</h4>
      <p className="text-sm mb-3">{language === "en" ? "20% off selected tours this month." : "በዚህ ወር ከ20% ቅናሽ"}</p>
      <Link to="/tours" className="inline-block px-3 py-2 bg-red-500 text-white rounded">
        {language === "en" ? "Explore" : " ፈልግ"}
      </Link>
    </div>
  );
};

export default Advert;
