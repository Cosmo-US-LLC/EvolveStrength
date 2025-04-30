import React, { useEffect, useState } from "react";
import membership_bg from "../../../../../assets/images/desktop/membership_bg.webp";
// import StepperDesktop from "../../Home/desktop/commen/StepperDesktop";
import StepperDesktop from "../../commen/StepperDesktop";
import MembershipPlanSelector from "./MembershipPlanSelector";
import MembershipSummaryBoxDesktop from "./MembershipSummaryBoxDesktop";
import { useNavigate } from "react-router-dom";

function MembershipDesktop({selectedPlan, setSelectedPlan}) {
  const [location, setLocation] = useState(null);
  console.log("location", location)
  const [planData, setPlanData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let loc = params.get("location");

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
        const response = await fetch(
          `http://localhost:3002/api/getClubInfo?location=${location}`
        );
        const data = await response.json();

        const planDataResponses = await Promise.all(
          data?.plans?.map((club) => {
            return fetch(
              `http://localhost:3002/api/getPlanDetails?location=${location}&planId=${club.planId}`
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
        console.log("planDataResponses", planDataResponses)
        localStorage.setItem("noContractSubtotal", planDataResponses?.[0]?.downPayments?.[0]?.subTotal)
        localStorage.setItem("contractSubtotal", planDataResponses?.[1]?.downPayments?.[0]?.subTotal)
        localStorage.setItem("noContractTax", planDataResponses?.[0]?.downPayments?.[0]?.tax)
        localStorage.setItem("contractTax", planDataResponses?.[1]?.downPayments?.[0]?.tax)
        localStorage.setItem("noContractTotal", planDataResponses?.[0]?.downPayments?.[0]?.total)
        localStorage.setItem("contractTotal", planDataResponses?.[1]?.downPayments?.[0]?.total)

      } catch (error) {
        console.error("Error fetching club information:", error.message);
      }
    };

    if (location) {
      getClubInfo();
    }
  }, [location]);

  const handleJoinNow = () => {
    navigate(`/about-yourself`);
  };

  return (
    <div className="relative h-screen w-full">
      {/* Fixed Stepper Header */}
      <StepperDesktop stepNumber={1} />

      {/* Background Image */}
      <img
        src={membership_bg}
        alt="membership_bg"
        className="absolute top-0 w-full h-auto -z-10"
      />

      <div className="pt-[270px] max-w-[1280px] mx-auto">
        <p className="text-white font-kanit text-[79px] font-bold leading-[68px] uppercase">
          Your membership at
        </p>
        <p className="text-[#2DDE28] font-kanit text-[79px] font-bold leading-[68px] uppercase">
          Vancouver, The Post
        </p>
        {/* Plan Selector Tabs */}
        <div className="flex flex-row justify-between mt-8">
          <MembershipPlanSelector
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            planData={planData}
          />
          {/* Final Details */}
          <div>
            <MembershipSummaryBoxDesktop
              planData={planData}
              selectedPlan={selectedPlan}
            />
            <div className="flex justify-end items-end mt-6 w-full">
              <button
                onClick={handleJoinNow}
                className="button mt-6 bg-[#2DDE28] text-black text-[16px] font-medium w-[139px] h-[42px]"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembershipDesktop;
