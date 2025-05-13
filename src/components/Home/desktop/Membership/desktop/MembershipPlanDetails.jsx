import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddOnDetails } from "../../../../../redux/slices/planSlice";

const MembershipPlanDetails = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const ref = useRef();
  const { plan, clubPlanMonthly, clubPlanYearly, addOnDetails } = useSelector(
    (state) => state.plan
  );

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
  return (
    <div className="max-w-[1280px]">
      {!addOnDetails ? (
        <div className="pt-8">
          <p className="text-white font-[400] text-[16px] leading-[25px] font-[vazirmatn]">
            Choose Any of our Additional Services
          </p>
          <div
            className="flex mt-3 gap-5 items-center"
            onClick={() => setIsOpen(true)}
          >
            <button className="w-[114px] bg-[#2DDE28] rounded-full flex justify-center items-center text-black text-[16px] font-medium h-[60px] button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.9998 0.868164C13.0658 0.868164 13.9309 1.73327 13.9309 2.7992V10.1371H21.2688C21.7809 10.1371 22.2721 10.3406 22.6343 10.7027C22.9964 11.0649 23.1998 11.556 23.1998 12.0682C23.1998 12.5803 22.9964 13.0715 22.6343 13.4336C22.2721 13.7958 21.7809 13.9992 21.2688 13.9992H13.9309V21.3372C13.9309 21.8493 13.7274 22.3405 13.3653 22.7026C13.0031 23.0648 12.512 23.2682 11.9998 23.2682C11.4877 23.2682 10.9965 23.0648 10.6344 22.7026C10.2722 22.3405 10.0688 21.8493 10.0688 21.3372V13.9992H2.73084C2.2187 13.9992 1.72753 13.7958 1.36539 13.4336C1.00325 13.0715 0.799805 12.5803 0.799805 12.0682C0.799805 11.556 1.00325 11.0649 1.36539 10.7027C1.72753 10.3406 2.2187 10.1371 2.73084 10.1371H10.0688V2.7992C10.0688 1.73327 10.9339 0.868164 11.9998 0.868164Z"
                  fill="black"
                />
              </svg>
            </button>
            <p className="text-white font-[400] text-[20px] leading-[25px] font-[vazirmatn] uppercase">
              add-ons
            </p>
          </div>
        </div>
      ) : (
        <div className="pt-8">
          <p
            className="text-white font-[400] text-[16px] font-[vazirmatn]"
            style={{ lineHeight: "25.2px" }}
          >
            Our Additional Services
          </p>
          <div className="relative w-[70%] mt-3">
            <div
              className="flex gap-5 items-center justify-between bg-[#171717] border border-1 border-[#464646]"
              style={{ padding: "18px 23px 13px" }}
            >
              <p className="text-white font-[400] text-[20px] leading-[24px] font-[Vazirmatn] capitalize">
                add-ons:{" "}
                {plan == "monthly"
                  ? clubPlanMonthly?.schedules?.[1]?.profitCenter || "$--.--"
                  : clubPlanYearly?.schedules?.[1]?.profitCenter || "$--.--"}
              </p>
              <div className="flex gap-3 items-center">
                <p className="text-white font-[400] text-[20px] leading-[24px] font-[Vazirmatn] capitalize">
                  {plan == "monthly"
                    ? clubPlanMonthly?.schedules?.[1]?.scheduleAmount ||
                      "$--.--"
                    : clubPlanYearly?.schedules?.[1]?.scheduleAmount ||
                      "$--.--"}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                dispatch(setAddOnDetails(false));
                setIsSelected(false);
              }}
              className="absolute -top-3 -right-3 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="34"
                viewBox="0 0 33 34"
                fill="none"
              >
                <path
                  d="M24.6569 25.3759C29.1479 20.8848 29.1479 13.6034 24.6569 9.11241C20.1659 4.62138 12.8845 4.62138 8.39345 9.11241C3.90242 13.6034 3.90242 20.8848 8.39345 25.3759C12.8845 29.8669 20.1659 29.8669 24.6569 25.3759Z"
                  fill="black"
                  stroke="#7C7C7C"
                />
                <path
                  d="M12.694 13.4129C13.0587 13.0483 13.6505 13.0483 14.0152 13.4129L16.5253 15.923L19.0354 13.4129C19.2106 13.2377 19.4482 13.1393 19.696 13.1393C19.9438 13.1393 20.1814 13.2377 20.3566 13.4129C20.5317 13.5881 20.6302 13.8257 20.6302 14.0734C20.6302 14.3212 20.5317 14.5588 20.3566 14.734L17.8464 17.2441L20.3566 19.7543C20.5318 19.9295 20.6302 20.1671 20.6302 20.4148C20.6302 20.6626 20.5317 20.9002 20.3566 21.0754C20.1814 21.2506 19.9438 21.349 19.696 21.349C19.4482 21.349 19.2106 21.2506 19.0354 21.0754L16.5253 18.5653L14.0152 21.0754C13.84 21.2506 13.6024 21.349 13.3546 21.349C13.1069 21.349 12.8692 21.2506 12.694 21.0754C12.5189 20.9002 12.4204 20.6626 12.4204 20.4148C12.4204 20.1671 12.5189 19.9295 12.694 19.7543L15.2042 17.2441L12.694 14.734C12.3294 14.3694 12.3294 13.7775 12.694 13.4129Z"
                  fill="#FF0000"
                />
              </svg>
            </button>
          </div>
          {/* <div
            className="flex mt-3 gap-5 items-center"
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
            <div className="flex flex-col justify-center items-center mt-10">
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
                <div className="flex justify-center flex-col">
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
                        className={`w-[39.603px] bg-[#2DDE28]
                         rounded-full flex justify-center items-center text-black text-[16px] font-medium h-[39.603px] button gap-[6.601px]`}
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

              <div className="flex justify-center items-center mt-8 w-[90%] gap-[30px]">
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
  );
};

export default MembershipPlanDetails;
