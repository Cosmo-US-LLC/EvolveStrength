import React, { useContext, useEffect, useState } from "react";
import StepIndicator from "./common/StepIndicator";
import DirectDebitForm from "./DirectDebitForm";
import CardPaymentForm from "./CardPaymentForm";
import MembershipVancouver from "./common/MembershipVancouver";
import debit_icon_active from "../../../assets/images/desktop/debit_icon_active.svg";
import debit_icon_inactive from "../../../assets/images/desktop/debit_icon_inactive.svg";
import credit_icon_active from "../../../assets/images/desktop/credit_icon_active.svg";
import credit_icon_inactive from "../../../assets/images/desktop/credit_icon_inactive.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MemberPayment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("direct");
  const {
    userInfo,
    startDate,
    clubLocation,
    plan,
    clubLocationPostal,
    clubPlans,
    clubPlanMonthly,
    clubPlanYearly,
    isLoading,
    error,
  } = useSelector((state) => state.plan);

  useEffect(() => {
    if (!userInfo) {
      navigate("/member-details");
    }
  }, []);

  const makeAgreement = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/submitAgreement`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            member: {
              firstName: userInfo?.fname,
              lastName: userInfo?.lname,
              email: userInfo?.email,
            },
            membership: {
              planId: "PLN123",
              startDate: "2025-05-01",
              term: "12",
              frequency: "monthly",
            },
            paymentMethod: {
              type: "creditCard",
              cardNumber: "4111111111111111",
              expiryDate: "12/27",
              cvv: "123",
              billingAddress: {
                street: userInfo?.address,
                city: userInfo?.city,
                state: userInfo?.province,
                postalCode: userInfo?.postal,
                country: "CA",
              },
            },
            agreement: {
              accepted: true,
              acceptedDate: new Date().toISOString(),
              ipAddress: "203.0.113.42",
            },
            clubId: clubLocationPostal,
          }),
        }
      );
      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching club information:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-[80px] pb-[12px] flex flex-col gap-6">
      <StepIndicator
        step={3}
        totalSteps={3}
        title="Payment info"
        subtitle="Please provide your payment details"
      />

      <MembershipVancouver />

      <div className="text-left flex flex-row gap-[10px]">
        <span className="text-white font-[kanit] text-[46px] font-[700] leading-[42px] uppercase">
          REVIEW &
        </span>
        <span className="text-[#2DDE28] font-[kanit] text-[48px] font-[700] leading-[42px] uppercase">
          PAY
        </span>
      </div>

      <div className="flex flex-col">
        <p className="text-white font-[Vazirmatn] text-[16px] font-normal leading-[25.2px]">
          Choose payment Option
        </p>

        <div className="border border-white/40 flex overflow-hidden p-1">
          <button
            onClick={() => setPaymentMethod("direct")}
            className={`w-1/2 py-2 text-[14px] font-[500] font-[vazirmatn] uppercase flex items-center justify-center gap-2 ${
              paymentMethod === "direct"
                ? "bg-[#2DDE28] text-black"
                : "text-white"
            }`}
          >
            <img
              src={
                paymentMethod === "direct"
                  ? debit_icon_active
                  : debit_icon_inactive
              }
              alt="Direct Debit Icon"
              className="w-4 h-4"
            />
            <span>Direct Debit</span>
          </button>
          <button
            onClick={() => setPaymentMethod("card")}
            className={`w-1/2 py-2 text-[14px] font-[500] font-[vazirmatn] uppercase flex items-center justify-center space-x-2 ${
              paymentMethod === "card"
                ? "bg-[#2DDE28] text-black"
                : "text-white"
            }`}
          >
            <img
              src={
                paymentMethod === "card"
                  ? credit_icon_active
                  : credit_icon_inactive
              }
              alt="Card Pay Icon"
              className="w-4 h-4"
            />
            <span>Card pay</span>
          </button>
        </div>
      </div>

      {paymentMethod === "direct" ? (
        <DirectDebitForm makeAgreement={makeAgreement} />
      ) : (
        <CardPaymentForm makeAgreement={makeAgreement} />
      )}
    </div>
  );
};

export default MemberPayment;
