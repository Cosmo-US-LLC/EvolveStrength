import React from "react";
import successImage from "../../../assets/mobile/Congratulations/congratulations-to-back.webp";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white flex flex-col py-2">
      <div className="border border-white/40 bg-[#1F1F1F] backdrop-blur-[16.805971145629883px] flex flex-col justify-center items-center gap-5 px-3 mt-2 mr-4 ml-4 mb-7 py-4">
        <h2 className="text-center text-[#2DDE28] font-kanit text-[27.668px] font-bold leading-[26.101px] tracking-[-0.526px] uppercase">
          Congratulations
        </h2>

        <p className="text-center text-white text-[13.834px] font-normal leading-[16.601px] capitalize">
          You’ve Successfully Activated Your Month To Month Membership.
        </p>

        <div className="w-full flex flex-col justify-center items-start gap-3 pt-4 pb-2 px-4 border-[0.138px] border-[#808080] bg-white/5 self-stretch ">
          <div className="flex w-[100%] justify-between border-b border-[#808080] pb-2 mb-2">
            <span className="text-white   text-[13.834px] font-normal leading-[16.601px] capitalize">
              Start Date
            </span>

            <span className="text-white   text-[13.834px] font-normal leading-[16.601px] capitalize text-right">
              April 11, 2025
            </span>
          </div>
          <div className="flex w-[100%] justify-between border-b border-[#808080] pb-2 mb-2">
            <span className="text-white  text-[13.834px] font-normal leading-[16.601px] capitalize">
              Subscription
            </span>

            <span className="text-white  text-[16px] font-normal leading-[20.382px] capitalize text-right">
              Bi-Weekly
            </span>
          </div>
          <div className="flex w-[100%] justify-between border-b border-[#808080] pb-2 mb-2">
            <span className="text-white   text-[13.834px] font-black leading-[16.601px] capitalize">
              Amount Paid
            </span>

            <span className="text-white text-[13.834px] font-black leading-[16.601px] capitalize text-right">
              $98.66
            </span>
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <img
          src={successImage}
          alt="Success"
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => navigate("/")}
          className="w-[329px] absolute bottom-[30px] left-0 right-0 mx-auto bg-[#2DDE28] text-black text-center font-kanit text-[16px] font-medium leading-[16px] uppercase py-[12.801px] px-0"
        >
          Back Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
