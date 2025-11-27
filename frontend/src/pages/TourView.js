import React from "react";
import { useParams } from "react-router-dom";

const tourData = [
  { id: 1, img: "banner24.png", title: "Amazing Tour 24", details: "Full info about tour 24" },
  { id: 2, img: "banner19.png", title: "Amazing Tour 19", details: "Full info about tour 19" },
  { id: 3, img: "banner25.png", title: "Amazing Tour 25", details: "Full info about tour 25" },
  // add the rest...
];

const TourView = () => {
  const { id } = useParams();
  const tour = tourData.find((t) => t.id === Number(id));

  if (!tour) return <h1 className="text-center mt-10">Tour Not Found</h1>;

  return (
    <div className="w-full px-4 md:px-10 mt-24">
      {/* Banner Image */}
      <img
        src={`http://localhost:5000/uploads/${tour.img}`}
        alt={tour.title}
        className="w-full h-80 object-cover rounded-xl shadow-lg mb-6"
      />

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{tour.title}</h1>

      {/* Description Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-3">Tour Details</h2>
        <p className="text-gray-700 text-lg leading-7">{tour.details}</p>
      </div>

      {/* You can add more sections here like:  
          - Price  
          - Review  
          - Location map  
          - Schedule  
          - Gallery  
      */}
    </div>
  );
};

export default TourView;
