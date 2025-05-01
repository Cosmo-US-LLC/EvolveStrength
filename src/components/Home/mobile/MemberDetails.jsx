import React, { useState } from "react";
import StepIndicator from "./common/StepIndicator";
import MembershipVancouver from "./common/MembershipVancouver";
import dropdownIcon from "../../../assets/images/mobile/member-ship/up-down-arrow.svg";
import { useNavigate } from "react-router-dom";
import EventDatePicker from "../../../utils/EventDatePicker";
import DOBPicker from "../../../utils/DOBPicker";

const MemberDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="min-h-screen bg-black text-white px-4 pt-[80px] pb-10 flex flex-col gap-6 max-w-[600px] w-full mx-auto">
      <StepIndicator
        step={2}
        totalSteps={3}
        title="Your Details"
        subtitle="Tell us about yourself"
      />

      <MembershipVancouver />

      <div className="flex flex-col">
        <p className="text-white font-[kanit] text-[46px] sm:text-[44px] font-[700] leading-[38px] uppercase">
          TELL US ABOUT
        </p>
        <p className="text-[#2DDE28] font-[kanit] text-[50px] font-[700] leading-[38px] uppercase">
          YOURSELF
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-white font-[kanit] text-[22.274px] font-medium leading-[35.02px] tracking-[-0.705px] capitalize">
          Your Basic Info
        </p>

        <div className="flex flex-row gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-3 bg-transparent border border-white/40 placeholder-[#D8D8D8] text-[14px] font-[400]"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-3 bg-transparent border border-white/40 placeholder-[#D8D8D8] text-[14px] font-[400]"
          />
        </div>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-3 bg-transparent border border-white/40 placeholder-[#D8D8D8] text-[14px] font-[400]"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full px-4 py-3 bg-transparent border border-white/40 placeholder-[#D8D8D8] text-[14px] font-[400]"
        />
        <input
          type="text"
          placeholder="Mailing Address"
          className="w-full px-4 py-3 bg-transparent border border-white/40 placeholder-[#D8D8D8] text-[14px] font-[400]"
        />
        <input
          type="text"
          placeholder="Province"
          className="w-full px-4 py-3 bg-transparent border border-white/40 placeholder-[#D8D8D8] text-[14px] font-[400]"
        />

        <div className="flex flex-row gap-4">
          <input
            type="text"
            placeholder="City"
            className="w-full px-4 py-3 bg-transparent border border-white/40 placeholder-[#D8D8D8] text-[14px] font-[400]"
          />
          <input
            type="text"
            placeholder="Postal Code"
            className="w-full px-4 py-3 bg-transparent border border-white/40 placeholder-[#D8D8D8] text-[14px] font-[400]"
          />
        </div>

        <div className="flex flex-row gap-4">
          <DOBPicker />
          {/* <div className="flex items-center justify-between w-full px-4 py-3 bg-transparent border border-white/40">
            <input
              type="date"
              className="w-full bg-transparent text-white text-[14px] font-[400]   outline-none placeholder-[#D8D8D8]"
            />
            <img src={calendarIcon} alt="Calendar" className="w-5 h-5" />
          </div> */}

          <div className="relative w-full">
            <select
              onClick={toggleDropdown}
              className="w-full appearance-none px-4 py-3 bg-[#1C1C1C] border border-white/40 placeholder-[#D8D8D8] text-[#D8D8D8] text-[14px] font-[400] outline-none"
            >
              <option className="bg-[#1C1C1C] text-[#D8D8D8]">Gender</option>
              <option className="bg-[#1C1C1C] text-white">Male</option>
              <option className="bg-[#1C1C1C] text-white">Female</option>
              <option className="bg-[#1C1C1C] text-white">Other</option>
            </select>

            <img
              src={dropdownIcon}
              alt="Dropdown Icon"
              className={`absolute right-4 top-[23px] -translate-y-1/2 w-[14px] h-[14px] transition-transform duration-300 pointer-events-none ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/member-Payment")}
        className="flex justify-center items-center w-full h-[42px]  px-0 pt-[12.801px] pb-[13.199px] 
             bg-[#2DDE28] border border-[#2DDE28] font-[kanit] text-black text-[16px] font-medium 
             leading-[16px] uppercase font-kanit transition-all hover:opacity-90 active:scale-95"
      >
        Continue
      </button>
    </div>
  );
};

export default MemberDetails;
