import React from "react";
import { useNavigate } from "react-router-dom";

const CardPaymentForm = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="text-white  ">
        <p className="text-white text-[18px] font-medium leading-[42px] capitalize">
          Set Your Monthly Payment Of $98.99
        </p>

        <p className="text-[#D8D8D8] text-[16px] font-normal leading-[21.2px]">
          Visa and master cards are accepted here
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-row gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-3 bg-black border border-white text-white text-sm placeholder-white text-left rounded-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-3 bg-black border border-white text-white text-sm placeholder-white text-left rounded-none"
          />
        </div>

        <input
          type="text"
          placeholder="Card Number"
          className="w-full px-4 py-3 bg-black border border-white text-white text-sm placeholder-white text-left rounded-none"
        />

        <div className="flex flex-row gap-4">
          <input
            type="text"
            placeholder="CVV"
            className="w-full px-4 py-3 bg-black border border-white text-white text-sm placeholder-white text-left rounded-none"
          />
          <input
            type="text"
            placeholder="Expiration Date"
            className="w-full px-4 py-3 bg-black border border-white text-white text-sm placeholder-white text-left rounded-none"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-2">
        <img src="/assets/ssl-secure.svg" alt="SSL" className="h-6" />
        <img src="/assets/visa.svg" alt="Visa" className="h-6" />
        <img src="/assets/mastercard.svg" alt="MasterCard" className="h-6" />
        <img src="/assets/amex.svg" alt="Amex" className="h-6" />
      </div>

      <label className="flex items-start gap-2 text-sm mt-4">
        <input type="checkbox" className="mt-1" />
        <span>
          Please confirm you have read our{" "}
          <span className="text-[#2DDE28]">terms and conditions</span>
        </span>
      </label>

      <button
        onClick={() => navigate("/confirmation")}
        className="flex justify-center items-center w-full h-[42px] mt-4 px-0 pt-[12.801px] pb-[13.199px] 
             bg-[#2DDE28] border border-[#2DDE28] text-black text-[16px] font-medium 
             leading-[16px] uppercase font-kanit transition-all hover:opacity-90 active:scale-95"
      >
        Pay Now
      </button>
    </div>
  );
};

export default CardPaymentForm;
