import React from "react";
import membership_step_1 from "../../../../assets/images/desktop/membership_step_1.svg";
import membership_step_2_inactive from "../../../../assets/images/desktop/membership_step_2_inactive.svg";
import membership_step_3_inactive from "../../../../assets/images/desktop/membership_step_3_inactive.svg";
import membership_step_2_active from "../../../../assets/images/desktop/membership_step_2_active.svg";
import membership_step_3_active from "../../../../assets/images/desktop/membership_step_3_active.svg";

function StepperDesktop({ stepNumber = 1, scrollDirection }) {
  return (
    <div
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrollDirection === "down" ? "top-[0px]" : "top-[82px]"
      } h-[146px] bg-[#000000]/60 backdrop-blur-[20px]`}
    >
      <div className="flex flex-row items-center justify-center  max-w-[1280px] mx-auto py-4">
        <div className="flex flex-col items-start justify-center w-full">
          <div className="h-[8px] w-full bg-[#2DDE28] mb-6 rounded-l-full" />
          <img
            src={membership_step_1}
            alt="membership_step_1"
            className="w-[27px] h-auto mb-4"
          />
          <p
            className={`text-[#2DDE28] text-[16px] font-[600] leading-[24px] font-[vazirmatn] `}
          >
            Membership Type
          </p>
          <p
            className={`${
              stepNumber >= 2 ? "text-[#2DDE28]" : "text-[white]"
            } text-[16px] font-[vazirmatn] font-[400] leading-[24px]`}
          >
            Pick the membership that fits you best
          </p>
        </div>
        <div className="flex flex-col items-start justify-center w-full">
          <div
            className={`mb-6 h-[8px] w-full ${
              stepNumber >= 2 ? "bg-[#2DDE28]" : "bg-[#363636]"
            }`}
          />
          <img
            src={
              stepNumber >= 2
                ? membership_step_2_active
                : membership_step_2_inactive
            }
            alt="membership_step_2"
            className="w-[27px] h-auto mb-4"
          />
          <p
            className={`${
              stepNumber >= 2 ? "text-[#2DDE28]" : "text-[white]"
            } text-[16px] font-[600] leading-[24px] font-[vazirmatn]`}
          >
            Your Details
          </p>
          <p
            className={`${
              stepNumber >= 3 ? "text-[#2DDE28]" : "text-[white]"
            } text-[16px] font-[400] font-[vazirmatn] leading-[24px]`}
          >
            Tell us a bit about yourself.
          </p>
        </div>
        <div className="flex flex-col items-start justify-center w-full">
          <div
            className={`mb-6 h-[8px] rounded-r-full w-full ${
              stepNumber >= 3 ? "bg-[#2DDE28]" : "bg-[#363636]"
            }`}
          />
          <img
            src={
              stepNumber >= 3
                ? membership_step_3_active
                : membership_step_3_inactive
            }
            alt="membership_step_3"
            className="w-[27px] h-auto mb-4"
          />
          <p
            className={`${
              stepNumber >= 3 ? "text-[#2DDE28]" : "text-[white]"
            } text-[16px] font-[600] font-[vazirmatn] leading-[24px]`}
          >
            Payment Info
          </p>
          <p
            className={`${
              stepNumber >= 3 ? "text-[white]" : "text-[white]"
            } text-[16px] font-[400] font-[vazirmatn] leading-[24px]`}
          >
            Please provide your name and email
          </p>
        </div>
      </div>
    </div>
  );
}

export default StepperDesktop;
