// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";

// Other pages...
import Tours from "./pages/Tours";
import BookingForm from "./pages/BookingForm";
import CreateAccount from "./pages/CreateAccount";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AddTour from "./pages/AddTour";
import AddHotel from "./pages/AddHotel";
import BookHotels from "./pages/BookHotels";
import AdminDiscount from "./pages/AdminDiscount";
import Destination from "./pages/Destination";
import DestinationDetails from "./pages/DestinationDetails";
import DestinationPage from "./pages/DestinationHome";
import Activities from "./pages/Activities";
import ContactSection from "./pages/ContactSection";
import TourDetails from "./pages/TourDetails";
import TourView from "./pages/TourView";
import InfoDetail from "./pages/InfoDetail";

// Components
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [language, setLanguage] = useState("en");

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    alert(language === "en" ? "✅ Logged out!" : "✅ ውጤት እንደገና ተጠፋ!");
  };

  const toggleLanguage = () => setLanguage(language === "en" ? "am" : "en");

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} toggleLanguage={toggleLanguage} language={language} />

      <Routes>
        <Route path="/home" element={<Home language={language} />} />
        <Route path="/login" element={<Login language={language} setUser={setUser} />} />
        <Route path="/admin" element={<AdminDashboard onLogout={handleLogout} language={language} />} />

        {/* Add other routes here */}
        <Route path="/tours" element={<Tours language={language} isAdmin={user?.isAdmin} />} />
        <Route path="/book/:id" element={<BookingForm user={user} language={language} />} />
        <Route path="/signup" element={<CreateAccount language={language} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/addtour" element={<AddTour language={language} />} />
        <Route path="/addhotel" element={<AddHotel language={language} />} />
        <Route path="/admin/discount" element={<AdminDiscount />} />
        <Route path="/bookhotels" element={<BookHotels language={language} />} />
        <Route path="/destination" element={<Destination language={language} />} />
        <Route path="/destination-details" element={<DestinationDetails />} />
        <Route path="/destination/:id" element={<DestinationPage language={language} />} />
        <Route path="/activities" element={<Activities language={language} />} />
        <Route path="/contact" element={<ContactSection language={language} />} />
        <Route path="/details/:field" element={<InfoDetail />} />
        <Route path="/details" element={<InfoDetail />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/tourview/:id" element={<TourView />} />
      </Routes>
    </Router>
  );
}

export default App;
