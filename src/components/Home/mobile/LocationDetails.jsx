import React from "react";
import locationImg from "../../../assets/images/mobile/location-details/evolve-strength-bg.webp";

import healthWellnessIcon from "../../../assets/images/mobile/location-details/health&wellness.svg";
import personalTrainersIcon from "../../../assets/images/mobile/location-details/personal-trainers.svg";
import equipmentIcon from "../../../assets/images/mobile/location-details/equipment.svg";
import locationIcon from "../../../assets/images/mobile/location-details/location.svg";
import TailwindCalendar from "../../../utils/TailwindCalendar";

import { useNavigate } from "react-router-dom";

const LocationDetails = () => {
  const navigate = useNavigate();
  const facilities = [
    { icon: healthWellnessIcon, label: "Health & Wellness" },
    { icon: personalTrainersIcon, label: "Top Personal Trainers" },
    { icon: equipmentIcon, label: "Top of the Line Equipment" },
    { icon: locationIcon, label: "Access to All Locations" },
  ];

  return (
    <div className="min-h-screen pt-[74px] bg-black text-white px-4 flex flex-col">
      <div>
        <span className="text-white font-[kanit] text-[50px] leading-[42px] font-bold uppercase">
          VANCOUVER,
        </span>
        <br />
        <span className="text-[#2DDE28] font-[kanit] text-[50px] leading-[42px] font-bold uppercase">
          THE POST
        </span>
      </div>

      <div className="border border-white/40 bg-black/30 backdrop-blur-[22.27px] my-6 p-3 flex flex-col gap-4">
        <div className="w-full">
          <img src={locationImg} alt="Location" className="w-full rounded-md" />
        </div>
        <div className="text-white font-[kanit] text-[18px] font-[600] uppercase tracking-[-0.791px]">
          Facilities
        </div>

        <ul className="text-[13px] flex flex-col gap-2">
          {facilities.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 px-2 py-[10px] 
                 border-[0.158px] border-[#3A3A3A] bg-white/5 "
            >
              <img src={item.icon} alt={item.label} className="h-7 w-7" />
              <span className="text-[#F8F8F8] font-[vazirmatn] text-center text-[12px] font-[500] leading-[21.512px] uppercase">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <TailwindCalendar title="Choose your start date"/>
      <button
        onClick={() => navigate("/membership-plan")}
        className="flex items-center justify-center h-[42px] 
             px-0 py-[12.801px] border border-[#2DDE28] font-[kanit] 
             bg-[#2DDE28] text-black text-[16px] font-[500] 
             uppercase mb-5"
      >
        Continue
      </button>
    </div>
  );
};

export default LocationDetails;
