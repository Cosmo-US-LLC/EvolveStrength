import React, { useState } from "react";
import membership_bg from "../../../assets/desktop/membership_bg.webp";
import StepperDesktop from "../../Stepper/desktop";
import MembershipPlanSelector from "./MembershipPlanSelector";
import MembershipSummaryBoxDesktop from "./MembershipSummaryBoxDesktop";

function MembershipDesktop() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  return (
    <div className="relative h-screen w-full">
      {/* Fixed Stepper Header */}
      <StepperDesktop stepNumber={1} />

      {/* Background Image */}
      <img
        src={membership_bg}
        alt="membership_bg"
        className="absolute top-0 w-full h-auto -z-10"
      />

      <div className="pt-[270px] max-w-[1280px] mx-auto">
        <p className="text-white font-kanit text-[79px] font-bold leading-[68px] uppercase">
          Your membership at
        </p>
        <p className="text-[#2DDE28] font-kanit text-[79px] font-bold leading-[68px] uppercase">
          Vancouver, The Post
        </p>
        {/* Plan Selector Tabs */}
        <div className="flex flex-row justify-between mt-8">
          <MembershipPlanSelector
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
          {/* Final Details */}
          <MembershipSummaryBoxDesktop />
        </div>
      </div>
    </div>
  );
}

export default MembershipDesktop;
