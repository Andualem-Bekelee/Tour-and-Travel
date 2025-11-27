// src/components/AboutSection.js
import React from "react";

const AboutSection = ({ language = "en" }) => {
  return (
    <section id="about" className="max-w-6xl mx-auto my-12 px-4 py-10 bg-white/90 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-4">{language === "en" ? "About Us" : "ስለ እኛ"}</h2>
      <p className="text-center text-gray-700 max-w-3xl mx-auto">
        {language === "en"
          ? "We create curated tours across Ethiopia — local guides, comfortable transport and responsible travel."
          : "እኛ በኢትዮጵያ ውስጥ የተመረጡ ጉብኝቶችን እናቀርባለን – የአካባቢ መሪዎችና እርጥበት ትራንስፖርት."}
      </p>
    </section>
  );
};

export default AboutSection;
