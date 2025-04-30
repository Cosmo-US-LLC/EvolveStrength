import React from "react";
import check_with_circle from "../../../../../assets/images/desktop/check_with_circle.svg";

const MembershipPlanSelector = ({ selectedPlan, setSelectedPlan, planData }) => {
  const monthlyPlanBenefits = [
    "$0 Enrollment Fee",
    "$0 Maintenance fee",
    "Personalized assessment",
    "Access to all locations",
  ];

  return (
    <div className="max-w-[1280px]">
      {/* Choose Plan Section */}
      <div>
        <p
          style={{ fontFamily: "'Vazirmatn', sans-serif" }}
          className="text-white font-normal text-[16px]"
        >
          Choose your pricing plan
        </p>

        <div className="flex flex-row items-center mt-4 p-2 bg-[#000000]/60 backdrop-blur-[20px] w-[607px] h-[72px] border border-[1px] border-[#464646]">
          {/* MONTHLY */}
          <button
            onClick={() => setSelectedPlan("monthly")}
            className={`cursor-pointer w-[326px] h-[59px] flex items-center justify-center ${
              selectedPlan === "monthly" ? "bg-[#2DDE28]" : "bg-transparent"
            }`}
          >
            <p
              style={{ fontFamily: "'Vazirmatn', sans-serif" }}
              className={`font-bold text-[20px] ${
                selectedPlan === "monthly" ? "text-black" : "text-white"
              }`}
            >
              MONTH TO MONTH
            </p>
          </button>

          {/* YEARLY */}
          <button
            onClick={() => setSelectedPlan("yearly")}
            className={`cursor-pointer w-[326px] h-[59px] flex items-center justify-center ${
              selectedPlan === "yearly" ? "bg-[#2DDE28]" : "bg-transparent"
            }`}
          >
            <p
              style={{ fontFamily: "'Vazirmatn', sans-serif" }}
              className={`font-bold text-[20px] ${
                selectedPlan === "yearly" ? "text-black" : "text-white"
              }`}
            >
              1 YEAR CONTRACT
            </p>
          </button>
        </div>
      </div>
      {/* Plan Details */}
      {/* <div className="mt-4 bg-[#000000] w-[607px] h-[407px] p-8"> */}
      <div className="mt-4 bg-[#000000]/60 backdrop-blur-[10px] w-[607px] h-[407px] p-8">
        <p className="text-[white] font-semibold">BI-WEEKLY</p>
        <p
          style={{ fontFamily: "'Vazirmatn', sans-serif" }}
          className="text-[#2DDE28] text-[68px] font-medium"
        >
          {selectedPlan == "monthly" ? planData?.[0]?.downPayments?.[0]?.subTotal : planData?.[1]?.downPayments?.[0]?.subTotal}
        </p>
        <div className="flex flex-col items-center">
          {monthlyPlanBenefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center justify-start w-full mt-4"
            >
              <img
                src={check_with_circle}
                alt="checkmark"
                className="w-4 h-4 mr-2"
              />
              <p
                style={{ fontFamily: "'Vazirmatn', sans-serif" }}
                className="text-[white] text-[16px] font-regular text-[16px]"
              >
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
