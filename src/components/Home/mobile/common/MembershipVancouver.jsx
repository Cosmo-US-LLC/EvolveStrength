import React, { useState } from "react";
import ChevronArrow from "../../../../assets/mobile/member-ship/up-down-arrow.svg";
import { useNavigate } from "react-router-dom";

const MembershipVancouver = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className="flex flex-col p-[14px] w-full
             border border-white/40
             bg-black/30
             backdrop-blur-[22.271059036254883px]"
    >
      <div className="flex items-center justify-between">
        <div className="text-white text-[11px] font-bold leading-tight">
          <span className="text-[#F8F8F8] text-[12px] font-bold leading-none">
            Your Membership at
          </span>
          <br />
          <span className="text-[#2DDE28] font-kanit text-[30px] font-bold leading-[32.046px] tracking-[-0.645px] uppercase">
            VANCOUVER
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-[6.463px]
             h-[32.317px] px-[25.853px] py-[6.463px]
             border-[0.646px] border-white
             text-white text-center font-kanit text-[10.341px] font-medium leading-[13.573px] uppercase
             hover:bg-white/10 active:scale-95 transition-all"
          >
            Edit
          </button>

          <img
            src={ChevronArrow}
            alt="dropdown icon"
            className={`w-5 h-5 ml-2 cursor-pointer transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-4 border border-white/20 px-4 py-3 text-sm font-vazirmatn space-y-2 bg-black">
          <div className="flex justify-between">
            <span className="text-white text-[16px] font-normal leading-[20.382px] capitalize">
              Start Date
            </span>
            <span className="text-white text-[16px] font-normal leading-[20.382px] capitalize">
              Wed 16 April 2025
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white text-[16px] font-normal leading-[20.382px] capitalize">
              Start Date
            </span>
            <span className="text-white text-[16px] font-normal leading-[20.382px] capitalize">
              Wed 16 April 2025
            </span>
          </div>
          <div className="w-full h-[1px] bg-white/20 my-2" />
          <div className="flex justify-between">
            <span className="text-white   text-[16px] font-normal leading-[20.382px] capitalize">
              Bi-Weekly
            </span>
            <span className="text-white   text-[16px] font-normal leading-[20.382px] capitalize">
              $96.66
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white  text-[16px] font-normal leading-[20.382px] capitalize">
              Initiation Fee
            </span>
            <span className="text-white   text-[16px] font-normal leading-[20.382px] capitalize">
              $0.00
            </span>
          </div>
        </div>

        <p className="text-[#CACACA] text-[12px] font-normal  pt-3 pb-1">
          Please note that any offers or discounts will be displayed on the
          checkout summary page. our offer T&amp;Cs
        </p>
      </div>
    </div>
  );
};

export default MembershipVancouver;
