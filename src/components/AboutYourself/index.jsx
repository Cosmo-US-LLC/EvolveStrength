import React, { useState } from "react";
import about_yourself_bg from "../../assets/desktop/about_yourself_bg.webp";
import MembershipSummaryBoxDesktop from "../Membership/desktop/MembershipSummaryBoxDesktop";
import StepperDesktop from "../Stepper/desktop";
import AboutYourselfForm from "./AboutYourselfForm";
import { useNavigate } from "react-router-dom";

function AboutYourself() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate(`/review-and-pay`);
  };

  return (
    <div className="relative h-screen w-full">
      {/* Fixed Stepper Header */}
      <StepperDesktop stepNumber={2} />

      {/* Background Image */}
      <img
        src={about_yourself_bg}
        alt="about_yourself_bg"
        className="absolute top-0 w-full h-auto -z-10"
      />

      <div className="pt-[270px] max-w-[1280px] mx-auto">
        <p className="text-white font-kanit text-[79px] font-bold leading-[68px] uppercase">
          Tell us about
        </p>
        <p className="text-[#2DDE28] font-kanit text-[79px] font-bold leading-[68px] uppercase">
          yourself
        </p>
        {/* Plan Selector Tabs */}
        <div className="flex flex-row justify-between mt-8">
          <AboutYourselfForm />
          {/* Final Details */}
          <div>
            <MembershipSummaryBoxDesktop />
            <div className="flex justify-end items-end mt-6 w-full">
              <button
                onClick={handleJoinNow}
                className="button mt-6 bg-[#2DDE28] text-black text-[16px] font-medium w-[139px] h-[42px]"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutYourself;
