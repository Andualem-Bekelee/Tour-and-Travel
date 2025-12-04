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
        const res = await axios.get("http://192.168.228.220:5000/api/tours");
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

  if (loading)
    return (
      <p style={{ padding: 20 }}>
        {language === "en" ? "Loading tours..." : "ጉብኝቶች በመጫን ላይ..."}
      </p>
    );
  if (tours.length === 0)
    return (
      <p style={{ padding: 20 }}>
        {language === "en" ? "No tours available." : "አሁን ጉብኝቶች የሉም።"}
      </p>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        color: "#333",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div style={{ position: "fixed", top: 20, left: 20, zIndex: 10 }}>
        {/* You can keep any floating buttons here */}
      </div>

      {/* Space under Navbar */}
      <div style={{ marginTop: 80, padding: 20 }}></div>

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
                              {language === "en"
                                ? "View on Google Maps"
                                : "በካርታ ይመልከቱ"}
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
            {userLocation && (
              <Marker
                position={userLocation}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: "blue",
                  fillOpacity: 0.8,
                  strokeWeight: 2
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Tour Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
          padding: 20
        }}
      >
        {filteredTours.map((tour) => (
          <div
            key={tour._id}
            style={{
              width: 300,
              borderRadius: 10,
              overflow: "hidden",
              border: "1px solid #ccc",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              backgroundColor: "#fff"
            }}
          >
           <div style={{ height: 180, overflow: "hidden" }}>
  {tour.latitude && tour.longitude ? (
    <a
      href={`https://www.google.com/maps?q=${tour.latitude},${tour.longitude}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={
          tour.image && tour.image[0]
            ? tour.image[0].startsWith("/uploads")
              ? `http://localhost:5000${tour.image[0]}`
              : `http://localhost:5000/uploads/${tour.image[0]}`
            : "https://via.placeholder.com/300x180"
        }
        alt={tour.title}
        style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
      />
    </a>
  ) : (
    <img
      src={
        tour.image && tour.image[0]
          ? tour.image[0].startsWith("/uploads")
            ? `http://localhost:5000${tour.image[0]}`
            : `http://localhost:5000/uploads/${tour.image[0]}`
          : "https://via.placeholder.com/300x180"
      }
      alt={tour.title}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  )}
</div>

            <div style={{ padding: 10 }}>
              <h3>{tour.title}</h3>
              <p style={{ fontSize: 14 }}>{tour.description?.slice(0, 80)}...</p>
              <p style={{ fontWeight: "bold" }}>${tour.price}</p>
              <a
                href={`/book/${tour._id}`}
                style={{
                  display: "inline-block",
                  marginTop: 5,
                  padding: "6px 10px",
                  background: "teal",
                  color: "#fff",
                  borderRadius: 5,
                  textDecoration: "none",
                  fontSize: 14
                }}
              >
                Book Now
              </a>
              {tour.latitude && tour.longitude && (
                <a
                  href={`https://www.google.com/maps?q=${tour.latitude},${tour.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: 5,
                    padding: "6px 10px",
                    borderRadius: 5,
                    background: "#555",
                    color: "#fff",
                    fontSize: 12,
                    textDecoration: "none"
                  }}
                >
                  {language === "en" ? "View on Map" : "በካርታ ይመልከቱ"} ({tour.views || 0} views)
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials, Contact & Footer */}
      {/* ... Keep the rest of your existing footer code ... */}
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
