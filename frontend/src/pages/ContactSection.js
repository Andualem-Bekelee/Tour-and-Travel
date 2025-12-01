// src/components/ContactSection.js
import React, { useEffect, useState } from "react";

const ContactSection = ({ language = "en" }) => {
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/contact");
        if (!res.ok) throw new Error("API not available");
        const data = await res.json();
        setContact(data);
      } catch {
        setContact({
          email: "info@travelgo.com",
          phone: "+251 913 943 958",
          address: "Addis Ababa, Ethiopia",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  const texts = {
    title: language === "en" ? "Contact Us" : "አግኙን",
    subtitle:
      language === "en"
        ? "We’d love to hear from you. Reach out anytime."
        : "ሁልጊዜ ለመነጋገር ዝግጁ ነን።",
    email: language === "en" ? "Email" : "ኢሜል",
    phone: language === "en" ? "Phone" : "ስልክ",
    address: language === "en" ? "Address" : "አድራሻ",
  };

  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto px-4 py-16"
      aria-labelledby="contact-title"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2
          id="contact-title"
          className="text-3xl md:text-4xl font-bold text-gray-900"
        >
          {texts.title}
        </h2>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          {texts.subtitle}
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ContactCard
            icon="📧"
            label={texts.email}
            value={contact.email}
          />
          <ContactCard
            icon="📞"
            label={texts.phone}
            value={contact.phone}
          />
          <ContactCard
            icon="📍"
            label={texts.address}
            value={contact.address}
          />
        </div>
      )}
    </section>
  );
};

const ContactCard = ({ icon, label, value }) => (
  <div className="group rounded-xl bg-white shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md hover:-translate-y-1">
    <div className="flex items-start gap-4">
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-lg text-gray-800 font-semibold mt-1">
          {value}
        </p>
      </div>
    </div>
  </div>
);

export default ContactSection;
