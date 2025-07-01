import React from "react";
import debit_icon_active from "../../../../../assets/images/desktop/debit_icon_active.svg";
import debit_icon_inactive from "../../../../../assets/images/desktop/debit_icon_inactive.svg";
import credit_icon_active from "../../../../../assets/images/desktop/credit_icon_active.svg";
import credit_icon_inactive from "../../../../../assets/images/desktop/credit_icon_inactive.svg";

const PaymentMethodSelector = ({ selectPlan, setSelectPlan }) => {
  return (
    <div className="flex flex-row items-center mt-4 p-2 bg-[#000000]/60 backdrop-blur-[20px] w-[607px] h-[72px] border border-[1px] border-[#464646]">
      {/* DIRECT DEBIT */}

      <div
        onClick={() => setSelectPlan("card")}
        className={`cursor-pointer w-[326px] h-[59px] flex items-center justify-center ${
          selectPlan === "card" ? "bg-[#2DDE28]" : "bg-transparent"
        }`}
      >
        <img
          src={
            selectPlan === "card" ? credit_icon_active : credit_icon_inactive
          }
          alt="Card Pay Icon"
          className="w-6 h-6 mr-2"
        />
        <p
          className={`font-[400] text-[20px] font-[vazirmatn] ${
            selectPlan === "card" ? "text-black font-[700]" : "text-white"
          }`}
        >
          CARD PAY
        </p>
      </div>

      <div
        onClick={() => setSelectPlan("direct_debit")}
        className={`cursor-pointer w-[326px] h-[59px] flex items-center justify-center ${
          selectPlan === "direct_debit" ? "bg-[#2DDE28]" : "bg-transparent"
        }`}
      >
        <img
          src={
            selectPlan === "direct_debit"
              ? debit_icon_active
              : debit_icon_inactive
          }
          alt="Direct Debit Icon"
          className="w-6 h-6 mr-2"
        />
        <p
          className={`font-[400] text-[20px] font-[vazirmatn] uppercase leading-[24px] ${
            selectPlan === "direct_debit"
              ? "text-black font-[700]"
              : "text-white"
          }`}
        >
          DIRECT DEBIT
        </p>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
