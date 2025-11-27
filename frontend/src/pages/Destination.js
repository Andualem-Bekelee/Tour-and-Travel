// src/pages/Destination.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Destination = () => {
  const [date, setDate] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showFilter, setShowFilter] = useState({
    Duration: false,
    Language: false,
    Rating: false,
    Specials: false,
  });

  const tourTypes = [
    "Adventure",
    "Cultural",
    "Nature",
    "Relaxation",
    "Hiking",
    "Wildlife",
  ];

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const banners = [
    { img: "banner24.png", title: "Amazing Tour 24", oldPrice: 300, newPrice: 114 },
    { img: "banner19.png", title: "Amazing Tour 19", oldPrice: 300, newPrice: 114 },
    { img: "banner25.png", title: "Amazing Tour 25", oldPrice: 250, newPrice: 99 },
    { img: "banner26.png", title: "Amazing Tour 26", oldPrice: 280, newPrice: 120 },
    { img: "banner27.png", title: "Amazing Tour 27", oldPrice: 320, newPrice: 150 },
    { img: "banner28.png", title: "Amazing Tour 28", oldPrice: 310, newPrice: 140 },
  ];

  return (
    <div className="relative min-h-screen p-4 md:p-8">
      
      {/* Header */}
      <div className="mt-24 md:mt-32">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 md:mb-6">
          Explore all things in to bucket
        </h1>

        {/* Top Search Bar */}
        <div className="w-full max-w-6xl mx-auto mb-6">
          <div className="flex items-center gap-2 bg-white rounded-full shadow-md px-4 py-2 border border-gray-300">
            <input
              type="text"
              placeholder="Search for tours, destinations..."
              className="flex-1 text-gray-700 text-sm md:text-base focus:outline-none rounded-full"
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-600 transition">
              Search
            </button>
          </div>
        </div>

        {/* Main Left + Right Layout */}
        <div className="w-full md:flex gap-4 mb-6 md:mb-8">
          {/* Left Panel: Date + Tour Types */}
          <div className="w-full md:w-80 flex flex-col gap-0">
            {/* Orange Date Panel */}
            <div className="bg-orange-500 rounded-2xl shadow-lg p-4">
              <div className="flex flex-col gap-1">
                <span className="text-white font-semibold text-sm md:text-base">
                  When are you traveling?
                </span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-gray-800 focus:outline-none text-sm md:text-base"
                />
              </div>
            </div>

            {/* Tour Type Header */}
            <h2 className="text-gray-900 font-extrabold text-lg md:text-xl mb-2 md:mb-3 mt-2">
              Tour Type
            </h2>

            {/* Tour Type Box */}
            <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-2 mt-0">
              {[...tourTypes, "See more"].map((type, index) => {
                const isSelected = selectedTypes.includes(type);
                const isSeeMore = type === "See more";

                return (
                  <div
                    key={index}
                    onClick={() => toggleType(type)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm md:text-base ${
                      isSelected ? "bg-orange-100 border-orange-400" : "border-gray-300"
                    }`}
                  >
                    {/* Tick box */}
                    <div
                      className={`w-5 h-5 flex items-center justify-center border rounded-sm ${
                        isSelected
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    {/* Text */}
                    <span
                      className={`${
                        isSeeMore
                          ? "text-blue-500 font-semibold"
                          : isSelected
                          ? "font-semibold text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      {type}
                    </span>
                  </div>
                );
              })}

              {selectedTypes.includes("See more") && (
                <div className="flex flex-col gap-2 mt-2 pl-6">
                  <a href="#" className="text-gray-700 text-sm hover:underline">
                    Adventure Plus
                  </a>
                  <a href="#" className="text-gray-700 text-sm hover:underline">
                    Cultural Experience
                  </a>
                  <a href="#" className="text-gray-700 text-sm hover:underline">
                    Nature Explorer
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Banners + Description + Tour Card */}
          <div className="flex-1 flex flex-col gap-6">
            {banners.map((tour, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start gap-4">
                {/* Banner */}
                <img
                  src={`http://localhost:5000/uploads/${tour.img}`}
                  alt={tour.title}
                  className="w-full md:w-64 h-40 object-cover rounded-2xl shadow-lg"
                />

                {/* Description */}
                <div className="flex-1 bg-white rounded-2xl shadow-lg p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tour.title}</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Explore the best destinations with tailored tours and unforgettable experiences.
                  </p>
                  <ul className="text-gray-700 text-sm list-disc list-inside">
                    <li>Customizable itineraries</li>
                    <li>Experienced guides</li>
                    <li>Flexible dates & pricing</li>
                  </ul>

                  {/* Links */}
                  <div className="flex gap-4 mt-2">
                    <a href="#" className="text-orange-500 font-semibold text-sm hover:underline">
                      Best Price Guarantees
                    </a>
                    <a href="#" className="text-blue-500 font-semibold text-sm hover:underline">
                      Free Cancellation
                    </a>
                  </div>
                </div>

                {/* Tour Card with View Details Link */}
                <div className="w-full md:w-64 bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tour.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400 line-through">${tour.oldPrice}</span>
                    <span className="text-orange-500 font-bold">${tour.newPrice}</span>
                  </div>
   <Link
  to="/destination-details"
  state={{ tour }} // pass the tour object
  className="bg-orange-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-orange-600 transition"
>
  View Details
</Link>


                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter by Price */}
        <div
          onClick={() => setShowPriceFilter(!showPriceFilter)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 cursor-pointer text-sm md:text-base bg-white mt-4 w-full md:w-80"
        >
          <span className="text-gray-700 font-semibold">Filter by Price</span>
        </div>
        {showPriceFilter && (
          <div className="mt-2 bg-white rounded-2xl shadow-lg p-4 w-full md:w-80">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Min:</span>
                <input
                  type="number"
                  placeholder="0"
                  className="w-20 px-2 py-1 border rounded-lg text-sm focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Max:</span>
                <input
                  type="number"
                  placeholder="1000"
                  className="w-20 px-2 py-1 border rounded-lg text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Other Filters */}
        {["Duration", "Language", "Rating", "Specials"].map((filter) => (
          <div key={filter} className="mt-2">
            <div
              onClick={() =>
                setShowFilter((prev) => ({ ...prev, [filter]: !prev[filter] }))
              }
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 cursor-pointer text-sm md:text-base bg-white w-full md:w-80"
            >
              <span className="text-gray-700 font-semibold">{filter}</span>
            </div>

            {showFilter[filter] && (
              <div className="mt-2 bg-white rounded-2xl shadow-lg p-4 w-full md:w-80">
                {filter === "Duration" && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700">Select Duration:</label>
                    <input
                      type="number"
                      placeholder="Days"
                      className="w-20 px-2 py-1 border rounded-lg text-sm focus:outline-none"
                    />
                  </div>
                )}
                {filter === "Language" && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700">Select Language:</label>
                    <select className="px-2 py-1 border rounded-lg text-sm focus:outline-none">
                      <option>English</option>
                      <option>Amharic</option>
                      <option>French</option>
                    </select>
                  </div>
                )}
                {filter === "Rating" && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700">Minimum Rating:</label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      placeholder="0-5"
                      className="w-20 px-2 py-1 border rounded-lg text-sm focus:outline-none"
                    />
                  </div>
                )}
                {filter === "Specials" && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700">Special Offers:</label>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id={`special-${filter}-1`} className="mr-2" />
                      <label htmlFor={`special-${filter}-1`} className="text-gray-700 text-sm">
                        Discount
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id={`special-${filter}-2`} className="mr-2" />
                      <label htmlFor={`special-${filter}-2`} className="text-gray-700 text-sm">
                        Free Meal
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

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
            {/* About */}
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

            {/* Support */}
            <div className="flex flex-col gap-2">
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="text-gray-700 text-sm flex flex-col gap-2">
                <li><a href="/get-in-tour" className="hover:text-orange-500">Get in Tour</a></li>
                <li><a href="/help-center" className="hover:text-orange-500">Help Center</a></li>
                <li><a href="/livechat" className="hover:text-orange-500">Live Chat</a></li>
                <li><a href="/how-it-works" className="hover:text-orange-500">How it Works</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col gap-2">
              <h3 className="font-bold mb-4">Newsletter</h3>
              <p className="text-gray-700 text-sm mb-2">Subscribe to the free newsletter and stay up-to-date:</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input type="email" placeholder="Your email address" className="flex-1 px-3 py-2 rounded-md text-gray-800 focus:outline-none" />
                <button className="bg-orange-500 px-4 py-2 rounded-md font-semibold hover:bg-orange-600">Send</button>
              </div>
            </div>

            {/* Mobile App */}
            <div className="flex flex-col gap-2">
              <h3 className="font-bold mb-4">Mobile App</h3>
              <ul className="text-gray-700 text-sm flex flex-col gap-2">
                <li><a href="/ios-app" className="hover:text-orange-500">iOS App</a></li>
                <li><a href="/android-app" className="hover:text-orange-500">Android App</a></li>
              </ul>
            </div>
          </div>

          {/* Payment */}
          <div className="max-w-6xl mx-auto px-4 mt-4 flex flex-wrap justify-center items-center gap-6 text-gray-700 text-sm">
            <span className="flex items-center gap-2"><i className="fab fa-cc-visa text-xl"></i> <a href="/payment/visa" className="hover:text-orange-500">Visa</a></span>
            <span className="flex items-center gap-2"><i className="fab fa-cc-mastercard text-xl"></i> <a href="/payment/card" className="hover:text-orange-500">Card</a></span>
            <span className="flex items-center gap-2"><i className="fab fa-cc-paypal text-xl"></i> <a href="/payment/paypal" className="hover:text-orange-500">PayPal</a></span>
            <span className="flex items-center gap-2"><i className="fas fa-money-bill-wave text-xl"></i> <a href="/payment/santim" className="hover:text-orange-500">Santim Pay</a></span>
          </div>

          {/* Bottom Bar */}
          <div className="w-full text-gray-500 text-sm py-4 text-center border-t border-gray-200">
            &copy; {new Date().getFullYear()} Viatour. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Destination;
