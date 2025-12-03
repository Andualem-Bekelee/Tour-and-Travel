// src/pages/DestinationDetails.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const DestinationDetails = () => {
  const navigate = useNavigate();

  // Ticket quantities
  const [tickets, setTickets] = useState({ adult: 1, youth: 1, children: 1 });
  const ticketPrices = { adult: 282, youth: 168, children: 80 };
  const extras = { perBooking: 40, perPerson: { adult: 17, youth: 14 } };

  const total =
    tickets.adult * ticketPrices.adult +
    tickets.youth * ticketPrices.youth +
    tickets.children * ticketPrices.children +
    extras.perBooking +
    tickets.adult * extras.perPerson.adult +
    tickets.youth * extras.perPerson.youth;

  const images = [
    "banner29.png", // Big left
    "banner26.png", // Right top-left
    "banner28.png", // Right bottom-left
    "banner29.png", // Right bottom-right (See All)
    "banner25.png", // Right top-right
  ];

  const handleClick = (btn) => {
    const sectionId = btn.toLowerCase().replace(" ", "-");
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // What's Included items and state
  const includedItems = [
    "Accommodation for the entire stay",
    "Daily breakfast and dinner",
    "Entrance fees to all attractions",
    "Professional guide throughout the tour",
    "Transportation between destinations",
    "Towel",
    "Tips",
    "Alchoholic beverages",
  ];

  
  const [includedChecked, setIncludedChecked] = useState(
    Array(includedItems.length).fill(false)
  );
  const toggleIncluded = (index) => {
    const newChecked = [...includedChecked];
    newChecked[index] = !newChecked[index];
    setIncludedChecked(newChecked);
  };

  return (
    <div className="pt-24 max-w-6xl mx-auto p-6">
      {/* HEADER UNDER NAVBAR */}
      <div className="mb-8  rounded-xl p-6  flex justify-between items-center">
        <h1 className="text-[40px] md:text-4x2 font-[700] text-black">
          Phi Phi Islands Adventure Day Trip With SeaView Lunch by V.Marine Tour
        </h1>

        {/* SHARE + WISHLIST BUTTONS */}
        <div className="flex gap-3">
          <button className="bg-white text-gray-800 px-3 py-1 rounded   flex items-center gap-3">
             Wishlist
          </button>
          <button className="bg-white text-gray-800 px-3 py-1  flex items-center gap-1">
            🔗 Share
          </button>
        </div>
      </div>

      {/* MAIN IMAGE + RIGHT BOOKING FORM */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT SIDE - IMAGE + Info */}
        <div className="md:w-2/3 flex flex-col gap-4">
          {/* BIG IMAGE */}
          <div className="rounded-xl shadow-lg overflow-hidden h-[350px]">
            <img
              src={`http://localhost:5000/uploads/${images[0]}`}
              alt="Banner Large"
              className="w-full h-full object-cover"
            />
          </div>

          {/* TOUR INFORMATION */}
          <div className="bg-white shadow-md rounded-xl p-3 border w-full mt-4">
            <h3 className="text-lg font-bold mb-2">Tour Information</h3>

            {/* Info Buttons */}
            <div className="flex flex-col gap-2">
              {["Duration", "Language", "Age Group", "Group Size"].map((item) => (
                <div
                  key={item}
                  onClick={() => navigate("/details#" + item.toLowerCase().replace(" ", "-"))}
                  className="cursor-pointer text-sm font-medium p-2 border rounded hover:bg-gray-100 flex items-center gap-2"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Tour Overview */}
            <div id="overview" className="mt-4">
              <h4 className="text-md font-semibold mb-2">Tour Overview</h4>
              <p className="text-gray-700 text-sm">
                Explore this amazing destination with guided tours, cultural experiences, and unforgettable sights. Enjoy local cuisine, learn history, and make memories that last a lifetime.
                  this amazing destination with guided tours, cultural experiences, and unforgettable sights. Enjoy local cuisine, learn history, and make memories that last a lifetime.
              </p>
            </div>

            {/* Tour Highlights */}
            <div id="tour-highlights" className="mt-4">
  <h4 className="text-md font-semibold mb-2">Tour Highlights</h4>
  <ul className="flex flex-col gap-2">
    {[
      "Visit iconic landmarks",
      "Guided city tour",
      "Local cuisine tasting",
      "Evening entertainment",
      "Scenic nature walks"
    ].map((highlight, idx) => (
      <li key={idx} className="flex items-center gap-2 text-gray-700">
        <span className="text-xl leading-none">•</span>
        {highlight}
      </li>
    ))}
  </ul>
</div>

            

            {/* What's Included */}
            <div id="whats-included" className="mt-4">
              <h4 className="text-md font-semibold mb-2">What's Included</h4>
              <ul className="flex flex-col gap-2">
                {includedItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
   
                  <span
                   onClick={() => toggleIncluded(idx)}
                   className={`w-6 h-6 rounded-full cursor-pointer 
                   ${includedChecked[idx] ? "bg-blue-600" : "bg-gray-300"}`}
                   ></span>


                    <Link
                      to={`/details#${item.toLowerCase().replace(/ /g, "-").replace(/'/g, "")}`}
                      className="hover:underline"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>

              
              {/* ITINERARY */}
<div id="itinerary" className="mt-6">
  <h4 className="text-md font-semibold mb-2">Itinerary</h4>
  <ul className="flex flex-col gap-2 text-gray-700">
    {[
      
    ].map((item, idx) => {
      const dayId = `day-${idx + 1}`;
      return (
        <li key={idx} className="flex items-start gap-2">
          <a
            href={`#${dayId}`}
            className="font-bold text-orange-600 hover:underline"
          >
            {`Day ${idx + 1}:`}
          </a>
          <span>{item.split(": ")[1]}</span>
        </li>
      );
    })}
  </ul>

  {/* Optional detailed day sections */}
  {[
    "Arrival and city tour",
    "Museum visit and local market",
    "Guided nature hike",
    "Free day & departure",
    "traditional food ",
    "Island boat TRIP",
    "Morning chill mbuayii",
  ].map((desc, idx) => (
    <div
      key={idx}
      id={`day-${idx + 1}`}
      className="mt-4 p-4 bg-gray-50 rounded border-l-4 border-orange-500"
    >
      <h5 className="font-semibold">{`Day ${idx + 1}`}</h5>
      <p className="text-gray-700 text-sm">{desc}</p>
    </div>
  ))}
</div>
{/* TOUR MAP */}
<div id="tour-map" className="mt-8">
  <h4 className="text-md font-semibold mb-3">Tour Map</h4>

  <div className="w-full h-64 rounded-xl overflow-hidden shadow-md border">
    <iframe
      title="tour-map"
      width="100%"
      height="100%"
      frameBorder="0"
      style={{ border: 0 }}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127623.19026052234!2d38.700122!3d9.010793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8534f5e9c6bb%3A0x8b1b97cba5bd1f52!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1700000000000"
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  </div>
</div>
{/* AVAILABLE CALENDAR */}
<div id="availability" className="mt-8">
  <h4 className="text-md font-semibold mb-2">Availability Calendar</h4>

  <div className="bg-white p-4 rounded-xl shadow-md border w-full">
    <label className="text-sm text-gray-600">Select a date</label>
    <input
      type="date"
      className="w-full p-2 border rounded-lg mt-2"
    />
  </div>
</div>


{/* FAQ Section */}
<div id="faqs" className="mt-10 bg-white p-6 ">
  <h3 className="text-xl mb-4">FAQs</h3>

  <div className="space-y-4">
    {[
      {
        q: "Is transportation included in the tour?",
        a: "Yes, all transfers between destinations are included in the package."
      },
      {
        q: "Can I cancel or reschedule my booking?",
        a: "Yes, cancellations are allowed up to 48 hours before the tour starts."
      },
      {
        q: "Are meals included?",
        a: "Breakfast and dinner are included daily. Lunch is optional."
      },
      {
        q: "Do I need travel insurance?",
        a: "We recommend travel insurance, but it is not mandatory."
      }
    ].map((faq, idx) => (
      <div key={idx} className="border-b pb-3">
        
        <button
          className="w-full flex justify-between items-center text-left
                     text-black
                     hover:text-black
                     focus:text-black
                     bg-transparent
                     focus:bg-transparent
                     active:bg-transparent"
          onClick={() => {
            const el = document.getElementById(`faq-${idx}`);
            el.classList.toggle("hidden");
          }}
        >
          {faq.q}
          <span className="text-orange-500 font-bold">+</span>
        </button>

        <p id={`faq-${idx}`} className="hidden mt-2 text-sm text-gray-600">
          {faq.a}
        </p>
      </div>
    ))}
  </div>
</div>






{/* CUSTOMER REVIEWS */}
<div id="reviews" className="mt-10 bg-white p-6 rounded-xl shadow-md border">
  <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>

  {/* Average Rating */}
  <div className="flex items-center gap-2 mb-4">
    <span className="text-3xl font-bold text-orange-500">4.8</span>
    <span className="text-yellow-500 text-xl">★★★★★</span>
    <span className="text-gray-600 text-sm">(268 reviews)</span>
  </div>

  {/* Review Cards */}
  <div className="flex flex-col gap-4">

    {/* Review 1 */}
    <div className="p-4 bg-gray-50 rounded-lg border">
      <div className="flex justify-between mb-2">
        <h4 className="font-semibold">John Matthew</h4>
        <span className="text-yellow-500">★★★★★</span>
      </div>
      <p className="text-gray-700 text-sm">
        Amazing tour! The guide was professional and very friendly. We enjoyed every moment.
      </p>
    </div>

    {/* Review 2 */}
    <div className="p-4 bg-gray-50 rounded-lg border">
      <div className="flex justify-between mb-2">
        <h4 className="font-semibold">Sara Ahmed</h4>
        <span className="text-yellow-500">★★★★☆</span>
      </div>
      <p className="text-gray-700 text-sm">
        Great experience! Lovely views and well-organized itinerary. Highly recommended!
      </p>
    </div>

    {/* Review 3 */}
    <div className="p-4 bg-gray-50 rounded-lg border">
      <div className="flex justify-between mb-2">
        <h4 className="font-semibold">Nicolas Brown</h4>
        <span className="text-yellow-500">★★★★★</span>
      </div>
      <p className="text-gray-700 text-sm">
        One of the best trips I’ve been on. Worth the price, very memorable.
      </p>
    </div>
  </div>

  {/* Write a Review Button */}
  
</div>
{/* MORE PHOTOS / GALLERY WITH TOP DESCRIPTION AND HELPFUL BUTTONS */}
<div id="more-photos" className="mt-8">
  <h4 className="text-md font-semibold mb-2">Take its tour! This is fantastic!</h4>
  <p className="text-gray-600 text-sm mb-4">
    Great 4-5 hours to explore more, tons of photo spots, even have a passport for stamps — a must-see!
  </p>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {["banner33.png", "banner34.png", "banner35.png"].map((img, idx) => (
      <div key={idx} className="rounded-xl shadow-lg overflow-hidden flex flex-col">
        <div className="h-48 overflow-hidden">
          <img
            src={`http://localhost:5000/uploads/${img}`}
            alt={`Gallery ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Helpful / Not Helpful buttons */}
        <div className="flex justify-center gap-4 mt-2 p-2 bg-gray-50">
          <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-medium">
            Helpful
          </button>
          <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium">
            Not Helpful
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
{/* MORE PHOTOS / GALLERY WITH TOP DESCRIPTION AND HELPFUL BUTTONS */}
<div id="more-photos" className="mt-8">
  <h4 className="text-md font-semibold mb-2">Take its tour! This is fantastic!</h4>
  <p className="text-gray-600 text-sm mb-4">
    Great 4-5 hours to explore more, tons of photo spots, even have a passport for stamps — a must-see!
  </p>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {["banner33.png", "banner34.png", "banner35.png"].map((img, idx) => (
      <div key={idx} className="rounded-xl shadow-lg overflow-hidden flex flex-col">
        <div className="h-48 overflow-hidden">
          <img
            src={`http://localhost:5000/uploads/${img}`}
            alt={`Gallery ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Helpful / Not Helpful buttons */}
        <div className="flex justify-center gap-4 mt-2 p-2 bg-gray-50">
          <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-medium">
            Helpful
          </button>
          <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium">
            Not Helpful
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

{/* MORE PHOTOS / GALLERY WITH TOP DESCRIPTION AND HELPFUL BUTTONS */}
<div id="more-photos" className="mt-8">
  <h4 className="text-md font-semibold mb-2">Take its tour! This is fantastic!</h4>
  <p className="text-gray-600 text-sm mb-4">
    Great 4-5 hours to explore more, tons of photo spots, even have a passport for stamps — a must-see!
  </p>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {["banner33.png", "banner34.png", "banner35.png"].map((img, idx) => (
      <div key={idx} className="rounded-xl shadow-lg overflow-hidden flex flex-col">
        <div className="h-48 overflow-hidden">
          <img
            src={`http://localhost:5000/uploads/${img}`}
            alt={`Gallery ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Helpful / Not Helpful buttons */}
        <div className="flex justify-center gap-4 mt-2 p-2 bg-gray-50">
          <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-medium">
            Helpful
          </button>
          <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium">
            Not Helpful
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
{/* See More Reviews Link */}
  <div className="text-left mt-4">
    <a
      href="/reviews"
      className="text-blue-500 font-semibold hover:underline"
    >
      See More Reviews
    </a>
  </div>
  {/* LEAVE A REPLY */}
<div id="leave-reply" className="mt-12 bg-white p-6 rounded-xl shadow-md">
  <h4 className="text-xl font-semibold mb-2">Leave a Reply</h4>
  <p className="text-gray-600 text-sm mb-6">
    Your email address will not be published. Required fields are marked *
  </p>

  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Location */}
    <div className="flex flex-col">
      <label className="font-medium text-gray-700 mb-1">Location *</label>
      <input
        type="text"
        placeholder="Enter location"
        className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        required
      />
    </div>

    {/* Amenities */}
    <div className="flex flex-col">
      <label className="font-medium text-gray-700 mb-1">Amenities *</label>
      <input
        type="text"
        placeholder="Enter amenities"
        className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        required
      />
    </div>

    {/* Food */}
    <div className="flex flex-col">
      <label className="font-medium text-gray-700 mb-1">Food *</label>
      <input
        type="text"
        placeholder="Enter food options"
        className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        required
      />
    </div>

    {/* Room Price */}
    <div className="flex flex-col">
      <label className="font-medium text-gray-700 mb-1">Room Price *</label>
      <input
        type="text"
        placeholder="Enter room price"
        className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        required
      />
    </div>

    {/* Tour Operator Name */}
    <div className="flex flex-col">
      <label className="font-medium text-gray-700 mb-1">Tour Operator Name *</label>
      <input
        type="text"
        placeholder="Enter tour operator name"
        className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        required
      />
    </div>

    {/* Email */}
    <div className="flex flex-col">
      <label className="font-medium text-gray-700 mb-1">Email *</label>
      <input
        type="email"
        placeholder="Enter your email"
        className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        required
      />
    </div>

    {/* Title */}
    <div className="flex flex-col md:col-span-2">
      <label className="font-medium text-gray-700 mb-1">Title *</label>
      <input
        type="text"
        placeholder="Enter title"
        className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        required
      />
    </div>

    {/* Comment */}
    <div className="flex flex-col md:col-span-2">
      <label className="font-medium text-gray-700 mb-1">Comment *</label>
      <textarea
        placeholder="Write your comment..."
        className="border rounded-lg p-2 h-32 resize-none focus:ring-2 focus:ring-orange-400 focus:outline-none"
        required
      ></textarea>
    </div>

    {/* Submit Button */}
    <div className="md:col-span-2 text-right">
      <button
        type="submit"
        className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600"
      >
        Post Comment
      </button>
    </div>
  </form>
</div>
{/* YOU MIGHT ALSO LIKE WITH DISCOUNT UNDER DESCRIPTION */}
<div id="recommendations" className="mt-12">
  <h4 className="text-xl font-semibold mb-2">You Might Also Like</h4>
  <p className="text-gray-600 text-sm mb-4">
    It's fantastic! Check these tours with amazing discounts.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {[
      { img: "banner24.png", title: "City Adventure Tour", oldPrice: "$250", newPrice: "$150" },
      { img: "banner25.png", title: "Mountain Hiking Experience", oldPrice: "$300", newPrice: "$180" },
      { img: "banner26.png", title: "Cultural Highlights", oldPrice: "$220", newPrice: "$130" },
      { img: "banner27.png", title: "Relaxing Beach Escape", oldPrice: "$280", newPrice: "$170" },
    ].map((item, idx) => (
      <div key={idx} className="rounded-xl shadow-lg overflow-hidden bg-white flex flex-col">
        <div className="h-40 overflow-hidden">
          <img
            src={`http://localhost:5000/uploads/${item.img}`}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3 flex flex-col gap-2">
          <h5 className="font-semibold text-gray-800">{item.title}</h5>
          {/* Discount box under description */}
          <div className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded w-max">
            From {item.oldPrice} → {item.newPrice}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
</div>
          </div>
        </div>

        
 {/* RIGHT SIDE - BOOKING FORM + SMALL IMAGES */}
        <div className="md:w-1/3 flex flex-col gap-4">
          {/* SMALL IMAGES TOP */}
          <div className="flex gap-4">
            {[images[1], images[4]].map((img, idx) => (
              <div key={idx} className="flex-1 rounded-xl shadow-lg overflow-hidden h-44">
                <img
                  src={`http://localhost:5000/uploads/${img}`}
                  alt={`Right Top ${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* SMALL IMAGES BOTTOM */}
          <div className="flex gap-4">
            {[images[2], images[3]].map((img, idx) => (
              <div key={idx} className="flex-1 relative rounded-xl shadow-lg overflow-hidden h-44">
                <img
                  src={`http://localhost:5000/uploads/${img}`}
                  alt={`Right Bottom ${idx}`}
                  className="w-full h-full object-cover"
                />
                {idx === 1 && (
                  <a
                    href="/tours"
                    className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded font-medium hover:bg-gray-800"
                  >
                    See All photos
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* BOOKING FORM */}
          <div className="bg-white shadow-lg rounded-xl p-4 border mt-4">
            <p className="text-gray-500 text-sm">From</p>
            <p className="text-2xl font-bold text-orange-600 mb-4">$1,200</p>

            <p className="text-gray-500 text-sm">From</p>
            <p className="font-semibold mb-4">February 05 ~ March 14</p>

            <p className="text-gray-500 text-sm">Time</p>
            <select className="w-full border rounded-lg p-2 mb-4">
              <option>Choose time</option>
              <option>8:00 AM</option>
              <option>10:00 AM</option>
              <option>2:00 PM</option>
            </select>

            <p className="font-semibold mb-2">Tickets</p>
            {["adult", "youth", "children"].map((type) => (
              <div key={type} className="flex justify-between items-center mb-2">
                <span className="capitalize">
                  {type === "adult"
                    ? "Adult (18+ years)"
                    : type === "youth"
                    ? "Youth (13–17 years)"
                    : "Children (0–12 years)"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setTickets({ ...tickets, [type]: Math.max(0, tickets[type] - 1) })
                    }
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{tickets[type]}</span>
                  <button
                    onClick={() => setTickets({ ...tickets, [type]: tickets[type] + 1 })}
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                  <span>${ticketPrices[type] * tickets[type]}</span>
                </div>
              </div>
            ))}

            <p className="font-semibold mb-2 mt-4">Add Extra</p>
            <div className="flex justify-between mb-1">
              <span>Add Service per booking</span>
              <span>${extras.perBooking}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Add Service per person</span>
              <span>
                Adult ${extras.perPerson.adult} — Youth ${extras.perPerson.youth}
              </span>
            </div>

            <div className="flex justify-between mt-2 mb-4">
              <span className="text-sm">Total:</span>
              <span className="font-bold">${total}</span>
            </div>

            <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600">
              Book Now
            </button>
          </div>
        </div>
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
  );
};

export default DestinationDetails;

