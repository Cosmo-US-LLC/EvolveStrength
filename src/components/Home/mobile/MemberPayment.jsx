import React, { useContext, useState } from "react";
import StepIndicator from "./common/StepIndicator";
import DirectDebitForm from "./DirectDebitForm";
import CardPaymentForm from "./CardPaymentForm";
import MembershipVancouver from "./common/MembershipVancouver";

const MemberPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState("direct");
  return (
    <div className="min-h-screen bg-black text-white px-4 pt-[80px] pb-[12px] flex flex-col gap-6">
      <StepIndicator
        step={3}
        totalSteps={3}
        title="Payment info"
        subtitle="Please provide your payment details"
      />

      <MembershipVancouver />

      <div className="text-left">
        <span className="text-white font-[kanit] text-[46px] font-[700] leading-[42px] uppercase">
          REVIEW &
        </span>{" "}
        <span className="text-[#2DDE28] font-[kanit] text-[50px] font-[700] leading-[42px] uppercase">
          PAY
        </span>
      </div>

      <div className="border border-white/40 flex overflow-hidden p-1">
        <button
          onClick={() => setPaymentMethod("direct")}
          className={`w-1/2 py-2 text-[14px] font-[500] font-[vazirmatn] uppercase ${
            paymentMethod === "direct"
              ? "bg-[#2DDE28] text-black"
              : "text-white"
          }`}
        >
          Direct Debit
        </button>
        <button
          onClick={() => setPaymentMethod("card")}
          className={`w-1/2 py-2 text-[14] font-[500] font-[vazirmatn] uppercase ${
            paymentMethod === "card" ? "bg-[#2DDE28] text-black" : "text-white"
          }`}
        >
          Card pay
        </button>
      </div>

      {paymentMethod === "direct" ? <DirectDebitForm /> : <CardPaymentForm />}
    </div>
  );
};

export default MemberPayment;
