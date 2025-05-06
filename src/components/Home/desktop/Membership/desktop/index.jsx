import React, { useEffect, useState } from "react";
import StepperDesktop from "../../commen/StepperDesktop";
import MembershipPlanSelector from "./MembershipPlanSelector";
import MembershipSummaryBoxDesktop from "./MembershipSummaryBoxDesktop";
import { useNavigate } from "react-router-dom";
import useScrollDirection from "../../../../../hooks/useScrollDirection";
import Cookies from "js-cookie";
import Loader from "../../../../Loader";

function MembershipDesktop({ selectedPlan, setSelectedPlan }) {
  const [location, setLocation] = useState(null);
  const [planData, setPlanData] = useState([]);
  const [loading, setLoading] = useState(true)
  console.log("location", planData?.[0]);
  const navigate = useNavigate();
  const scrollDirection = useScrollDirection();
  const selectedLocation = Cookies.get("location");

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
        setLoading(true);
        const response = await fetch(
          `http://138.197.175.219:8081/api/getClubInfo?location=${location}`
        );
        const data = await response.json();

        const planDataResponses = await Promise.all(
          data?.plans?.map((club) => {
            return fetch(
              `http://138.197.175.219:8081/api/getPlanDetails?location=${location}&planId=${club.planId}`
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching club information:", error.message);
        setLoading(true);
      }
    };

    if (location) {
      getClubInfo();
    }
  }, [location]);

  const handleJoinNow = () => {
    if (selectedPlan === "monthly") {
      Cookies.set("planId", planData?.[0]?.planId);
      Cookies.set("planValidation", planData?.[0]?.planValidation);
    } else {
      Cookies.set("planId", planData?.[1]?.planId);
      Cookies.set("planValidation", planData?.[1]?.planValidation);
    }
    navigate(`/about-yourself`);
  };
  if (loading) return <Loader />;
  return (
    <div className="relative w-full membership_bg">
      <StepperDesktop stepNumber={1} scrollDirection={scrollDirection} />

      <div className="pt-[300px] pb-[100px] max-w-[1280px] mx-auto">
        <p className="text-white font-[kanit] text-[79px] font-[700] leading-[66px] tracking-[-1.32ppx] uppercase">
          Your membership at
        </p>
        <p className="text-[#2DDE28] font-[kanit] text-[79px] font-[700] leading-[66px] tracking-[-1.32ppx] uppercase">
          {selectedLocation}
        </p>

        <div className="flex flex-row justify-between mt-16">
          <MembershipPlanSelector
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            planData={planData}
          />

          <div>
            <MembershipSummaryBoxDesktop
              planData={planData}
              selectedPlan={selectedPlan}
            />
          </div>
        </div>
        <div className="flex items-end justify-end w-full mt-4">
          <button
            onClick={handleJoinNow}
            className="button mt-6 bg-[#2DDE28] text-black text-[16px] font-medium w-[139px] h-[42px]"
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default MembershipDesktop;
