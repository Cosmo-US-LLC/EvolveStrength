import React from "react";
import membership_step_1 from "../../../assets/desktop/membership_step_1.svg";
import membership_step_2_inactive from "../../../assets/desktop/membership_step_2_inactive.svg";
import membership_step_3_inactive from "../../../assets/desktop/membership_step_3_inactive.svg";
import membership_step_2_active from "../../../assets/desktop/membership_step_2_active.svg";
import membership_step_3_active from "../../../assets/desktop/membership_step_3_active.svg";

function StepperDesktop({ stepNumber = 1 }) {
  return (
    <div className="fixed top-[88px] h-[143px] w-full bg-[#000000]/60 backdrop-blur-[20px] z-10">
      <div className="flex flex-row items-center justify-center  max-w-[1280px] mx-auto p-4">
        <div className="flex flex-col items-start justify-center w-full">
          <div className="h-[8px] w-full bg-[#2DDE28] mb-4 rounded-l-full" />
          <img
            src={membership_step_1}
            alt="membership_step_1"
            className="w-[27px] h-auto mb-4"
          />
          <p
            style={{ fontFamily: "'Vazirmatn', sans-serif" }}
            className={`text-[#2DDE28] text-[16px] font-semibold `}
          >
            Membership Type
          </p>
          <p
            style={{ fontFamily: "'Vazirmatn', sans-serif" }}
            className={`${
              stepNumber >= 2 ? "text-[#2DDE28]" : "text-[white]"
            } text-[16px] font-regular`}
          >
            Pick the membership that fits you best
          </p>
        </div>
        <div className="flex flex-col items-start justify-center w-full">
          <div
            className={`mb-4 h-[8px] w-full ${
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
            style={{ fontFamily: "'Vazirmatn', sans-serif" }}
            className={`${
              stepNumber >= 2 ? "text-[#2DDE28]" : "text-[white]"
            } text-[16px] font-semibold `}
          >
            Your Details
          </p>
          <p
            style={{ fontFamily: "'Vazirmatn', sans-serif" }}
            className={`${
              stepNumber >= 3 ? "text-[#2DDE28]" : "text-[white]"
            } text-[16px] font-regular`}
          >
            Tell us a bit about yourself.
          </p>
        </div>
        <div className="flex flex-col items-start justify-center w-full">
          <div
            className={`mb-4 h-[8px] rounded-r-full w-full ${
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
            style={{ fontFamily: "'Vazirmatn', sans-serif" }}
            className={`${
              stepNumber >= 3 ? "text-[#2DDE28]" : "text-[white]"
            } text-[16px] font-semibold `}
          >
            Payment Info
          </p>
          <p
            style={{ fontFamily: "'Vazirmatn', sans-serif" }}
            className={`${
              stepNumber >= 3 ? "text-[white]" : "text-[white]"
            } text-[16px] font-regular`}
          >
            Please provide your name and email
          </p>
        </div>
      </div>
    </div>
  );
}

export default StepperDesktop;
