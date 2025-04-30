import React from "react";
import { useNavigate } from "react-router-dom";

const MembershipSummaryBoxDesktop = ({ selectedPlan }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/`);
  };
  return (
    <div className="w-[471px] bg-[#000000]/60 backdrop-blur-[10px] p-6 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-[#F8F8F8] text-[16px] font-[700] font-[vazirmatn]">
            Your Membership at
          </p>
          <p className="text-[#2DDE28] text-[40px] font-[700] tracking-[-0.76px] leading-[27.73px] uppercase font-[kanit]">
            Vancouver
          </p>
        </div>
        <div>
          <button
            onClick={handleEdit}
            className="button w-[80px] h-[36px] leading-[15px] flex justify-center items-center border font-[vazirmatn] border-[white] text-[white] cursor-pointer font-[500] uppercase text-[14px]"
          >
            Edit
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex py-2 justify-between text-white/90 text-[18px] font-[400] leading-[24px] font-[vazirmatn] capitalize">
          <span className="">Start Date</span>
          <span>
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>{" "}
        </div>{" "}
        <div className="flex pt-4 justify-between text-white/90 text-[18px] font-[400] leading-[24px] font-[vazirmatn] capitalize border-t border-white/20">
          <span>Bi-Weekly</span>
          <span>
            {selectedPlan == "monthly"
              ? localStorage.getItem("noContractSubtotal")
              : localStorage.getItem("contractSubtotal")}
          </span>
        </div>
        <div className="flex pb-4 pt-1 justify-between text-white/90 text-[18px] font-[400] font-[vazirmatn] leading-[24px] capitalize">
          <span>Initiation Fee</span>
          <span>
            {selectedPlan == "monthly"
              ? localStorage.getItem("noContractTax")
              : localStorage.getItem("contractTax")}
          </span>
        </div>
        <div className="flex pt-4 justify-between text-white/90 text-[20px] font-[500] font-[vazirmatn] leading-[24px] capitalize  border-t border-white/20">
          <span>Total</span>
          <span>
            {selectedPlan == "monthly"
              ? localStorage.getItem("noContractTotal")
              : localStorage.getItem("contractTotal")}
          </span>
        </div>
        <p className="text-[#CACACA] pt-6 pb-2 text-[16px] font-regular font-[vazirmatn]">
          Please note that any offers or discounts will be displayed on the
          checkout summary page.&nbsp;our offer T&Cs.
        </p>
      </div>
    </div>
  );
};

export default MembershipSummaryBoxDesktop;
