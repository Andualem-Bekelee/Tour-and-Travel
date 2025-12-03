// src/pages/Tours.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer
} from "@react-google-maps/api";

// Advert component to show current discount
function Advert() {
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/discount");
        if (res.data) setDiscount(res.data.value);
      } catch (err) {
        console.error("Error fetching discount:", err);
      }
    };
    fetchDiscount();
  }, []);

  return (
    <div
      style={{
        padding: "15px 25px",
        backgroundColor: "rgba(255,69,0,0.85)",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "1.1rem",
        borderRadius: 20,
        boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        cursor: "pointer",
        transition: "transform 0.3s, box-shadow 0.3s"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";
      }}
    >
      {discount ? `🔥 Discount: ${discount}` : "No discount now"}
    </div>
  );
}

const mapContainerStyle = { height: "400px", width: "100%" };
const defaultCenter = { lat: 9.03, lng: 38.74 }; // Default map center

function Tours({ language }) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [activeMarker, setActiveMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Fetch tours
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tours");
        setTours(res.data);
      } catch {
        alert(
          language === "en"
            ? "Unable to fetch tours."
            : "ጉብኝቶችን መጫን አልተቻለም።"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, [language]);

  // Get user location
  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    } else {
      alert("Geolocation not supported.");
    }
  };

  const categories = [...new Set(tours.map((t) => t.category).filter(Boolean))];
  const destinations = [...new Set(tours.map((t) => t.location).filter(Boolean))];

  const filteredTours = tours.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter ? t.category === categoryFilter : true;
    const matchesDestination = destinationFilter
      ? t.location === destinationFilter
      : true;
    return matchesSearch && matchesCategory && matchesDestination;
  });

  if (loading) return <p style={{ padding: 20 }}>{language === "en" ? "Loading tours..." : "ጉብኝቶች በመጫን ላይ..."}</p>;
  if (tours.length === 0) return <p style={{ padding: 20 }}>{language === "en" ? "No tours available." : "አሁን ጉብኝቶች የሉም።"}</p>;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", color: "#333", fontFamily: "Arial, sans-serif" }}>
      <div style={{ position: "fixed", top: 20, left: 20, zIndex: 10 }}>
        <Advert />
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, padding: 20, flexWrap: "wrap", justifyContent: "center" }}>
        <input
          type="text"
          placeholder={language === "en" ? "Search tours..." : "ጉብኝቶች ይፈልጉ..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc", minWidth: 150 }}
        />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ padding: 10, borderRadius: 8 }}>
          <option value="">{language === "en" ? "All Categories" : "ሁሉም ምድቦች"}</option>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select value={destinationFilter} onChange={(e) => setDestinationFilter(e.target.value)} style={{ padding: 10, borderRadius: 8 }}>
          <option value="">{language === "en" ? "All Destinations" : "ሁሉም መዳረሻዎች"}</option>
          {destinations.map((dest) => <option key={dest} value={dest}>{dest}</option>)}
        </select>
        <button onClick={locateUser} style={{ padding: 10, borderRadius: 8, background: "teal", color: "#fff", border: "none" }}>
          {language === "en" ? "Locate Me" : "እኔን ይንቀሳቀሱ"}
        </button>
      </div>

      {/* Google Map */}
      <div style={{ padding: 20 }}>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={userLocation || defaultCenter}
            zoom={12}
            options={{ styles: darkMapStyle }}
          >
            <MarkerClusterer>
              {(clusterer) =>
                filteredTours.map((tour) =>
                  tour.latitude && tour.longitude ? (
                    <Marker
                      key={tour._id}
                      position={{ lat: tour.latitude, lng: tour.longitude }}
                      clusterer={clusterer}
                      onClick={() => setActiveMarker(tour._id)}
                    >
                      {activeMarker === tour._id && (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                          <div>
                            <strong>{tour.title}</strong>
                            <p>{tour.location}</p>
                            <a
                              href={`https://www.google.com/maps?q=${tour.latitude},${tour.longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {language === "en" ? "View on Google Maps" : "በካርታ ይመልከቱ"}
                            </a>
                          </div>
                        </InfoWindow>
                      )}
                    </Marker>
                  ) : null
                )
              }
            </MarkerClusterer>

            {/* User Location */}
            {userLocation && <Marker position={userLocation} icon={{ path: window.google.maps.SymbolPath.CIRCLE, scale: 8, fillColor: "blue", fillOpacity: 0.8, strokeWeight: 2 }} />}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Tour Cards */}
<div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", padding: 20 }}>
  {filteredTours.map((tour) => (
    <div key={tour._id} style={{ width: 300, borderRadius: 10, overflow: "hidden", border: "1px solid #ccc", boxShadow: "0 5px 15px rgba(0,0,0,0.1)", backgroundColor: "#fff" }}>
      <div style={{ height: 180, overflow: "hidden" }}>
        {/* Clickable image link */}
        {tour.latitude && tour.longitude ? (
          <a
            href={`https://www.google.com/maps?q=${tour.latitude},${tour.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={tour.image && tour.image[0] ? `http://localhost:5000${tour.image[0]}` : "https://via.placeholder.com/300x180"}
              alt={tour.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
            />
          </a>
        ) : (
          <img
            src={tour.image && tour.image[0] ? `http://localhost:5000${tour.image[0]}` : "https://via.placeholder.com/300x180"}
            alt={tour.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>
      <div style={{ padding: 10 }}>
        <h3>{tour.title}</h3>
        <p style={{ fontSize: 14 }}>{tour.description?.slice(0, 80)}...</p>
        <p style={{ fontWeight: "bold" }}>${tour.price}</p>
        <a href={`/book/${tour._id}`} style={{ display: "inline-block", marginTop: 5, padding: "6px 10px", background: "teal", color: "#fff", borderRadius: 5, textDecoration: "none", fontSize: 14 }}>
          Book Now
        </a>
        {tour.latitude && tour.longitude && (
          <a
            href={`https://www.google.com/maps?q=${tour.latitude},${tour.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", marginTop: 5, padding: "6px 10px", borderRadius: 5, background: "#555", color: "#fff", fontSize: 12, textDecoration: "none" }}
          >
            {language === "en" ? "View on Map" : "በካርታ ይመልከቱ"} ({tour.views || 0} views)
          </a>
        )}
      </div>
    </div>
  ))}
</div>


      {/* Testimonials, Contact & Footer */}
      <div style={{ padding: 20 }}>
        <h2 style={{ textAlign: "center" }}>{language === "en" ? "Testimonials" : "የተጠቃሚ አስተያየቶች"}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
          <div style={{ background: "#f5f5f5", padding: 15, borderRadius: 10, maxWidth: 250 }}>
            <p>"Amazing tour! Highly recommended!"</p>
            <strong>- John Doe</strong>
          </div>
          <div style={{ background: "#f5f5f5", padding: 15, borderRadius: 10, maxWidth: 250 }}>
            <p>"The experience was unforgettable and well organized."</p>
            <strong>- Sarah K.</strong>
          </div>
        </div>

        <h2 style={{ textAlign: "center", marginTop: 40 }}>{language === "en" ? "Contact Us" : "አግኙን"}</h2>
        <form style={{ maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", gap: 15 }}>
          <input type="text" placeholder={language === "en" ? "Your Name" : "ስምዎ"} style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }} />
          <input type="email" placeholder={language === "en" ? "Your Email" : "ኢሜልዎ"} style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }} />
          <textarea placeholder={language === "en" ? "Message" : "መልዕክት"} style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc", minHeight: 100 }} />
          <button type="submit" style={{ padding: 12, borderRadius: 6, border: "none", background: "teal", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>
            {language === "en" ? "Send Message" : "መልዕክት ይላኩ"}
          </button>
        </form>

        {/* Footer */}
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
      </div>
    </div>
  );
}

// Dark map style (night mode)
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }]
  }
];

export default Tours;
