import React, { useState } from "react";
import heroImage from "../../../assets/images/mobile/evolve-strength.webp";
import UpDownArrow from "../../../assets/images/mobile/up-down-arrow.svg";
import { useNavigate } from "react-router-dom";
import { locations } from "../../../constant/locationsData";

const MobileHero = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(locations[0]);
  const [isOpen, setIsOpen] = useState(false);

  const takeATourHandler = () => {
    navigate(`/location-details?location=${selected.postalCode}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat flex flex-col justify-center sm:bg-center bg-[center_top_10%]"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="text-white text-center font-[kanit] font-[700] text-[50px] leading-[42px] uppercase px-6 mb-8">
        SELECT
        <br />
        LOCATION
      </div>

      <div className="px-6  flex flex-col justify-center items-center">
        <div className="relative w-full max-w-xs">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-[322px] px-3 py-3 
               border border-[#FFFFFF66] bg-[#0000004F] 
               backdrop-blur-[15.4455px] text-white mb-2 cursor-pointer"
          >
            <div className="flex flex-col gap-1">
              <div className="text-[#2DDE28] font-[vazirmatn] font-[800]  text-[16px] leading-[14.815px] uppercase">
                {selected.clubName}
              </div>
              <div className="text-[#FFFFFF] font-[vazirmatn] font-[400] text-[12px] leading-[14.815px] capitalize">
                {selected.clubAddress}
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
            <div className="absolute z-10 w-full max-h-[200px] overflow-y-auto bg-black bg-opacity-90 border border-[#FFFFFF66] text-white shadow-md">
              {locations.map((location, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelected(location);
                    setIsOpen(false);
                  }}
                  className="px-3 py-3 border-b flex flex-col gap-[2px] border-gray-700 hover:bg-green-500 hover:text-black transition-all"
                >
                  <div className="text-[#2DDE28] font-[vazirmatn] text-[14px] font-[800] leading-[14.815px] uppercase ">
                    {location.clubName}
                  </div>

                  <div className="text-white font-[vazirmatn] text-[12px] font-normal leading-[14.815px] capitalize  ">
                    {location.clubAddress}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="flex mt-2 justify-center items-center w-[139px] h-[42px] px-[15.602px] py-[12.801px] border border-[#2DDE28] bg-[#2DDE28] text-black font-[kanit] font-[500] text-[16px] uppercase"
          onClick={takeATourHandler}
        >
          TAKE A TOUR
        </button>
      </div>
    </div>
  );
};

export default MobileHero;
