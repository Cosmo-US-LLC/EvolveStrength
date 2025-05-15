import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const MembershipSummaryBoxDesktop = () => {
  const navigate = useNavigate();
  const {
    clubLocation,
    plan,
    clubPlanMonthly,
    clubLocationPostal,
    clubPlanYearly,
    addOnDetails,
  } = useSelector((state) => state.plan);
  const handleEdit = () => {
    navigate(`/`);
  };
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

  return (
    <div className="w-[471px] bg-[#000000]/60 backdrop-blur-[10px] p-6 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[#F8F8F8] text-[16px] font-[700] font-[vazirmatn]">
            Your Membership at
          </p>
          <p className="text-[#2DDE28] text-[30px] font-[700] tracking-[-0.76px] leading-[27.73px] uppercase font-[kanit]">
            {clubLocation}
          </p>
        </div>
        <div>
          <button
            onClick={handleEdit}
            className="button w-[80px] leading-[15px] flex justify-center items-center border font-[vazirmatn] border-[white] text-[white] cursor-pointer font-[500] uppercase text-[14px]"
            style={{ paddingBottom: "8px", paddingTop: "12px" }}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="px-4 py-3 mt-4 space-y-2 bg-[#FFFFFF05] border-[0.2px] border-white/20 font-vazirmatn">
          <div className="flex justify-between text-white/90 text-[18px] font-[400] leading-[24px] font-[vazirmatn] capitalize">
            <span className="">Start Date</span>
            <span>
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>{" "}
          </div>
          <div className="flex py-2 justify-between text-white/90 text-[18px] font-[400] leading-[24px] font-[vazirmatn] capitalize">
            <span className="">Subscription</span>
            <span>
              {plan == "monthly" ? "Month To Month" : "1 Year Contract"}
            </span>{" "}
          </div>
          <div className="flex pt-4 justify-between text-white/90 text-[18px] font-[400] leading-[24px] font-[vazirmatn] capitalize border-t border-white/20">
            <span>Bi-Weekly</span>
            <span>
              {plan == "monthly"
                ? clubPlanMonthly?.downPayments?.[0]?.subTotal
                : clubPlanYearly?.downPayments?.[0]?.subTotal}
            </span>
          </div>
          <div className="flex pt-1 justify-between text-white/90 text-[18px] font-[400] font-[vazirmatn] leading-[24px] capitalize">
            <span>Initiation Fee</span>
            <span>$0.00</span>
          </div>
          <div className="flex pt-1 justify-between text-white/90 text-[18px] font-[400] font-[vazirmatn] leading-[24px] capitalize">
            <span>Tax</span>
            <span>
              {plan == "monthly"
                ? clubPlanMonthly?.downPayments?.[0]?.tax
                : clubPlanYearly?.downPayments?.[0]?.tax}
            </span>
          </div>
          {addOnDetails &&
            (clubLocationPostal === 40248 || clubLocationPostal === 40327) && (
              <div className="flex pt-1 justify-between text-white/90 text-[18px] font-[400] leading-[24px] font-[vazirmatn] capitalize">
                <span>
                  add-ons{" "}
                  {(plan == "monthly" ? clubPlanMonthly : clubPlanYearly)
                    ?.schedules?.[1]?.profitCenter || "Bi-Weekly"}
                </span>
                <span>
                  {(plan == "monthly" ? clubPlanMonthly : clubPlanYearly)
                    ?.schedules?.[1]?.scheduleAmount || "$--.--"}
                </span>
              </div>
            )}
          <div className="flex pt-4 justify-between text-white/90 text-[20px] font-[500] font-[vazirmatn] leading-[24px] capitalize  border-t border-white/20">
            <span>Total Due Today</span>
            <span>
              {addOnDetails &&
              (clubLocationPostal === 40248 || clubLocationPostal === 40327)
                ? formattedTotalAmount
                : (plan === "monthly" ? clubPlanMonthly : clubPlanYearly)
                    ?.downPayments?.[0]?.total || "$--.--"}
            </span>
          </div>
          <div className="flex pt-2 justify-between text-white/90 text-[20px] font-[500] font-[vazirmatn] leading-[24px] capitalize ">
            <span>Due on May 29, 2025</span>
            <span>
              {addOnDetails &&
              (clubLocationPostal === 40248 || clubLocationPostal === 40327)
                ? formattedTotalAmount
                : (plan === "monthly" ? clubPlanMonthly : clubPlanYearly)
                    ?.downPayments?.[0]?.total || "$--.--"}
            </span>
          </div>
        </div>
        <p className="text-[#CACACA] pt-6 pb-2 text-[14px] font-regular font-[vazirmatn]">
          Please note that you’ll be billed every two weeks (bi-weekly) to keep
          payments easy and manageable.
        </p>
      </div>
    </div>
  );
};

export default MembershipSummaryBoxDesktop;
