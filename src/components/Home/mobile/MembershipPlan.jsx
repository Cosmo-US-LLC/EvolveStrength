import React, { useEffect, useRef, useState } from "react";
import StepIndicator from "./common/StepIndicator";
import MembershipVancouver from "./common/MembershipVancouver";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPlan, setAddOnDetails } from "../../../redux/slices/planSlice";

const MembershipPlan = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
        setIsSelected(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const navigate = useNavigate();
  const {
    startDate,
    clubLocation,
    plan,
    clubPlanMonthly,
    clubPlanYearly,
    clubLocationPostal,
    addOnDetails,
  } = useSelector((state) => state.plan);
  function continueToMember() {
    navigate("/about-yourself");
    // navigate("/member-details");
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-[80px] pb-[30px] flex flex-col gap-8">
      <div>
        <StepIndicator
          step={1}
          totalSteps={3}
          title="Choose Your Plan"
          subtitle="Pick the membership that fits you best"
        />

        <div className="flex flex-col mt-4">
          <span className="text-white font-[kanit] text-[44px] font-[700] leading-[42px] uppercase">
            Your membership at
          </span>

          <span className="text-[#2DDE28] font-[kanit] text-[50px] font-[700] leading-[42px] uppercase">
            {clubLocation}
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="mb-2 text-white text-[16px] font-[kanit] font-[600] leading-[16px] uppercase">
          Choose your pricing plan
        </p>

        <div className="flex p-1 pt-1 overflow-hidden border border-white">
          <button
            // onClick={() => setSelectedPlan("monthly")}
            onClick={() => dispatch(setPlan("monthly"))}
            className={`flex items-center justify-center gap-[10px]
              h-[38px] px-[10px] py-[10px] flex-1
              text-[14px] font-[vazirmatn] font-medium leading-[25.2px]
              uppercase transition-all
              ${
                plan === "monthly"
                  ? "bg-[#2DDE28] text-black"
                  : "text-white bg-transparent"
              }`}
          >
            MONTH TO MONTH
          </button>

          <button
            // onClick={() => setSelectedPlan("yearly")}
            onClick={() => dispatch(setPlan("yearly"))}
            className={`flex items-center justify-center gap-[10px]
              h-[38px] px-[10px] py-[10px] flex-1
              text-[14px] font-[vazirmatn] font-normal leading-[25.2px]
              uppercase transition-all
              ${
                plan === "yearly"
                  ? "bg-[#2DDE28] text-black"
                  : "text-white bg-transparent"
              }`}
          >
            1 YEAR CONTRACT
          </button>
        </div>
      </div>

      <MembershipVancouver
        step={1}
        startDate={startDate}
        planData={plan === "monthly" ? clubPlanMonthly : clubPlanYearly}
      />

      <div className="">
        {plan === "monthly" ? (
          <>
            <p className="text-white font-[kanit] text-[16px] font-[600] leading-[16px] uppercase mb-1">
              BI-WEEKLY
            </p>

            <p className="text-[#2DDE28] font-[vazirmatn] text-[50px] font-[500] leading-[68px] mb-2">
              {/* $34.99 */}
              {clubPlanMonthly?.downPayments?.[0]?.subTotal || "$--.--"}
            </p>

            {/* <p className="text-[#999999] font-[vazirmatn] text-[16px] font-normal leading-[24px] mb-4">
              Experience personalized training, group classes, and essential
              resources.
            </p> */}
          </>
        ) : (
          <>
            <p className="text-white font-[kanit] text-[16px] font-[600] leading-[16px] uppercase mb-1">
              BI-WEEKLY
            </p>

            <p className="text-[#2DDE28] font-[vazirmatn] text-[50px] font-[500] leading-[68px] mb-2">
              {/* $899.00 */}
              {clubPlanYearly?.downPayments?.[0]?.subTotal || "$--.--"}
            </p>

            {/* <p className="text-[#999999] font-[vazirmatn] text-[16px] font-normal leading-[24px] mb-4">
              Best value — save more with an annual commitment.
            </p> */}
          </>
        )}
        <hr className="mb-4 border-white/20" />
        <ul className="space-y-4">
          {[
            "$0 Enrolment Fee",
            "$0 Maintenance Fee",
            "Personalized Assessment",
            "Access to All Locations",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="flex items-center justify-center w-5 h-5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke="#999999"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 12.5L11 15.5L16 9.5"
                    stroke="#B5B4B4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-[#999999] font-[vazirmatn] text-[16px] font-normal leading-[24px]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {(clubLocationPostal === 40248 || clubLocationPostal === 40327) && (
        <div>
          {!addOnDetails ? (
            <div style={{ paddingTop: "16px" }}>
              <p
                className="text-white font-[400] text-[16px] font-[vazirmatn]"
                style={{ lineHeight: "25.2px" }}
              >
                Choose any of our additional services
              </p>
              <div
                className="flex items-center gap-5 mt-3"
                onClick={() => setIsOpen(true)}
              >
                <button className="w-[106px] bg-[#2DDE28] rounded-full flex justify-center items-center text-black text-[16px] font-medium h-[54px] button gap-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                  >
                    <path
                      d="M18.9998 8.07178C20.0658 8.07178 20.9309 8.93688 20.9309 10.0028V17.3408H28.2688C28.7809 17.3408 29.2721 17.5442 29.6343 17.9063C29.9964 18.2685 30.1998 18.7597 30.1998 19.2718C30.1998 19.7839 29.9964 20.2751 29.6343 20.6372C29.2721 20.9994 28.7809 21.2028 28.2688 21.2028H20.9309V28.5408C20.9309 29.0529 20.7274 29.5441 20.3653 29.9062C20.0031 30.2684 19.512 30.4718 18.9998 30.4718C18.4877 30.4718 17.9965 30.2684 17.6344 29.9062C17.2722 29.5441 17.0688 29.0529 17.0688 28.5408V21.2028H9.73084C9.2187 21.2028 8.72753 20.9994 8.36539 20.6372C8.00325 20.2751 7.7998 19.7839 7.7998 19.2718C7.7998 18.7597 8.00325 18.2685 8.36539 17.9063C8.72753 17.5442 9.2187 17.3408 9.73084 17.3408H17.0688V10.0028C17.0688 8.93688 17.9339 8.07178 18.9998 8.07178Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <p className="text-white font-[600] text-[16px] leading-[25px] font-[kanit] uppercase">
                  add-ons
                </p>
              </div>
            </div>
          ) : (
            <div style={{ paddingTop: "16px" }}>
              <p
                className="text-white font-[400] text-[16px] font-[vazirmatn]"
                style={{ lineHeight: "25.2px" }}
              >
                Our Additional Services
              </p>
              <div className="flex mt-3 gap-5 items-center justify-between bg-[#171717] border border-1 border-[#464646] px-2">
                <p className="text-white font-[400] text-[20px] leading-[24px] font-[Vazirmatn] capitalize pt-2 pb-1">
                  add-ons:{" "}
                  {plan == "monthly"
                    ? clubPlanMonthly?.schedules?.[1]?.profitCenter || "$--.--"
                    : clubPlanYearly?.schedules?.[1]?.profitCenter || "$--.--"}
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-white font-[400] text-[20px] leading-[24px] font-[Vazirmatn] capitalize pt-2 pt-1">
                    {plan == "monthly"
                      ? clubPlanMonthly?.schedules?.[1]?.scheduleAmount ||
                        "$--.--"
                      : clubPlanYearly?.schedules?.[1]?.scheduleAmount ||
                        "$--.--"}
                  </p>
                  <button
                    onClick={() => {
                      dispatch(setAddOnDetails(false));
                      setIsSelected(false);
                    }}
                    className="p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="33"
                      height="34"
                      viewBox="0 0 33 34"
                      fill="none"
                    >
                      <path
                        d="M24.3952 25.1317C28.8862 20.6407 28.8862 13.3593 24.3952 8.86827C19.9042 4.37724 12.6228 4.37724 8.13173 8.86827C3.6407 13.3593 3.6407 20.6407 8.13173 25.1317C12.6228 29.6228 19.9042 29.6228 24.3952 25.1317Z"
                        fill="black"
                        stroke="#7C7C7C"
                      />
                      <path
                        d="M12.4323 13.1687C12.797 12.8041 13.3888 12.8041 13.7535 13.1687L16.2636 15.6789L18.7737 13.1687C18.9489 12.9936 19.1865 12.8951 19.4343 12.8951C19.682 12.8951 19.9196 12.9936 20.0948 13.1687C20.27 13.3439 20.3685 13.5815 20.3685 13.8293C20.3685 14.0771 20.27 14.3147 20.0948 14.4899L17.5847 17L20.0948 19.5101C20.27 19.6853 20.3685 19.9229 20.3685 20.1707C20.3685 20.4185 20.27 20.6561 20.0948 20.8313C19.9196 21.0064 19.682 21.1049 19.4343 21.1049C19.1865 21.1049 18.9489 21.0064 18.7737 20.8313L16.2636 18.3211L13.7535 20.8313C13.5783 21.0064 13.3406 21.1049 13.0929 21.1049C12.8451 21.1049 12.6075 21.0064 12.4323 20.8313C12.2571 20.6561 12.1587 20.4185 12.1587 20.1707C12.1587 19.9229 12.2571 19.6853 12.4323 19.5101L14.9425 17L12.4323 14.4899C12.0677 14.1252 12.0677 13.5334 12.4323 13.1687Z"
                        fill="#FF0000"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* <div
            className="flex items-center gap-5 mt-3"
            onClick={() => setIsOpen(true)}
          >
            <button className="w-[39.603px] bg-[#2DDE28] rounded-full flex justify-center items-center text-black text-[16px] font-medium h-[39.603px] button gap-[6.601px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="41"
                viewBox="0 0 40 41"
                fill="none"
              >
                <rect
                  x="0.208496"
                  y="0.737366"
                  width="39.6031"
                  height="39.6031"
                  rx="19.8016"
                  fill="#2DDE28"
                />
                <path
                  d="M20.01 13.1464C20.7136 13.1464 21.2846 13.7174 21.2846 14.4209V19.2644H26.128C26.4661 19.2644 26.7903 19.3987 27.0293 19.6377C27.2683 19.8767 27.4026 20.2009 27.4026 20.539C27.4026 20.877 27.2683 21.2012 27.0293 21.4402C26.7903 21.6793 26.4661 21.8135 26.128 21.8135H21.2846V26.657C21.2846 26.995 21.1503 27.3192 20.9113 27.5582C20.6723 27.7973 20.3481 27.9316 20.01 27.9316C19.672 27.9316 19.3478 27.7973 19.1088 27.5582C18.8697 27.3192 18.7354 26.995 18.7354 26.657V21.8135H13.892C13.554 21.8135 13.2298 21.6793 12.9907 21.4402C12.7517 21.2012 12.6174 20.877 12.6174 20.539C12.6174 20.2009 12.7517 19.8767 12.9907 19.6377C13.2298 19.3987 13.554 19.2644 13.892 19.2644H18.7354V14.4209C18.7354 13.7174 19.3065 13.1464 20.01 13.1464Z"
                  fill="#000"
                />
              </svg>
            </button>
            <p className="text-white font-[400] text-[16px] leading-[25px] font-[vazirmatn] uppercase">
              Add another service
            </p>
          </div> */}
            </div>
          )}

          {isOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-black/50" />

              <div
                ref={ref}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-[#1A1A1A] border border-[#FFFFFF] p-4 text-white shadow-lg"
              >
                <div className="flex flex-col items-center justify-center mt-10">
                  <p className="text-[#F8F8F8] items-center font-[vazirmatn] text-[16px] font-[700]">
                    Choose any of our additional services
                  </p>
                  <p
                    className="text-[#2DDE28] font-[kanit] text-[40px] font-[700] uppercase"
                    style={{ lineHeight: "37.734px", letterSpacing: "-0.76px" }}
                  >
                    add-ons
                  </p>

                  <div
                    className={`bg-[#353535] flex justify-between items-center mt-8 w-[90%] px-6 py-6 ${
                      isSelected ? "border border-1 border-[#2DDE28]" : ""
                    }`}
                  >
                    <div className="flex flex-col justify-center">
                      <p
                        className="text-[#fff] items-center font-[vazirmatn] text-[20px] font-[400] capitalize"
                        style={{ lineHeight: "24px" }}
                      >
                        {plan == "monthly"
                          ? clubPlanMonthly?.schedules?.[1]?.profitCenter ||
                            "$--.--"
                          : clubPlanYearly?.schedules?.[1]?.profitCenter ||
                            "$--.--"}
                      </p>
                      <p
                        className="text-[#fff] items-center font-[vazirmatn] text-[16px] font-[400] capitalize mt-3"
                        style={{ lineHeight: "20px" }}
                      >
                        Recurring{" "}
                        {plan == "monthly"
                          ? clubPlanMonthly?.schedules?.[1]?.scheduleAmount ||
                            "$--.--"
                          : clubPlanYearly?.schedules?.[1]?.scheduleAmount ||
                            "$--.--"}
                      </p>
                      <p
                        className="text-[#fff] items-center font-[vazirmatn] text-[16px] font-[400] capitalize"
                        style={{ lineHeight: "20px" }}
                      >
                        {plan == "monthly"
                          ? clubPlanMonthly?.scheduleFrequency || "$--.--"
                          : clubPlanYearly?.scheduleFrequency || "$--.--"}
                      </p>
                    </div>
                    <div>
                      {!addOnDetails ? (
                        isSelected ? (
                          <button
                            onClick={() => setIsSelected(false)}
                            className={`w-[39.603px] bg-[#2DDE28] rounded-full flex justify-center items-center text-black text-[16px] font-medium h-[39.603px] button gap-[6.601px]`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="26"
                              viewBox="0 0 25 26"
                              fill="none"
                            >
                              <path
                                d="M19.9287 6.75C20.2761 6.75 20.6109 6.883 20.8594 7.12207C21.108 7.36134 21.2499 7.68762 21.25 8.03027L21.2432 8.1582C21.2171 8.41139 21.1142 8.65064 20.9482 8.8457L20.8594 8.93945L9.49316 19.8779C9.00957 20.3433 8.24952 20.3721 7.73145 19.9648L7.63086 19.8779L3.14062 15.5566C3.01751 15.4382 2.91874 15.2967 2.85156 15.1406C2.78442 14.9846 2.75002 14.8169 2.75 14.6475L2.75684 14.5195C2.78737 14.2241 2.92299 13.9477 3.14062 13.7383C3.38905 13.4993 3.72399 13.3662 4.07129 13.3662L4.20117 13.373C4.5012 13.4018 4.78469 13.5292 5.00195 13.7383L8.55664 17.1582L18.998 7.12207L19.0947 7.03711C19.33 6.85146 19.6247 6.75003 19.9287 6.75Z"
                                fill="black"
                                stroke="black"
                                stroke-width="0.5"
                              />
                            </svg>
                          </button>
                        ) : (
                          <button
                            onClick={() => setIsSelected(true)}
                            className={`w-[39.603px] bg-[#000] rounded-full flex justify-center items-center text-black text-[16px] font-medium h-[39.603px] button gap-[6.601px]`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="40"
                              height="41"
                              viewBox="0 0 40 41"
                              fill="none"
                            >
                              <rect
                                x="0.208496"
                                y="0.737366"
                                width="39.6031"
                                height="39.6031"
                                rx="19.8016"
                                fill="black"
                              />
                              <path
                                d="M20.01 13.1464C20.7136 13.1464 21.2846 13.7174 21.2846 14.4209V19.2644H26.128C26.4661 19.2644 26.7903 19.3987 27.0293 19.6377C27.2683 19.8767 27.4026 20.2009 27.4026 20.539C27.4026 20.877 27.2683 21.2012 27.0293 21.4402C26.7903 21.6793 26.4661 21.8135 26.128 21.8135H21.2846V26.657C21.2846 26.995 21.1503 27.3192 20.9113 27.5582C20.6723 27.7973 20.3481 27.9316 20.01 27.9316C19.672 27.9316 19.3478 27.7973 19.1088 27.5582C18.8697 27.3192 18.7354 26.995 18.7354 26.657V21.8135H13.892C13.554 21.8135 13.2298 21.6793 12.9907 21.4402C12.7517 21.2012 12.6174 20.877 12.6174 20.539C12.6174 20.2009 12.7517 19.8767 12.9907 19.6377C13.2298 19.3987 13.554 19.2644 13.892 19.2644H18.7354V14.4209C18.7354 13.7174 19.3065 13.1464 20.01 13.1464Z"
                                fill="white"
                              />
                            </svg>
                          </button>
                        )
                      ) : (
                        <button className="w-[39.603px] bg-[#2DDE28] rounded-full flex justify-center items-center text-black text-[16px] font-medium h-[39.603px] button gap-[6.601px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="26"
                            viewBox="0 0 25 26"
                            fill="none"
                          >
                            <path
                              d="M19.9287 6.75C20.2761 6.75 20.6109 6.883 20.8594 7.12207C21.108 7.36134 21.2499 7.68762 21.25 8.03027L21.2432 8.1582C21.2171 8.41139 21.1142 8.65064 20.9482 8.8457L20.8594 8.93945L9.49316 19.8779C9.00957 20.3433 8.24952 20.3721 7.73145 19.9648L7.63086 19.8779L3.14062 15.5566C3.01751 15.4382 2.91874 15.2967 2.85156 15.1406C2.78442 14.9846 2.75002 14.8169 2.75 14.6475L2.75684 14.5195C2.78737 14.2241 2.92299 13.9477 3.14062 13.7383C3.38905 13.4993 3.72399 13.3662 4.07129 13.3662L4.20117 13.373C4.5012 13.4018 4.78469 13.5292 5.00195 13.7383L8.55664 17.1582L18.998 7.12207L19.0947 7.03711C19.33 6.85146 19.6247 6.75003 19.9287 6.75Z"
                              fill="black"
                              stroke="black"
                              stroke-width="0.5"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-8 w-[90%] gap-[30px]">
                    <button
                      onClick={() => {
                        setIsSelected(false);
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-center h-[50px] w-[132px] bg-transparent text-white text-center font-[kanit] text-[16px] font-[500] leading-[16px] uppercase transition-all hover:opacity-90 active:scale-[0.98] border border-[0.761px] border-white"
                    >
                      Skip
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        if (!isSelected) return;
                        dispatch(setAddOnDetails(true));
                        setIsSelected(true);
                      }}
                      className="flex items-center justify-center h-[50px] w-[132px] bg-[#2DDE28] text-black text-center font-[kanit] text-[16px] font-[500] leading-[16px] uppercase transition-all hover:opacity-90 active:scale-[0.98]"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <button
        onClick={continueToMember}
        className="flex items-center justify-center h-[42px] pt-[12.801px] pb-[13.199px] w-full 
             bg-[#2DDE28] text-black text-center font-[kanit] text-[16px] font-medium leading-[16px] 
             uppercase   transition-all hover:opacity-90 active:scale-[0.98]"
      >
        Continue
      </button>
    </div>
  );
};

export default MembershipPlan;
