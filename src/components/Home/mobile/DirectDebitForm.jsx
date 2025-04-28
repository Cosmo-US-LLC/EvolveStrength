import React from "react";
import { useNavigate } from "react-router-dom";
import visaIcon from "../../../assets/images/mobile/payment/dabit1.svg";
import mcIcon from "../../../assets/images/mobile/payment/dabit2.svg";
import lockIcon from "../../../assets/images/mobile/payment/dabit3.svg";

const DirectDebitForm = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full max-w-[600px] flex flex-col gap-4">
        <div>
          <p className="text-white text-[18px] font-[500] font-[kanit] uppercase">
            Set Your Monthly Payment Of $98.99
          </p>
          <p className="text-[#D8D8D8] text-[14px] font-[400] mt-1 font-[vazirmatn]">
            This is your standard payment for your monthly direct debit before
            any discounts are applied
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-2 py-3 border border-[#999] font-[vazirmatn] bg-black text-white text-[14px] font-[400] placeholder-[#D8D8D8] text-left"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-2 py-3 border border-[#999] font-[vazirmatn] bg-black text-white text-[14px] font-[400] placeholder-[#D8D8D8] text-left"
            />
          </div>

          <div className="flex flex-row gap-4">
            <input
              type="text"
              placeholder="Transit Number"
              className="w-full px-2 py-3 border border-[#999] font-[vazirmatn] bg-black text-white text-[14px] font-[400] placeholder-[#D8D8D8] text-left"
            />
            <input
              type="text"
              placeholder="Bank Number"
              className="w-full px-2 py-3 border border-[#999] font-[vazirmatn] bg-black text-white text-[14px] font-[400] placeholder-[#D8D8D8] text-left"
            />
          </div>

 
          <div className="flex flex-row gap-3 text-xs text-white">
            <div className="flex items-center gap-2 w-full">
              <span className="text-[10px] font-[400] text-[#D8D8D8] font-[vazirmatn]">
                Where is my Transit Number?
              </span>
              <div className="w-4 h-4 bg-white rounded-full text-black flex items-center justify-center text-[10px] font-bold">
                i
              </div>
            </div>
            <div className="flex items-center gap-2 w-full">
              <span className="text-[10px] font-[400] text-[#D8D8D8] font-[vazirmatn]">
                Where is my Bank Number?
              </span>
              <div className="w-4 h-4 bg-white rounded-full text-black flex items-center justify-center text-[10px] font-bold">
                i
              </div>
            </div>
          </div>
 
          <div className="flex flex-row gap-3">
            <input
              type="text"
              placeholder="Account Number"
              className="w-full px-2 py-3 border font-[vazirmatn] border-[#999] bg-black text-white text-[14px] font-[400] placeholder-[#D8D8D8] text-left"
            />
            <input
              type="text"
              placeholder="Verify Account Number"
              className="w-full px-2 py-3 font-[vazirmatn] border border-[#999] bg-black text-white text-[14px] font-[400] placeholder-[#D8D8D8] text-left"
            />
          </div>
        </div>

 
        <div className="flex flex-col pt-1">
          <p className="text-[#CACACA] text-[16px] font-[400] font-[vazirmatn]">
            Guaranteed Safe checkout
          </p>
          <div className="flex flex-row gap-3">
            <img src={visaIcon} alt="Visa" className="w-14 h-10" />
            <img src={mcIcon} alt="MasterCard" className="w-14 h-10" />
            <img src={lockIcon} alt="Lock" className="w-14 h-10" />
          </div>
        </div>

        {/* Checkboxes */}
        <label className="flex items-start gap-3 text-[16px] text-[#D8D8D8] font-[vazirmatn] cursor-pointer">
          <input type="checkbox" className="mt-1 accent-[#2DDE28] " />
          <span>
            I am the bank account holder and do not require another person to
            authorize the debits on this account
          </span>
        </label>

        <label className="flex items-start gap-3 text-[16px] text-[#D8D8D8] font-[vazirmatn] cursor-pointer">
          <input type="checkbox" className="mt-1 accent-[#2DDE28]" />
          <span>
            I acknowledge and agree that my membership will automatically renew
            bi-weekly until I cancel in accordance with the membership contract
            (unless the membership contract provides for a shorter renewal
            period)
          </span>
        </label>

        <label className="flex items-start gap-3 text-[16px] text-[#D8D8D8] font-[vazirmatn] cursor-pointer">
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
                     bg-[#2DDE28] border border-[#2DDE28] font-[kanit] text-black text-[16px] font-medium 
                     leading-[16px] uppercase font-kanit transition-all hover:opacity-90 active:scale-95"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default DirectDebitForm;
