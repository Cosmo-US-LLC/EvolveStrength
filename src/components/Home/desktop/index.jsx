import React, { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { locations } from "../../../constant/locationsData";
import ChevronDownFilled from "../../../assets/images/desktop/chevron-down-filled.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import locationBg from "../../../assets/images/desktop/locationbg5.webp";
import logo from "../../../assets/images/desktop/logo_navbar.svg";
import {
  resetClubLocation,
  resetClubLocationId,
  resetClubLocationPostal,
  setClubLocation,
  setClubLocationId,
  setClubLocationPostal,
} from "../../../redux/slices/planSlice";
import Loader from "../../Loader";
import useScrollDirection from "../../../hooks/useScrollDirection";

function LocationDesktop() {
  const dispatch = useDispatch();
  const scrollDirection = useScrollDirection();
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const navigate = useNavigate();

  const handleTakeTour = () => {
    dispatch(setClubLocation(selectedLocation.clubName));
    dispatch(setClubLocationPostal(parseInt(selectedLocation.postalCode)));
    dispatch(setClubLocationId(parseInt(selectedLocation.accountId)));
    navigate(`/membership?location=${selectedLocation.postalCode}`);
  };

  useEffect(() => {
    dispatch(resetClubLocation());
    dispatch(resetClubLocationPostal());
    dispatch(resetClubLocationId());
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = locationBg;
    img.onload = () => setLoading(false);
  }, []);

  if (loading) return <Loader />;
  return (
    <div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6 overflow-hidden bg-black"
      style={{
        backgroundImage: `url(${locationBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center -20px",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
      }}
    >
      <nav
        className={`fixed top-0 py-4 bg-[#000000] shadow-md z-50 w-full flex items-center transition-transform duration-300 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between w-full max-w-[1280px] mx-auto">
          <img src={logo} alt="Logo" className="w-[175px] h-auto" />

          <button
            onClick={handleTakeTour}
            className="w-[141px] bg-[#2DDE28] text-black text-[16px] font-medium h-[50px] button"
          >
            Next
          </button>
        </div>
      </nav>
      <p className="text-white text-center font-[kanit] text-[79px] font-bold leading-[66px] tracking-[-1.329px] uppercase">
        SELECT LOCATION
      </p>

      <Listbox value={selectedLocation} onChange={setSelectedLocation}>
        <div className="relative w-[627px]" onClick={toggleOpen}>
          <Listbox.Button className="w-full font-[vazirmatn] bg-black/40 backdrop-blur-xl border border-[#656c72] text-left p-4 text-white flex items-center justify-between">
            <div>
              <p className="text-[#2DDE28] text-[29px] font-[800] leading-[27px] uppercase">
                {selectedLocation.clubName}
              </p>
              <div className="flex">
                <p className="text-white text-[18px] font-[400] capitalize leading-[27px]">
                  {selectedLocation.clubAddress}
                </p>
              </div>
            </div>
            <img
              src={ChevronDownFilled}
              alt="Dropdown Icon"
              className={`w-6 h-6 ml-4 transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </Listbox.Button>

          <Listbox.Options className="absolute mt-2 w-full max-h-60 font-[vazirmatn] overflow-auto bg-black/80 backdrop-blur-xl border border-[#656c72] text-white shadow-lg z-50">
            {locations.map((loc) => (
              <Listbox.Option
                key={loc.postalCode}
                value={loc}
                className={({ active }) =>
                  `cursor-pointer select-none p-4 ${
                    active ? "bg-[#2DDE28]/20" : "bg-transparent"
                  }`
                }
              >
                <div className="flex flex-col justify-center gap-1">
                  <p className="text-[#2DDE28] font-[vazirmatn] text-[16px] font-[800] leading-[14px] uppercase">
                    {loc.clubName}
                  </p>
                  <div className="flex flex-row">
                    <p className="text-white font-[vazirmatn] text-[14px] font-[400] leading-[14px] capitalize">
                      {loc.clubAddress}
                    </p>
                  </div>
                </div>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      <button
        onClick={handleTakeTour}
        className="button bg-[#2DDE28] text-black text-[16px] font-[kanit] font-[500] w-[129px] h-[42px] leading-[21px] uppercase"
      >
        continue
      </button>
    </div>
  );
}

export default LocationDesktop;
