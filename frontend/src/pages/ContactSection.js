// src/components/ContactSection.js
import React, { useEffect, useState } from "react";

const ContactSection = ({ language = "en" }) => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to fetch dynamic contact; if 404 or error, fallback to defaults
    const fetchContact = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/contact");
        if (!res.ok) throw new Error("No contact API");
        const data = await res.json();
        setContact(data);
      } catch (err) {
        setContact({
          email: "info@travelgo.com",
          phone: "+251 913 943958",
          address: "Addis Ababa, Ethiopia",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  if (loading) return <div className="py-8 text-center">Loading contact...</div>;

  return (
    <section id="contact" className="max-w-6xl mx-auto my-12 px-4 py-8 bg-white/90 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-4">{language === "en" ? "Contact Us" : "አግኙን"}</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
        <div className="flex-1 bg-gray-50 p-4 rounded shadow">
          <p className="font-semibold">📧 {language === "en" ? "Email" : "ኢሜል"}</p>
          <p className="text-gray-700">{contact.email}</p>
        </div>
        <div className="flex-1 bg-gray-50 p-4 rounded shadow">
          <p className="font-semibold">📞 {language === "en" ? "Phone" : "ስልክ"}</p>
          <p className="text-gray-700">{contact.phone}</p>
        </div>
        <div className="flex-1 bg-gray-50 p-4 rounded shadow">
          <p className="font-semibold">📍 {language === "en" ? "Address" : "አድራሻ"}</p>
          <p className="text-gray-700">{contact.address}</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
