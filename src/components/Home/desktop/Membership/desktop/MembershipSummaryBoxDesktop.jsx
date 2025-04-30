import React from "react";
import { useNavigate } from "react-router-dom";

const MembershipSummaryBoxDesktop = ({selectedPlan}) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/`);
  };
  return (
    <div className="w-[471px] h-[421px] bg-[#000000]/60 backdrop-blur-[10px] rounded-md p-6">
      <div className="flex justify-between items-center">
        <div>
          <p
            style={{ fontFamily: "'Vazirmatn', sans-serif" }}
            className="text-[#F8F8F8] font-vazirmatn text-[16px] font-bold"
          >
            Your Membership at
          </p>
          <p className="text-[#2DDE28] text-[40px] font-bold uppercase">
            Vancouver
          </p>
        </div>
        <div>
          <button
            onClick={handleEdit}
            className="button w-[85px] h-[38px] border border-1 border-[white] text-[white] cursor-pointer font-regular text-[16px]"
          >
            Edit
          </button>
        </div>
      </div>
      <div
        style={{ fontFamily: "'Vazirmatn', sans-serif" }}
        className="space-y-4 mt-4"
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
          <span>Bi-Weekly</span>
          <span>{selectedPlan == "monthly" ? localStorage.getItem("noContractSubtotal") : localStorage.getItem("contractSubtotal")}</span>
        </div>
        <div className="flex justify-between text-white/90 text-sm text-[20px] font-regular">
          <span>Initiation Fee</span>
          <span>{selectedPlan == "monthly" ? localStorage.getItem("noContractTax") : localStorage.getItem("contractTax")}</span>
        </div>
        <div className="flex justify-between text-white/90 text-sm text-[20px] font-semibold border-t border-white/20 pt-4">
          <span>Total</span>
          <span>{selectedPlan == "monthly" ? localStorage.getItem("noContractTotal") : localStorage.getItem("contractTotal")}</span>
        </div>
        <p className="text-[#CACACA] text-[16px] font-regular pt-4">
          Please note that any offers or discounts will be displayed on the
          checkout summary page.&nbsp;our offer T&Cs.
        </p>
      </div>
    </div>
  );
};

export default MembershipSummaryBoxDesktop;
