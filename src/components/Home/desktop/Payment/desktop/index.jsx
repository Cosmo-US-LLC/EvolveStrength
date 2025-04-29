import React, { useState } from "react";
import review_and_pay_bg from "../../../../../assets/images/desktop/review_and_pay_bg.webp";
 
import MembershipSummaryBoxDesktop from "../../Membership/desktop/MembershipSummaryBoxDesktop";
 
import StepperDesktop from "../../commen/StepperDesktop";
import { useNavigate } from "react-router-dom";
import PaymentMethodSelector from "./PaymentMethodSelector";
import DebitForm from "./DebitForm";
import CardForm from "./CardForm";
import Turnstile from "react-turnstile";

function ReviewAndPay() {
  const [selectedPlan, setSelectedPlan] = useState("direct_debit");
  const [isHuman, setIsHuman] = useState(false);
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate(`/congratulations`);
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Fixed Stepper Header */}
      <StepperDesktop stepNumber={3} />

      {/* Background Image */}
      <div className="absolute w-full h-full -z-10">
        <img
          src={review_and_pay_bg}
          alt="review_and_pay_bg"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="pt-[270px] max-w-[1280px] mx-auto">
        <p className="text-white font-kanit text-[79px] font-bold leading-[68px] uppercase">
          Review &
        </p>
        <p className="text-[#2DDE28] font-kanit text-[79px] font-bold leading-[68px] uppercase">
          Pay
        </p>
        <div className="flex flex-row justify-between mt-8">
          {/* Plan Selector Tabs */}
          <div>
            <p className="mb-2 text-white text-[16px] font-normal leading-[25.2px]">
              Choose your pricing plan
            </p>
            <PaymentMethodSelector
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
            {selectedPlan === "direct_debit" ? <DebitForm /> : <CardForm />}
          </div>
          {/* Final Details */}
          <div>
            <MembershipSummaryBoxDesktop />
            <Turnstile
              sitekey="0x4AAAAAABWSTWCqAhOt104z"
              onSuccess={() => setIsHuman(true)}
              onError={() => setIsHuman(false)}
              onExpire={() => setIsHuman(false)}
            />
            <div className="flex justify-end items-end mt-6 w-full">
              <button
                onClick={handleJoinNow}
                className={`button mt-6 ${
                  isHuman ? "bg-[#2DDE28]" : "bg-gray-400 cursor-not-allowed"
                } text-black text-[16px] font-medium w-[139px] h-[42px]`}
                disabled={!isHuman}
              >
                PAY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewAndPay;
