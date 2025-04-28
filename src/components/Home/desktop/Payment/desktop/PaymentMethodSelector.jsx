import React, { useState } from "react";
import debit_icon_active from "../../../../../assets/images/desktop/debit_icon_active.svg";
import debit_icon_inactive from "../../../../../assets/images/desktop/debit_icon_inactive.svg";
import credit_icon_active from "../../../../../assets/images/desktop/credit_icon_active.svg";
import credit_icon_inactive from "../../../../../assets/images/desktop/credit_icon_inactive.svg";

const PaymentMethodSelector = ({ selectedPlan, setSelectedPlan }) => {

  return (
    <div className="flex flex-row items-center mt-4 p-2 bg-[#000000]/60 backdrop-blur-[20px] w-[607px] h-[72px] border border-[1px] border-[#464646]">
      {/* DIRECT DEBIT */}
      <button
        onClick={() => setSelectedPlan("direct_debit")}
        className={`cursor-pointer w-[326px] h-[59px] flex items-center justify-center ${
          selectedPlan === "direct_debit" ? "bg-[#2DDE28]" : "bg-transparent"
        }`}
      >
        <img
          src={
            selectedPlan === "direct_debit"
              ? debit_icon_active
              : debit_icon_inactive
          }
          alt="Direct Debit Icon"
          className="w-6 h-6 mr-2"
        />
        <p
          style={{ fontFamily: "'Vazirmatn', sans-serif" }}
          className={`font-bold text-[20px] ${
            selectedPlan === "direct_debit" ? "text-black" : "text-white"
          }`}
        >
          DIRECT DEBIT
        </p>
      </button>

      {/* CARD PAY */}
      <button
        onClick={() => setSelectedPlan("card")}
        className={`cursor-pointer w-[326px] h-[59px] flex items-center justify-center ${
          selectedPlan === "card" ? "bg-[#2DDE28]" : "bg-transparent"
        }`}
      >
        <img
          src={
            selectedPlan === "card" ? credit_icon_active : credit_icon_inactive
          }
          alt="Card Pay Icon"
          className="w-6 h-6 mr-2"
        />
        <p
          style={{ fontFamily: "'Vazirmatn', sans-serif" }}
          className={`font-bold text-[20px] ${
            selectedPlan === "card" ? "text-black" : "text-white"
          }`}
        >
          CARD PAY
        </p>
      </button>
    </div>
  );
};

export default PaymentMethodSelector;
