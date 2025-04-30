import React from "react";
import check_with_circle from "../../../../../assets/images/desktop/check_with_circle.svg";

const MembershipPlanSelector = ({
  selectedPlan,
  setSelectedPlan,
  planData,
}) => {
  const monthlyPlanBenefits = [
    "$0 Enrollment Fee",
    "$0 Maintenance fee",
    "Personalized assessment",
    "Access to all locations",
  ];

  return (
    <div className="max-w-[1280px]">
      <div>
        <p className="text-white font-normal text-[16px] leading-[25px] font-[vazirmatn]">
          Choose your pricing plan
        </p>

        <div className="flex flex-row items-center mt-1 p-[6px] bg-[#000000]/60 backdrop-blur-[20px] w-[607px] h-[72px] border border-[#464646]">
          <button
            onClick={() => setSelectedPlan("monthly")}
            className={`cursor-pointer w-[326px] h-[59px] flex items-center justify-center font-[vazirmatn] ${
              selectedPlan === "monthly" ? "bg-[#2DDE28]" : "bg-transparent"
            }`}
          >
            <p
              className={`font-[400] uppercase text-[20px] font-[vazirmatn] leading-[24px] ${
                selectedPlan === "monthly"
                  ? "text-black font-[700]"
                  : "text-white"
              }`}
            >
              MONTH TO MONTH
            </p>
          </button>
          <button
            onClick={() => setSelectedPlan("yearly")}
            className={`cursor-pointer w-[326px] h-[59px] flex items-center justify-center ${
              selectedPlan === "yearly" ? "bg-[#2DDE28]" : "bg-transparent"
            }`}
          >
            <p
              className={`font-[400] text-[20px] font-[vazirmatn] leading-[24px] ${
                selectedPlan === "yearly"
                  ? "text-black font-[700]"
                  : "text-white"
              }`}
            >
              1 YEAR CONTRACT
            </p>
          </button>
        </div>
      </div>

      <div className="mt-6 bg-[#000000]/60 backdrop-blur-[10px] w-[607px]   p-8">
        <p className="text-[#FFF] text-[16px] font-[600] leading-[16px] uppercase">
          BI-WEEKLY
        </p>
        <p className="text-[#2DDE28] text-[68px] font-medium font-[vazirmatn]">
          {selectedPlan == "monthly"
            ? planData?.[0]?.downPayments?.[0]?.subTotal
            : planData?.[1]?.downPayments?.[0]?.subTotal}
        </p>
        <div className="w-[537.2px] h-[1px] bg-white/20"></div>

        <div className="flex flex-col items-center mt-3">
          {monthlyPlanBenefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center justify-start w-full mt-3"
            >
              <img
                src={check_with_circle}
                alt="checkmark"
                className="w-6 h-6 mr-2"
              />
              <p className="text-[white] font-[vazirmatn] font-regular text-[16px] leading-[24px] pt-1">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipPlanSelector;
