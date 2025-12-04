// src/components/HeroSection.js

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  Search as SearchIcon,
  Calendar as CalendarIcon,
  Compass as CompassIcon,
} from "lucide-react";

const REACT_APP_BACKEND_URL = "http://192.168.158.220:5000/api";

// tourOptions stays here — OK
const tourOptions = [
  { value: "adventure", labelEn: "Adventure", labelAm: "አድቨንቸር" },
  { value: "cultural", labelEn: "Cultural", labelAm: "ባህላዊ" },
  { value: "nature", labelEn: "Nature", labelAm: "ተፈጥሮ" },
];

// ❗ Your components start here
const HeroSection = ({ language = "en" }) => {
  
const [destination, setDestination] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [date, setDate] = useState("");
  const [tourType, setTourType] = useState("");
  const [featuredTrips, setFeaturedTrips] = useState([]);
 useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${REACT_APP_BACKEND_URL}/tours`);
        const data = await res.json();
        setFeaturedTrips(data);
      } catch (err) {
        console.error("Featured trips error:", err);
      }
    };

    fetchFeatured();
  }, []);

  // ✅ SEARCH DESTINATION — CLEAN DEBOUNCE
  useEffect(() => {
    if (destination.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const debounce = setTimeout(async () => {
      try {
        const res = await fetch(
          `${REACT_APP_BACKEND_URL}/tours/search?query=${destination}`
        );
        const data = await res.json();
        setResults(data);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search error:", err);
      }
    }, 400);

    return () => clearTimeout(debounce);
  }, [destination]);

  const handleSearch = () => {
    console.log({ destination, date, tourType });
  };

  return (
  <div className="w-full flex flex-col items-center justify-center">

  <div
    className="
      w-full text-center z-8
      h-[350px] sm:h-[500px] md:h-[650px] lg:h-[800px]
      bg-center bg-cover relative
    "
    style={{
      backgroundImage: "url('http://192.168.158.220:5000/uploads/tours/1764849510224-image6.jpg')",
    }}
  >
    {/* <Navbar /> */}
    <h1
      className="
        pt-[134px]
        text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px]
        leading-[1.2]
        font-semibold font-Inter
        px-4 sm:px-10 md:px-[150px] lg:px-[300px]
        text-center
        bg-gradient-to-r from-[#EE8C61] to-[#4C43C4]
        bg-clip-text text-transparent
        z-30
      "
    >
      {language === "en"
        ? "Life Is Adventure Make The Best Of It"
        : "የተሻለውን ጉብኝት ያግኙ"}
    </h1>

   <div
  className="
    flex items-center justify-center
    py-3 my-5
    mx-4 sm:mx-[50px] md:mx-[150px] lg:mx-[200px]
    bg-white/90 backdrop-blur-sm 
    rounded-3xl shadow-lg 
    px-4 
  "
>{/* WHERE */}
<div className="relative">  
  <div className="flex items-center rounded-full">
    <div className="w-[50px] h-[50px] bg-[#eb662b0d] rounded-full"></div>

    <div className="flex flex-col items-start text-left">
      <label className="text-[12px] text-gray-800 font-bold px-[10px]">
        {language === "en" ? "Where" : "የሚሄዱበት"}
      </label>

    <input
                  type="text"
                  placeholder={language === "en" ? "Search destination" : "መድረሻ ፈልግ"}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="text-[12px] text-gray-600 outline-none bg-transparent px-[10px]"
                />
    </div>
  </div>

  {/* Dropdown Results */}
  {showDropdown && results.length > 0 && (
    <div className="absolute mt-2 w-full bg-white shadow-lg rounded-md z-10">
      {results.map((item) => (
                  <div
                    key={item._id}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setDestination(item?.destination?.city || item.title);
                      setShowDropdown(false);
                    }}
        >
        {item?.destination?.city || item.title}
        </div>
      ))}
    </div>
  )}
</div>


  {/* WHEN */}
  <div className="flex items-center gap-3 px-4 h-[60px] rounded-full  transition flex-1 items-start text-left">
    <div className="w-[50px] h-[50px] flex items-center justify-center bg-[#eb662b0d] rounded-full">
      
    </div>

    <div className="flex flex-col items-left">
      <label className="text-[12px] text-gray-800 font-bold px-[10]">
        {language === "en" ? "When" : "መቼ"}
      </label>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
          className="text-[12px] text-gray-600 outline-none bg-transparent border-none h-[5px]"

      />
    </div>
  </div>

  {/* TOUR TYPE */}
  <div className="flex items-center gap-3 px-4 h-[60px]  hover:bg-gray-50 transition flex-1">
    <div className="w-[50px] h-[50px] flex items-center justify-center bg-[#eb662b0d] rounded-full">
     
    </div>

    <div className="flex flex-col">
      <label className="text-[12px] text-gray-800 font-bold">
        {language === "en" ? "Tour Type" : "የጉብኝት አይነት"}
      </label>

      <select
        value={tourType}
        onChange={(e) => setTourType(e.target.value)}
        className="text-[12px] text-gray-600 outline-none bg-transparent"
      >
        <option value="">
          {language === "en" ? "All Tours" : "ሁሉም ጉብኝቶች"}
        </option>
        {tourOptions.map((tour) => (
          <option key={tour.value} value={tour.value}>
            {language === "en" ? tour.labelEn : tour.labelAm}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* SEARCH BUTTON (50px × 50px) */}
  <button
    onClick={handleSearch}
    className="
      w-[50px] h-[50px]
      bg-[#eb662b] hover:bg-[#d45a24]
      rounded-full flex items-center justify-center
      transition text-white
    "
  >
   
  </button>
</div>


</div>

{/* Popular Things To Do Section */}
<div className="mx-auto mt-10 mb-12 bg-red rounded-2xl p-6">

  {/* Title + See All */}
  <div className="flex justify-between mb-6 px-4">
    <h2 className="text-2xl font-bold text-gray-800">Popular Things To Do</h2>
    <a href="/tours" className="text-black font-semibold hover:underline">
      See All
    </a>
  </div>

  {/* Main 3-column grid with uniform 30px gap */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">

    {/* COLUMN 1 */}
    <div className="grid gap-[30px] justify-items-center">
      <a href="#" className="relative">
        <img
          src="http://localhost:5000/uploads/banner5.png"
          alt="Banner5"
          className="w-[410px] h-[510px] object-cover rounded-[12px]"
        />
        <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-center py-2 rounded-b-[12px] font-semibold">
          Banner 5
        </div>
      </a>
    </div>

    {/* COLUMN 2 */}
    <div className="grid gap-[30px] justify-items-center">
      <a href="#" className="relative">
        <img
          src="http://localhost:5000/uploads/banner6.png"
          alt="Banner6"
          className="w-[300px] h-[240px] object-cover rounded-xl"
        />
        <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-center py-1 rounded-b-xl font-semibold">
          Banner 6
        </div>
      </a>

      <a href="#" className="relative">
        <img
          src="http://localhost:5000/uploads/banner0.png"
          alt="Banner0"
          className="w-[300px] h-[240px] object-cover rounded-[12px]"
        />
        <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-center py-1 rounded-b-[12px] font-semibold">
          Banner 0
        </div>
      </a>
    </div>

    {/* COLUMN 3 */}
    <div className="grid gap-[30px] justify-items-center">

      {/* Top Image */}
      <a href="#" className="relative">
        <img
          src="http://192.168.158.220:5000/uploads/tours/1764849510224-image6.jpg"
          alt="Banner7"
          className="w-[520px] h-[240px] object-cover rounded-xl"
        />
        <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-center py-1 rounded-b-xl font-semibold">
          Banner 7
        </div>
      </a>

      {/* Bottom 2 images */}
      <div className="grid grid-cols-2 gap-[30px] justify-items-center">
        <a href="#" className="relative">
          <img
            src="http://192.168.228.220:5000/uploads/tours/1764849510224-image6.jpg"
            alt="Banner8"
            className="w-[190px] h-[240px] object-cover rounded-xl"
          />
          <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-center py-1 rounded-b-xl font-semibold">
            Banner 8
          </div>
        </a>

        <a href="#" className="relative">
          <img
            src="http://localhost:5000/uploads/tours/1764849510224-image6.jpg banner5.png"
            alt="Banner9"
            className="w-[300px] h-[240px] object-cover rounded-xl"
          />
          <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-center py-1 rounded-b-xl font-semibold">
            Banner 9
          </div>
        </a>
      </div>

    </div>

  </div>
</div>


{/* WHY CHOOSE TOURZ Section */}
<div className="w-full max-w-[1320px] mx-auto mt-[30px] mb-20 px-6 gap-8">

  <h2 className="text-3xl font-extrabold text-gray-800 mb-10">
    Why Choose <span className="text-orange-500">Tourz</span>
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    {/* Card 1 */}
    <div className="bg-white rounded-2xl p-6 hover:transition">
      <div className="flex justify-center mb-4">
        <img
          src="http://localhost:5000/uploads/banner00.png"
          alt="Banneroo"
          className="h-12 w-12 object-cover"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
        Ultimate Flexibility
      </h3>
      <p className="text-gray-600 text-sm text-center">
        You're in control, with free cancellation and payment options to satisfy any plan or budget.
      </p>
    </div>

    {/* Card 2 */}
    <div className="bg-white rounded-2xl p-6 transition">
      <div className="flex justify-center mb-4">
        <img
          src="http://localhost:5000/uploads/baner1.png"
          alt="Banneroo"
          className="h-12 w-12 object-cover"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
        Memorable Experiences
      </h3>
      <p className="text-gray-600 text-sm text-center">
        Browse and book tours so incredible, you'll want to tell your friends.
      </p>
    </div>

    {/* Card 3 */}
    <div className="bg-white rounded-2xl p-6 transition">
      <div className="flex justify-center mb-4">
        <img
          src="http://localhost:5000/uploads/baner2.png"
          alt="Banneroo"
          className="h-12 w-12 object-cover"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
        Quality at Our Core
      </h3>
      <p className="text-gray-600 text-sm text-center">
        High-quality standards. Millions of reviews. A trusted Tourz company.
      </p>
    </div>

    {/* Card 4 */}
    <div className="bg-white rounded-2xl p-6 transition">
      <div className="flex justify-center mb-4">
        <img
          src="http://localhost:5000/uploads/baner3.png"
          alt="Banneroo"
          className="h-12 w-12 object-cover"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
        Award-Winning Support
      </h3>
      <p className="text-gray-600 text-sm text-center">
        New price? New plan? No problem. We're here to help 24/7.
      </p>
    </div>
  </div>
</div>




      

{/* Featured Trips Section */}

<div className="w-full bg-[#FFF5E5] py-12">
  <div className="max-w-6xl mx-auto px-4">
    {/* Title + See All Link */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-extrabold text-gray-800">Featured Trips</h2>
      <a
        href="/tours"
        className="text-orange-500 font-semibold hover:underline text-sm md:text-base"
      >
        See All
      </a>
    </div>


{/* Equal Rectangle Image Grid */}
{/* Equal Rectangle Image Grid (Dynamic) */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {featuredTrips.map((trip) => (
    <div key={trip._id} className="w-full group">
      
      {/* Image */}
      <img
        src={`http://192.168.228.220:5000/${trip.imageSrc || "uploads/default.jpg"}`}
        alt={trip.title}
        className="w-full h-48 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
      />

      {/* Info Below */}
      <div className="mt-2 flex justify-between items-center text-sm font-semibold">
        <span className="text-gray-800">
          {trip.title || trip.destination?.city & trip.destination?.country}
        </span>

        {trip.price && trip.price > 0 ? (
          <span className="bg-black text-white px-2 py-0.5 rounded font-bold">
            {trip.price}
          </span>
        ) : (
          <span className="text-gray-400 text-xs">No price</span>
        )}
      </div>
    </div>
  ))}
