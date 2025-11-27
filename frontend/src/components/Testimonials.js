// src/components/Testimonials.js
import React from "react";

const Testimonials = ({ language = "en" }) => {
  const items = [
    { name: "John", text: "Amazing experience, very well organized." },
    { name: "Sara", text: "Highly recommend — great guides and value." },
    { name: "Ahmed", text: "Memorable trip, excellent service." },
  ];

  return (
    <section className="max-w-6xl mx-auto my-12 px-4 py-8 bg-white/90 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">{language === "en" ? "Testimonials" : "የደንበኞች እይታ"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <div key={i} className="bg-gray-50 p-4 rounded shadow text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500 text-white mx-auto flex items-center justify-center font-bold mb-3">
              {t.name[0]}
            </div>
            <p className="italic text-gray-700">"{t.text}"</p>
            <p className="mt-3 font-semibold">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
