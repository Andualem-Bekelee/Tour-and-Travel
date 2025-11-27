// src/pages/Activities.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// Activity card component
const ActivityCard = ({ activity }) => {
  const imageUrl = activity.image || "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform hover:scale-105 relative group">
      <img src={imageUrl} alt={activity.title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{activity.title}</h3>
        <p className="text-gray-600 mt-2">{activity.description}</p>
      </div>
      {/* Optional hover button */}
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600">
          View Details
        </button>
      </div>
    </div>
  );
};

const Activities = ({ language }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const sampleActivities = [
      {
        title: "City Historical Walking Tour",
        description: "Stroll through ancient streets and discover local history and architecture.",
        image: "/uploads/banner24.png",
      },
      {
        title: "Mountain Hiking Adventure",
        description: "Explore scenic trails and enjoy breathtaking views of the mountains.",
        image: "/uploads/banner25.png",
      },
      {
        title: "River Rafting Experience",
        description: "Feel the adrenaline of rafting through pristine rivers surrounded by nature.",
        image: "/uploads/banner26.png",
      },
      {
        title: "Cultural Village Visit",
        description: "Engage with local communities and experience traditional customs.",
        image: "/uploads/banner27.png",
      },
      {
        title: "Safari Wildlife Excursion",
        description: "Spot exotic wildlife in their natural habitat on guided safari tours.",
        image: "/uploads/banner28.png",
      },
      {
        title: "Evening Cultural Show",
        description: "Enjoy live music, dance performances, and traditional cuisine.",
        image: "/uploads/banner29.png",
      },
      {
        title: "Island Boat Trip",
        description: "Relax on a scenic boat tour and explore nearby islands.",
        image: "/uploads/banner30.png",
      },
      {
        title: "Photography Tour",
        description: "Capture stunning landscapes and cultural landmarks with expert guidance.",
        image: "/uploads/banner31.png",
      },
      {
        title: "Adventure Zipline",
        description: "Soar through the treetops and experience thrilling zipline adventures.",
        image: "/uploads/banner32.png",
      },
      {
        title: "Food Tasting Experience",
        description: "Sample local delicacies and learn about traditional cooking methods.",
        image: "/uploads/banner33.png",
      },
      {
        title: "Night Stargazing Tour",
        description: "Marvel at the night sky with guided telescopes and stories of constellations.",
        image: "/uploads/banner34.png",
      },
    ];

    setActivities(sampleActivities);
  }, [language]);

  return (
    <div className="min-h-screen font-poppins bg-gray-100">
      <Navbar />

      {/* Hero section */}
      <div
        className="w-full h-96 flex items-center justify-center text-white text-4xl font-bold bg-cover bg-center"
        style={{ backgroundImage: "url('/uploads/banner24.png')" }}
      >
        {language === "en" ? "Our Activities" : "እንቅስቃሴዎች"}
      </div>

      {/* Activities Grid */}
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity, idx) => (
          <ActivityCard key={idx} activity={activity} />
        ))}
      </div>

      {/* Footer Section */}
      <footer className="w-full mt-8" style={{ backgroundColor: "#fff8f0" }}>
        {/* Top Contact & Social */}
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-2 text-sm">
            <span className="font-semibold">Speak to our expert at</span>
            <a href="tel:+251913943958" className="text-orange-500 font-bold hover:underline">+251 913943958</a>
            <span className="hidden md:inline">| Contact: Addis Ababa</span>
          </div>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-orange-500"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-orange-500"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-orange-500"><i className="fab fa-telegram-plane"></i></a>
            <a href="#" className="hover:text-orange-500"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold mb-4">About Us</h3>
            <ul className="text-gray-700 text-sm flex flex-col gap-2">
              <li><a href="/reviews" className="hover:text-orange-500">Tourz Reviews</a></li>
              <li><a href="/contact" className="hover:text-orange-500">Contact Us</a></li>
              <li><a href="/guides" className="hover:text-orange-500">Travel Guides</a></li>
              <li><a href="/data-policy" className="hover:text-orange-500">Data Policy</a></li>
              <li><a href="/cookie-policy" className="hover:text-orange-500">Cookie Policy</a></li>
              <li><a href="/legal" className="hover:text-orange-500">Legal</a></li>
              <li><a href="/map" className="hover:text-orange-500">Set Map</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="text-gray-700 text-sm flex flex-col gap-2">
              <li><a href="/get-in-tour" className="hover:text-orange-500">Get in Tour</a></li>
              <li><a href="/help-center" className="hover:text-orange-500">Help Center</a></li>
              <li><a href="/livechat" className="hover:text-orange-500">Live Chat</a></li>
              <li><a href="/how-it-works" className="hover:text-orange-500">How it Works</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold mb-4">Newsletter</h3>
            <p className="text-gray-700 text-sm mb-2">Subscribe to the free newsletter and stay up-to-date:</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Your email address" className="flex-1 px-3 py-2 rounded-md text-gray-800 focus:outline-none" />
              <button className="bg-orange-500 px-4 py-2 rounded-md font-semibold hover:bg-orange-600">Send</button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold mb-4">Mobile App</h3>
            <ul className="text-gray-700 text-sm flex flex-col gap-2">
              <li><a href="/ios-app" className="hover:text-orange-500">iOS App</a></li>
              <li><a href="/android-app" className="hover:text-orange-500">Android App</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-4 flex flex-wrap justify-center items-center gap-6 text-gray-700 text-sm">
          <span className="flex items-center gap-2"><i className="fab fa-cc-visa text-xl"></i> <a href="/payment/visa" className="hover:text-orange-500">Visa</a></span>
          <span className="flex items-center gap-2"><i className="fab fa-cc-mastercard text-xl"></i> <a href="/payment/card" className="hover:text-orange-500">Card</a></span>
          <span className="flex items-center gap-2"><i className="fab fa-cc-paypal text-xl"></i> <a href="/payment/paypal" className="hover:text-orange-500">PayPal</a></span>
          <span className="flex items-center gap-2"><i className="fas fa-money-bill-wave text-xl"></i> <a href="/payment/santim" className="hover:text-orange-500">Santim Pay</a></span>
        </div>

        <div className="w-full text-gray-500 text-sm py-4 text-center border-t border-gray-200">
          &copy; {new Date().getFullYear()} Viatour. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Activities;
