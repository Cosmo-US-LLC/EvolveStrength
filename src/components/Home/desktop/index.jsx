import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import locations from "../../../utils/locations";
import location_bg from "../../../assets/desktop/location_bg.webp";
import ChevronDownFilled from "../../../assets/desktop/chevron-down-filled.svg";
import { useNavigate } from "react-router-dom";

function LocationDesktop() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const navigate = useNavigate();

  const handleTakeTour = () => {
    navigate(`/membership?location=${selectedLocation.postal_code}`);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <img
        src={location_bg}
        alt="location_bg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full space-y-6">
        <p className="text-white text-[79px] font-bold text-center">
          SELECT LOCATION
        </p>
        <Listbox value={selectedLocation} onChange={setSelectedLocation}>
          <div className="relative w-[647px]">
            <Listbox.Button
              style={{ fontFamily: "'Vazirmatn', sans-serif" }}
              className="w-full h-[101px] bg-black/40 backdrop-blur-xl border border-[#656c72] text-left px-6 py-4 rounded-md text-white flex items-center justify-between"
            >
              <div>
                <p className="text-[#2DDE28] text-[30px] font-extrabold leading-none">
                  {selectedLocation.location}
                </p>
                <p className="text-white text-[22px] font-normal">
                  {selectedLocation.postal_code}
                </p>
              </div>
              <img
                src={ChevronDownFilled}
                alt="Dropdown Icon"
                className="w-6 h-6 ml-4"
              />
            </Listbox.Button>

            <Listbox.Options
              style={{ fontFamily: "'Vazirmatn', sans-serif" }}
              className="absolute mt-2 w-full max-h-60 overflow-auto rounded-md bg-black/80 backdrop-blur-xl border border-[#656c72] text-white shadow-lg z-50"
            >
              {locations.map((loc) => (
                <Listbox.Option
                  key={loc.postal_code}
                  value={loc}
                  className={({ active }) =>
                    `cursor-pointer select-none px-6 py-4 ${
                      active ? "bg-[#2DDE28]/20" : "bg-transparent"
                    }`
                  }
                >
                  <div>
                    <p className="text-[#2DDE28] text-[30px] font-extrabold leading-none">
                      {loc.location}
                    </p>
                    <p className="text-white text-[22px] font-normal">
                      {loc.postal_code}
                    </p>
                  </div>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
        <button
          onClick={handleTakeTour}
          className="button mt-6 bg-[#2DDE28] text-black text-[16px] font-medium w-[139px] h-[42px]"
        >
          TAKE A TOUR
        </button>
      </div>
    </div>
  );
}

export default LocationDesktop;
