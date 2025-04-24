import React, { useState } from "react";
import heroImage from "../../../assets/mobile/evolve-strength.webp";
import UpDownArrow from "../../../assets/mobile/up-down-arrow.svg";
import { useNavigate } from "react-router-dom";

const locations = [
  { name: "VANCOUVER, THE POST", address: "#310 652, homer street" },
  { name: "CALGARY, DOWNTOWN", address: "#125 4th Ave SW" },
  { name: "EDMONTON, SOUTH", address: "#501 23rd Street" },
  { name: "SASKATOON CENTRAL", address: "#78 Main Blvd" },
  { name: "REGINA EAST", address: "#22 Queen St" },
  { name: "WINNIPEG CORE", address: "#199 City Center Dr" },
  { name: "TORONTO WEST", address: "#88 King St W" },
  { name: "MONTREAL MIDTOWN", address: "#9 Rue Sainte-Catherine" },
];

const MobileHero = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(locations[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="min-h-screen pt-[60px] bg-cover bg-center bg-no-repeat flex flex-col justify-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="text-white text-center font-kanit text-[50px] leading-[42px] font-bold uppercase px-6 mb-8">
        SELECT
        <br />
        LOCATION
      </div>

      <div className="px-6 pb-10 flex flex-col justify-center items-center">
        <div className="relative w-full max-w-xs">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-[325px] px-5 py-3 
               border border-white/40 bg-black/30 rounded-md 
               backdrop-blur-[15.4455px] text-white mb-4 cursor-pointer"
          >
            <div className="flex flex-col gap-2">
              <div className="text-[#2DDE28]   text-[16px] leading-[14.815px] font-extrabold uppercase">
                {selected.name}
              </div>
              <div className="text-white  text-[12px] leading-[14.815px] font-normal lowercase">
                {selected.address}
              </div>
            </div>

            <img
              src={UpDownArrow}
              alt="Dropdown Arrow"
              className={`h-4 w-4 ml-2 transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {isOpen && (
            <div className="absolute z-10 w-full max-h-[200px] overflow-y-auto bg-black bg-opacity-90 text-white rounded-md shadow-md">
              {locations.map((location, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelected(location);
                    setIsOpen(false);
                  }}
                  className="p-4 border-b border-gray-700 hover:bg-green-500 hover:text-black transition-all"
                >
                  <div className="font-bold text-sm">{location.name}</div>
                  <div className="text-xs">{location.address}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="flex justify-center items-center w-[139px] h-[42px] px-[15.602px] py-[12.801px] border border-[#2DDE28] bg-[#2DDE28] text-black font-semibold text-sm"
          onClick={() => navigate("/location-details")}
        >
          TAKE A TOUR
        </button>
      </div>
    </div>
  );
};

export default MobileHero;