</div>



  </div>
</div>


{/* Trending Destinations Section (Minimized Images) */}

<div className="w-full bg-[#001f3f] py-12">
  <div className="max-w-6xl mx-auto px-4">
    {/* Title + See All Link */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-extrabold text-white">Trending Destinations</h2>
      <a
        href="/tours"
        className="text-orange-500 font-semibold hover:underline text-sm md:text-base"
      >
        See All
      </a>
    </div>

<div className="max-w-6xl mx-auto px-4 py-10">
  {/* Image Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[
      { num: 5, title: "City Tour 100+tours" },
      { num: 6, title: "Mountain Hike 100+tours" },
      { num: 7, title: "River Rafting 100+tours" },
      { num: 8, title: "Village Visit 100+tours" },
    ].map((item) => (
      <div key={item.num} className="w-full relative rounded-xl overflow-hidden">
        {/* Image */}
        <img
          src={`http://localhost:5000/uploads/banner${item.num}.png`}
          alt={item.title}
          className="w-full h-60 object-cover rounded-xl"
        />

        {/* Clickable title */}
        <a
          href="/destination" // link directly to Tours page
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white px-3 py-1 rounded-md font-semibold text-sm cursor-pointer"
        >
          {item.title}
        </a>
      </div>
    ))}
  </div>
