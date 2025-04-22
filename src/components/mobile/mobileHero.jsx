// src/components/MobileHero.jsx
import React from "react";
// import heroImage from "../../assets/mobile/evolve-strength.webp";

const MobileHero = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-between"
    //   style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Logo */}
      <div className="p-6">
        <img
          src="/evolve-logo.svg" // Replace with actual logo path if different
          alt="Evolve Strength Logo"
          className="w-40"
        />
      </div>

      {/* Center Text */}
      <div className="text-center text-white font-bold text-4xl px-6">
        SELECT<br />LOCATION
      </div>

      {/* Location Dropdown + Button */}
      <div className="px-6 pb-10">
        <div className="bg-black bg-opacity-70 text-left text-white rounded-md p-4 mb-4">
          <div className="text-green-500 font-bold text-sm">VANCOUVER, THE POST</div>
          <div className="text-xs">#310 652, homer street</div>
        </div>
        <button className="w-full bg-green-500 text-black font-semibold py-3 rounded-md text-sm">
          TAKE A TOUR
        </button>
      </div>
    </div>
  );
};

export default MobileHero;
