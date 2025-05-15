import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../../../redux/slices/planSlice";
import useScrollDirection from "../../../../hooks/useScrollDirection";
import logo from "../../../../assets/images/desktop/logo_navbar.svg";

function Congratulations() {
  const scrollDirection = useScrollDirection;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    plan,
    clubPlanMonthly,
    clubPlanYearly,
    clubLocationPostal,
    addOnDetails,
  } = useSelector((state) => state.plan);

  const downPayment = (plan === "monthly" ? clubPlanMonthly : clubPlanYearly)
    ?.downPayments?.[0]?.total;
  const scheduleAmount = (plan === "monthly" ? clubPlanMonthly : clubPlanYearly)
    ?.schedules?.[1]?.scheduleAmount;
  const downPaymentValue =
    parseFloat(downPayment?.replace(/[^0-9.-]+/g, "")) || 0;
  const scheduleAmountValue =
    parseFloat(scheduleAmount?.replace(/[^0-9.-]+/g, "")) || 0;
  const totalAmount = downPaymentValue + scheduleAmountValue;
  const formattedTotalAmount = `$${totalAmount.toFixed(2)}`;

  const handleBackHome = () => {
    navigate(`/`);
    dispatch(resetState());
  };

  return (
    <div className="flex items-center justify-center min-h-screen congratulations_bg">
      <nav
        className={`fixed top-0 py-4 bg-[#000000] shadow-md z-50 w-full flex items-center transition-transform duration-300 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between w-full max-w-[1280px] mx-auto">
          <img src={logo} alt="Logo" className="w-[175px] h-auto" />

          <button
            onClick={handleBackHome}
            className="w-[141px] bg-[#2DDE28] text-black text-[16px] font-medium h-[50px] button"
          >
            BACK HOME
          </button>
        </div>
      </nav>
      <div className="w-[580px] h-[420px] border border-[#FFFFFF42] bg-[#000000]/20 backdrop-blur-[20px] p-6 flex flex-col justify-center items-center text-center">
        <h1 className="text-[#2DDE28] font-kanit text-[40px] font-bold mb-2">
          CONGRATULATIONS
        </h1>
        <p className="text-white text-[18px] mb-4 font-[400] font-[vazirmatn]">
          You’ve successfully activated your{" "}
          <span className="text-[20px] font-[700]">Month to Month</span>{" "}
          membership.
        </p>

        <div
          style={{ fontFamily: "'Vazirmatn', sans-serif" }}
          className="w-full mt-3 space-y-4"
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
              {addOnDetails &&
              (clubLocationPostal === 40248 || clubLocationPostal === 40327)
                ? formattedTotalAmount
                : (plan === "monthly" ? clubPlanMonthly : clubPlanYearly)
                    ?.downPayments?.[0]?.total || "$--.--"}
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
