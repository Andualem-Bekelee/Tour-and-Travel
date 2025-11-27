// src/components/Footer.js
import React from "react";

const Footer = ({ language = "en" }) => {
  return (
    <footer className="bg-blue-600 text-white py-6 mt-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} TravelGo. {language === "en" ? "All rights reserved." : "ሁሉም መብቶች የተጠበቁ።"}</p>
        <div className="mt-3 flex justify-center gap-4">
          <a href="#" className="hover:underline">Facebook</a>
          <a href="#" className="hover:underline">Instagram</a>
          <a href="#" className="hover:underline">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