</div>






  </div>
</div>


{/* Customer Reviews Section */}
<div className="w-full mt-24 mb-24 px-4 py-12 bg-gray-50">
  {/* Section Title */}
  <h2 className="text-3xl font-extrabold text-gray-800 text-center">
    Customers Reviews
  </h2>

  {/* Banner Image */}
  <div className="flex justify-center mt-12 mb-12">
    <img
      src="http://192.168.228.220:5000/uploads/tours/1764849510224-image6.jpg"
      alt="Banner Icon"
      className="w-40 h-40 rounded-xl  object-contain"
    />
  </div>

  {/* Reviews Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
    {[
      {
        img: "imagee1.png",
        name: "Sarah Johnson",
        review:
          "The tour was amazing! Everything was well organized, and I felt safe and comfortable throughout the trip.",
      },
      {
        img: "imagee2.png",
        name: "Michael Lee",
        review:
          "Viatour made my vacation unforgettable! Great guides and excellent support. Highly recommended.",
      },
      {
        img: "imagee3.png",
        name: "Emily Davis",
        review:
          "Absolutely loved it! Everything ran smoothly, and the experiences were beyond my expectations.",
      },
      {
        img: "imagee4.png",
        name: "David Smith",
        review:
          "Fantastic experience! The destinations were breathtaking and the itinerary was perfect.",
      },
      {
        img: "imagee5.png",
        name: "Olivia Brown",
        review:
          "I had an incredible time! Friendly staff, amazing activities, and unforgettable memories.",
      },
    ].map((customer, idx) => (
      <div
        key={idx}
        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
      >
        <div className="flex items-center gap-4 mb-4">
          <img
            src={`http://localhost:5000/uploads/${customer.img}`}
            alt={customer.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{customer.name}</h3>
            <p className="text-yellow-500 text-sm"></p>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{customer.review}</p>
      </div>
    ))}
  </div>
</div>








{/* Travel Articles Section */}
<div className="w-full px-4">
  <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6 shadow-lg">
    {/* Top: Date/Author + See All */}
    <div className="flex justify-between items-center mb-4">
      <span className="text-sm text-gray-500">
        APRIL 06, 2025 •  By Andualem Bekele
      </span>
      <a
        href="/articles"
        className="text-orange-500 font-semibold hover:underline text-sm"
      >
        See All
      </a>
    </div>

    {/* Section Title */}
    <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
      Travel Articles
    </h2>

    {/* Centered PNG Images with Link */}
    <div className="flex justify-center gap-4 flex-wrap">
      {[19, 20, 21].map((num) => (
        <div key={num} className="w-72 rounded-xl overflow-hidden shadow-lg">
          <img
            src={`http://localhost:5000/uploads/banner${num}.png`}
            alt={`Banner${num}`}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="text-center mt-2">
            <a
              href={`/articles/${num}`}
              className="text-orange-500 font-semibold hover:underline"
            >
              Article {num}
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
{/* Advert Section directly below Travel Articles (no gap) */}
<div className="w-full px-4 -mt-4">
  <div className="max-w-6xl mx-auto bg-orange-500 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 text-white shadow-lg">
    {/* Text Content */}
    <div className="w-full md:w-2/3 flex flex-col justify-center">
      <h2 className="text-3xl font-extrabold mb-4">
        Get 5% Off Your First App Booking!
      </h2>

       <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 text-black rounded-l-2xl border border-gray-300 focus:outline-none"
        />
        <button className="px-6 py-2 bg-orange-500  rounded-l-2xltext-white font-semibold rounded-r-2xl hover:bg-orange-600 transition">
          Send
        </button>
      </div>
      <p className="mb-4">
        Book better on the app using promo code <span className="font-semibold">TOURBOOKING</span> to save instantly on your next tour.
      </p>
      <a
        href="/tours"
        className="self-start px-6 py-2 bg-white text-orange-500 font-semibold rounded-full hover:bg-gray-100 transition"
      >
        Book Now
      </a>
    </div>

    {/* Optional Image */}
 <div className="relative w-80 h-64 md:w-96">
  {/* Bottom layer */}
  <img
    src="http://192.168.228.220:5000/uploads/tours/1764849510224-image6.jpg
    
    "
    className="absolute top-6 left-6 w-full h-full object-cover rounded-xl"
  />

  {/* Second layer */}
  

  {/* Third layer */}
  <img
    src="http://localhost:5000/uploads/banner23.png"
    className="absolute top-2 left-2 w-full h-full object-cover rounded-xl"
  />

  {/* Top layer */}
 
</div>



  </div>
</div>
{/* Footer Section */}
<footer className="w-full text-white mt-0" style={{ backgroundColor: "#001f3f" }}>
  {/* Top Contact & Social Line */}
  <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-700">
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

  {/* Main Footer Columns */}
  <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    
    {/* About Column */}
    <div className="flex flex-col gap-2">
      <h3 className="font-bold mb-4">About Us</h3>
      <ul className="text-gray-400 text-sm flex flex-col gap-2">
        <li><a href="/reviews" className="hover:text-orange-500">Tourz Reviews</a></li>
        <li><a href="/contact" className="hover:text-orange-500">Contact Us</a></li>
        <li><a href="/guides" className="hover:text-orange-500">Travel Guides</a></li>
        <li><a href="/data-policy" className="hover:text-orange-500">Data Policy</a></li>
        <li><a href="/cookie-policy" className="hover:text-orange-500">Cookie Policy</a></li>
        <li><a href="/legal" className="hover:text-orange-500">Legal</a></li>
        <li><a href="/map" className="hover:text-orange-500">Set Map</a></li>
      </ul>
    </div>

    {/* Support Column */}
    <div className="flex flex-col gap-2">
      <h3 className="font-bold mb-4">Support</h3>
      <ul className="text-gray-400 text-sm flex flex-col gap-2">
        <li><a href="/get-in-tour" className="hover:text-orange-500">Get in Tour</a></li>
        <li><a href="/help-center" className="hover:text-orange-500">Help Center</a></li>
        <li><a href="/livechat" className="hover:text-orange-500">Live Chat</a></li>
        <li><a href="/how-it-works" className="hover:text-orange-500">How it Works</a></li>
      </ul>
    </div>

    {/* Newsletter Column */}
    <div className="flex flex-col gap-2">
      <h3 className="font-bold mb-4">Newsletter</h3>
      <p className="text-gray-400 text-sm mb-2">Subscribe to the free newsletter and stay up-to-date:</p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 px-3 py-2 rounded-md text-gray-800 focus:outline-none"
        />
        <button className="bg-orange-500 px-4 py-2 rounded-md font-semibold hover:bg-orange-600">
          Send
        </button>
      </div>
    </div>

    {/* Mobile App Column */}
    <div className="flex flex-col gap-2">
      <h3 className="font-bold mb-4">Mobile App</h3>
      <ul className="text-gray-400 text-sm flex flex-col gap-2">
        <li><a href="/ios-app" className="hover:text-orange-500">iOS App</a></li>
        <li><a href="/android-app" className="hover:text-orange-500">Android App</a></li>
      </ul>
    </div>

  </div>

  {/* Payment Methods */}
  <div className="max-w-6xl mx-auto px-4 mt-4 flex flex-wrap justify-center items-center gap-6 text-gray-400 text-sm">
    <span className="flex items-center gap-2">
      <i className="fab fa-cc-visa text-xl"></i> <a href="/payment/visa" className="hover:text-orange-500">Visa</a>
    </span>
    <span className="flex items-center gap-2">
      <i className="fab fa-cc-mastercard text-xl"></i> <a href="/payment/card" className="hover:text-orange-500">Card</a>
    </span>
    <span className="flex items-center gap-2">
      <i className="fab fa-cc-paypal text-xl"></i> <a href="/payment/paypal" className="hover:text-orange-500">PayPal</a>
    </span>
    <span className="flex items-center gap-2">
      <i className="fas fa-money-bill-wave text-xl"></i> <a href="/payment/santim" className="hover:text-orange-500">Santim Pay</a>
    </span>
  </div>

  {/* Bottom Bar */}
  <div className="w-full text-gray-400 text-sm py-4 text-center border-t border-gray-700">
    &copy; {new Date().getFullYear()} Viatour. All rights reserved.
  </div>
</footer>
<style>{`
        .bg-cream { background-color: #FFF5E1; }
      `}</style>
    </div>
  );
};

export default HeroSection;
