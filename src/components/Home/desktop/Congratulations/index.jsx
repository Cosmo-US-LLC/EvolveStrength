import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../../../redux/slices/planSlice";

function Congratulations() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { plan, clubPlanMonthly, clubPlanYearly } = useSelector(
    (state) => state.plan
  );

  const handleBackHome = () => {
    navigate(`/`);
    dispatch(resetState());
  };

  return (
    <div className="congratulations_bg min-h-screen flex justify-center items-center">
      <div className="w-[580px] h-[420px] border border-[#FFFFFF42] bg-[#000000]/20 backdrop-blur-[20px] p-6 flex flex-col justify-center items-center text-center">
        <h1 className="text-[#2DDE28] font-kanit text-[40px] font-bold mb-2">
          CONGRATULATIONS
        </h1>
        <p className="text-white text-[18px] mb-4 font-[400] font-[vazirmatn]">
          You’ve successfully activated your{" "}
          <span className="text-[20px] font-[700]">Month to month</span>{" "}
          membership.
        </p>

        <div
          style={{ fontFamily: "'Vazirmatn', sans-serif" }}
          className="space-y-4 mt-3 w-full"
        >
          <div className="flex justify-between text-white/90 font-[vazirmatn] text-[16px] font-regular">
            <span className="">Start Date</span>
            <span>
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>{" "}
          </div>{" "}
          <div className="flex justify-between font-[vazirmatn] text-white/90 text-[16px] font-regular border-t border-white/20 pt-4">
            <span>Subscription</span>
            <span>
              {plan == "monthly" ? "Month To Month" : "1 Year Contract"}
            </span>
          </div>
          <div className="flex justify-between text-white/90 text-sm text-[20px] leading-[24px] capitalize font-semibold border-t border-white/20 pt-4">
            <span>Amount Paid</span>
            <span>
              {plan === "monthly"
                ? clubPlanMonthly?.scheduleTotalAmount
                : clubPlanYearly?.scheduleTotalAmount}
            </span>
          </div>
        </div>

        <button
          onClick={handleBackHome}
          className="px-6 py-[10px] mt-5 bg-[#2DDE28] text-black text-[16px] font-medium button"
        >
          BACK HOME
        </button>
      </div>
    </div>
  );
}

export default Congratulations;
