import React from "react";
import { useNavigate } from "react-router-dom";
import congratulations_bg from "../../../assets/desktop/congratulations_bg.webp";

function Congratulations() {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate(`/`); // Adjusted for navigating to the home page
  };

  return (
    <div className="relative min-h-screen w-full flex justify-center items-center">
      {/* Background Image */}
      <div className="absolute w-full h-full -z-10">
        <img
          src={congratulations_bg}
          alt="congratulations_bg"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Centered Box */}
      <div className="w-[670px] h-[475px] border border-1 border-[#FFFFFF] bg-[#000000]/20 backdrop-blur-[20px] p-6 flex flex-col justify-center items-center text-center">
        <h1 className="text-[#2DDE28] font-kanit text-[40px] font-bold mb-4">
          CONGRATULATIONS
        </h1>
        <p
          style={{ fontFamily: "'Vazirmatn', sans-serif" }}
          className="text-white text-[20px] mb-6"
        >
          You’ve successfully activated your Month to month membership.
        </p>

        <div
          style={{ fontFamily: "'Vazirmatn', sans-serif" }}
          className="space-y-4 mt-4 w-full"
        >
          <div className="flex justify-between text-white/90 text-sm text-[20px] font-regular">
            <span className="">Start Date</span>
            <span>
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>{" "}
          </div>{" "}
          <div className="flex justify-between text-white/90 text-sm text-[20px] font-regular border-t border-white/20 pt-4">
            <span>Subscription</span>
            <span>Month To Month</span>
          </div>
          <div className="flex justify-between text-white/90 text-sm text-[20px] font-semibold border-t border-white/20 pt-4">
            <span>Total</span>
            <span>$98.66</span>
          </div>
        </div>

        {/* Back Home Button */}
        <button
          onClick={handleBackHome}
          className="w-[141px] mt-6 bg-[#2DDE28] text-black text-[16px] font-medium h-[50px] button"
        >
          BACK HOME
        </button>
      </div>
    </div>
  );
}

export default Congratulations;
