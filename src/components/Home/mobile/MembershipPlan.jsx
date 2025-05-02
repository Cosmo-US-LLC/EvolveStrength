import React, { useContext, useEffect, useState } from "react";
import StepIndicator from "./common/StepIndicator";
import MembershipVancouver from "./common/MembershipVancouver";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useScrollDirection from "../../../hooks/useScrollDirection";

const MembershipPlan = ({ selectedPlan, setSelectedPlan }) => {
  const [location, setLocation] = useState(null);
  const [startDate, setStartDate] = useState(null);
  console.log("location", location);
  const [planData, setPlanData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let loc = params.get("location");
    let startD = params.get("startDate");
    setStartDate(new Date(startD));

    if (loc && loc.startsWith("0")) {
      loc = loc.slice(1);
    }

    if (loc) {
      setLocation(loc);
    }
  }, []);

  useEffect(() => {
    const getClubInfo = async () => {
      try {
        console.log(import.meta.env.VITE_APP_API_URL);
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/getClubInfo?location=${location}`
        );
        const data = await response.json();

        const planDataResponses = await Promise.all(
          data?.plans?.map((club) => {
            return fetch(
              `${
                import.meta.env.VITE_APP_API_URL
              }/getPlanDetails?location=${location}&planId=${club.planId}`
            )
              .then((res) => res.json())
              .catch((err) => {
                console.error(
                  `Error fetching plan for planId ${club.planId}:`,
                  err
                );
                return null;
              });
          })
        );

        setPlanData(planDataResponses);
        console.log("planDataResponses", planDataResponses);
        localStorage.setItem(
          "noContractSubtotal",
          planDataResponses?.[0]?.downPayments?.[0]?.subTotal
        );
        localStorage.setItem(
          "contractSubtotal",
          planDataResponses?.[1]?.downPayments?.[0]?.subTotal
        );
        localStorage.setItem(
          "noContractTax",
          planDataResponses?.[0]?.downPayments?.[0]?.tax
        );
        localStorage.setItem(
          "contractTax",
          planDataResponses?.[1]?.downPayments?.[0]?.tax
        );
        localStorage.setItem(
          "noContractTotal",
          planDataResponses?.[0]?.downPayments?.[0]?.total
        );
        localStorage.setItem(
          "contractTotal",
          planDataResponses?.[1]?.downPayments?.[0]?.total
        );
      } catch (error) {
        console.error("Error fetching club information:", error.message);
      }
    };

    if (location) {
      getClubInfo();
    }
  }, [location]);

  // console.log(planData);
  const selectedLocation = Cookies.get("location");

  function continueToMember() {
    navigate("/member-details");
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-[80px] pb-[30px] flex flex-col gap-8">
      <StepIndicator
        step={1}
        totalSteps={3}
        title="Choose Your Plan"
        subtitle="Pick the membership that fits you best and choose your start date."
      />

      <MembershipVancouver
        step={1}
        startDate={startDate}
        planData={selectedPlan === "monthly" ? planData[0] : planData[1]}
      />

      <div className="flex flex-col">
        <span className="text-white font-[kanit] text-[44px] font-[700] leading-[42px] uppercase">
          Your membership at
        </span>

        <span className="text-[#2DDE28] font-[kanit] text-[50px] font-[700] leading-[42px] uppercase">
          {selectedLocation}
        </span>
      </div>

      <div className="flex flex-col">
        <p className="mb-2 text-white text-[16px] font-[vazirmatn] font-normal leading-[25.2px]">
          Choose your pricing plan
        </p>

        <div className="flex p-1 overflow-hidden border border-white">
          <button
            onClick={() => setSelectedPlan("monthly")}
            className={`flex items-center justify-center gap-[10px]
              h-[38px] px-[10px] py-[10px] flex-1
              text-[14px] font-[vazirmatn] font-medium leading-[25.2px]
              uppercase transition-all
              ${
                selectedPlan === "monthly"
                  ? "bg-[#2DDE28] text-black"
                  : "text-white bg-transparent"
              }`}
          >
            MONTH TO MONTH
          </button>

          <button
            onClick={() => setSelectedPlan("yearly")}
            className={`flex items-center justify-center gap-[10px]
              h-[38px] px-[10px] py-[10px] flex-1
              text-[14px] font-[vazirmatn] font-normal leading-[25.2px]
              uppercase transition-all
              ${
                selectedPlan === "yearly"
                  ? "bg-[#2DDE28] text-black"
                  : "text-white bg-transparent"
              }`}
          >
            1 YEAR CONTRACT
          </button>
        </div>
      </div>

      <div className="">
        {selectedPlan === "monthly" ? (
          <>
            <p className="text-white font-[kanit] text-[16px] font-[600] leading-[16px] uppercase mb-1">
              BI-WEEKLY
            </p>

            <p className="text-[#2DDE28] font-[vazirmatn] text-[50px] font-[500] leading-[68px] mb-2">
              {/* $34.99 */}
              {planData[0]?.totalContractValue || "$--.--"}
            </p>

            <p className="text-[#999999] font-[vazirmatn] text-[16px] font-normal leading-[24px] mb-4">
              Experience personalized training, group classes, and essential
              resources.
            </p>
          </>
        ) : (
          <>
            <p className="text-white font-[kanit] text-[16px] font-[600] leading-[16px] uppercase mb-1">
              BI-WEEKLY
            </p>

            <p className="text-[#2DDE28] font-[vazirmatn] text-[50px] font-[500] leading-[68px] mb-2">
              {/* $899.00 */}
              {planData[1]?.totalContractValue || "$--.--"}
            </p>

            <p className="text-[#999999] font-[vazirmatn] text-[16px] font-normal leading-[24px] mb-4">
              Best value — save more with an annual commitment.
            </p>
          </>
        )}
        <hr className="mb-4 border-white/20" />
        <ul className="space-y-4">
          {[
            "$0 Enrollment Fee",
            "$0 Maintenance fee",
            "Personalized assessment",
            "Access to all locations",
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
