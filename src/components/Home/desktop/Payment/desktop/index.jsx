import React, { useState } from "react";
import MembershipSummaryBoxDesktop from "../../Membership/desktop/MembershipSummaryBoxDesktop";

import StepperDesktop from "../../commen/StepperDesktop";
import { useNavigate } from "react-router-dom";
import PaymentMethodSelector from "./PaymentMethodSelector";
import DebitForm from "./DebitForm";
import CardForm from "./CardForm";
import Turnstile from "react-turnstile";
import useScrollDirection from "../../../../../hooks/useScrollDirection";

function ReviewAndPay({ selectedPlan, setSelectedPlan }) {
  const [selectPlan, setSelectPlan] = useState("direct_debit");
  const [isHuman, setIsHuman] = useState(false);
  const navigate = useNavigate();
  const scrollDirection = useScrollDirection();

  const handleJoinNow = () => {
    navigate(`/congratulations`);
  };

  return (
    <div className="relative w-full review_and_pay_bg">
      <StepperDesktop stepNumber={3} scrollDirection={scrollDirection} />
      <div className="pt-[300px] pb-[100px] max-w-[1280px] mx-auto">
        <p className="text-white font-[kanit] text-[79px] font-[700] leading-[66px] tracking-[-1.329px] uppercase">
          Review &
        </p>
        <p className="text-[#2DDE28] font-[kanit] text-[79px] font-[700] leading-[66px] tracking-[-1.329px] uppercase">
          Pay
        </p>
        <div className="flex flex-row justify-between mt-16">
          <div>
            <p className=" text-white text-[16px] font-[400] leading-[10.2px]">
              Choose your pricing plan
            </p>
            <PaymentMethodSelector
              selectPlan={selectPlan}
              setSelectPlan={setSelectPlan}
            />
            {selectPlan === "direct_debit" ? <DebitForm /> : <CardForm />}
          </div>

          <div>
            <MembershipSummaryBoxDesktop
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
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
