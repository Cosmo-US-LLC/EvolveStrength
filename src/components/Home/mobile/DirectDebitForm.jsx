import React from "react";
import { useNavigate } from "react-router-dom";
import visaIcon from "../../../assets/mobile/payment/Frame 2087326099.svg";
import mcIcon from "../../../assets/mobile/payment/Frame 2087326099.svg";
import lockIcon from "../../../assets/mobile/payment/Frame 2087326099.svg";
import globeIcon from "../../../assets/mobile/payment/Frame 2087326099.svg";

const DirectDebitForm = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-4 py-10 bg-black flex justify-center">
      <div className="w-full max-w-[600px] flex flex-col gap-4 font-vazirmatn">
        <div>
          <p className="text-white font-bold uppercase text-sm">
            Set Your Monthly Payment Of{" "}
            <span className="text-[20px] font-extrabold">$98.99</span>
          </p>
          <p className="text-gray-400 text-sm mt-1">
            This is your standard payment for your monthly direct debit before
            any discounts are applied
          </p>
        </div>

        {/* Wrapper for all input fields */}
        <div className="flex flex-col gap-4 w-full">
          {/* First + Last Name */}
          <div className="flex flex-row gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-3 border border-white bg-black text-white text-sm placeholder-white text-left"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-3 border border-white bg-black text-white text-sm placeholder-white text-left"
            />
          </div>

          {/* Transit + Bank Number */}
          <div className="flex flex-row gap-4">
            <input
              type="text"
              placeholder="Transit Number"
              className="w-full px-4 py-3 border border-white bg-black text-white text-sm placeholder-white text-left"
            />
            <input
              type="text"
              placeholder="Bank Number"
              className="w-full px-4 py-3 border border-white bg-black text-white text-sm placeholder-white text-left"
            />
          </div>

          {/* Info Labels */}
          <div className="flex flex-row gap-4 text-xs text-white">
            <div className="flex items-center gap-2 w-full">
              <span>Where is my Transit Number?</span>
              <div className="w-4 h-4 bg-white rounded-full text-black flex items-center justify-center text-[10px] font-bold">
                i
              </div>
            </div>
            <div className="flex items-center gap-2 w-full">
              <span>Where is my Bank Number?</span>
              <div className="w-4 h-4 bg-white rounded-full text-black flex items-center justify-center text-[10px] font-bold">
                i
              </div>
            </div>
          </div>

          {/* Account + Verify Account */}
          <div className="flex flex-row gap-4">
            <input
              type="text"
              placeholder="Account Number"
              className="w-full px-4 py-3 border border-white bg-black text-white text-sm placeholder-white text-left"
            />
            <input
              type="text"
              placeholder="Verify Account Number"
              className="w-full px-4 py-3 border border-white bg-black text-white text-sm placeholder-white text-left"
            />
          </div>
        </div>

        {/* Icons Row */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <p className="text-white text-sm">Guaranteed Safe checkout</p>
          <img src={visaIcon} alt="Visa" className="w-6 h-6" />
          <img src={mcIcon} alt="MasterCard" className="w-6 h-6" />
          <img src={lockIcon} alt="Lock" className="w-6 h-6" />
          <img src={globeIcon} alt="Globe" className="w-6 h-6" />
        </div>

        {/* Checkboxes */}
        <label className="flex items-start gap-3 text-sm text-white cursor-pointer">
          <input type="checkbox" className="mt-1 accent-[#2DDE28]" />
          <span>
            I am the bank account holder and do not require another person to
            authorize the debits on this account
          </span>
        </label>

        <label className="flex items-start gap-3 text-sm text-white cursor-pointer">
          <input type="checkbox" className="mt-1 accent-[#2DDE28]" />
          <span>
            I acknowledge and agree that my membership will automatically renew
            bi-weekly until I cancel in accordance with the membership contract
            (unless the membership contract provides for a shorter renewal
            period)
          </span>
        </label>

        <label className="flex items-start gap-3 text-sm text-white cursor-pointer">
          <input type="checkbox" className="mt-1 accent-[#2DDE28]" />
          <span>
            Please confirm you have read our{" "}
            <span className="text-[#2DDE28] underline">
              Terms And Conditions
            </span>
          </span>
        </label>

        {/* Submit Button */}
        <button
          onClick={() => navigate("/confirmation")}
          className="flex justify-center items-center w-full h-[48px] mt-4 
                     bg-[#2DDE28] border border-[#2DDE28] text-black text-[16px] font-medium 
                     leading-[16px] uppercase font-kanit transition-all hover:opacity-90 active:scale-95"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default DirectDebitForm;
