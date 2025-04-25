import React from "react";
import { useNavigate } from "react-router-dom";
import visaIcon from "../../../assets/mobile/payment/dabit1.svg";
import mcIcon from "../../../assets/mobile/payment/credit2.svg";
import lockIcon from "../../../assets/mobile/payment/credit3.svg";
import lockIcon2 from "../../../assets/mobile/payment/credit4.svg";

const CardPaymentForm = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4">
      <div className="text-white  ">
        <p className="text-white text-[18px] font-medium leading-[42px] capitalize">
          Set Your Monthly Payment Of $98.99
        </p>

        <p className="text-[#D8D8D8] leading-[21.2px] text-[14px] font-[400]">
          Visa and master cards are accepted here
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-row gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-3 bg-black border border-[#999] text-white text-[14px] font-[400] placeholder-[#D8D8D8] text-left rounded-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-3 bg-black border border-[#999] text-white text-[14px] font-[400] placeholder-[#D8D8D8] text-left rounded-none"
          />
        </div>

        <input
          type="text"
          placeholder="Card Number"
          className="w-full px-4 py-3 bg-black border border-[#999] text-white text-[14px] font-[400] placeholder-[#D8D8D8] text-left rounded-none"
        />

        <div className="flex flex-row gap-4">
          <input
            type="text"
            placeholder="CVV"
            className="w-full px-4 py-3 bg-black border border-[#999] text-white text-[14px] font-[400] placeholder-[#D8D8D8] text-left rounded-none"
          />
          <input
            type="text"
            placeholder="Expiration Date"
            className="w-full px-4 py-3 bg-black border border-[#999] text-white text-[14px] font-[400] placeholder-[#D8D8D8] text-left rounded-none"
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
          <img src={lockIcon2} alt="Lock" className="w-14 h-10" />
        </div>
      </div>

      <label className="flex items-start gap-2 text-[16px] font-[vazirmatn] text-[#D8D8D8] font-[400] mt-4">
        <input type="checkbox" className="mt-1" />
        <span>
          Please confirm you have read our{" "}
          <span className="text-[#2DDE28] text-[16px]">
            terms and conditions
          </span>
        </span>
      </label>

      <button
        onClick={() => navigate("/confirmation")}
        className="flex justify-center items-center w-full h-[42px] mt-4 px-0 pt-[12.801px] pb-[13.199px] 
             bg-[#2DDE28] border border-[#2DDE28] font-[kanit] text-black text-[16px] font-medium 
             leading-[16px] uppercase font-kanit transition-all hover:opacity-90 active:scale-95"
      >
        Pay Now
      </button>
    </div>
  );
};

export default CardPaymentForm;
