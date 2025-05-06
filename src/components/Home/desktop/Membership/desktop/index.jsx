import React, { useEffect, useState } from "react";
import StepperDesktop from "../../commen/StepperDesktop";
import MembershipPlanSelector from "./MembershipPlanSelector";
import MembershipSummaryBoxDesktop from "./MembershipSummaryBoxDesktop";
import { useNavigate } from "react-router-dom";
import useScrollDirection from "../../../../../hooks/useScrollDirection";
import Loader from "../../../../Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  plansApi,
  useGetClubPlansQuery,
} from "../../../../../redux/services/plan";
import {
  resetClubPlanMonthly,
  resetClubPlanYearly,
  setClubPlanMonthly,
  setClubPlanYearly,
  setClubPlans,
} from "../../../../../redux/slices/planSlice";

function MembershipDesktop() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const scrollDirection = useScrollDirection();
  const dispatch = useDispatch();
  const {
    clubLocation,
    clubLocationPostal,
    clubPlans,
  } = useSelector((state) => state.plan);
  const {
    data,
    error: queryError,
    isLoading: queryLoading,
  } = useGetClubPlansQuery(clubLocationPostal);

  useEffect(() => {
    if (!clubLocationPostal) {
      navigate(`/`);
    }
    dispatch(resetClubPlanMonthly());
    dispatch(resetClubPlanYearly());
  }, []);

  useEffect(() => {
    const fetchClubPlanDetails = async () => {
      setLoading(true);
      if (data && data?.plans) {
        dispatch(setClubPlans(data?.plans));
        for (let [index, club] of clubPlans.entries()) {
          try {
            const result = await dispatch(
              plansApi.endpoints.getClubPlanDetails.initiate({
                location: clubLocationPostal,
                planId: club.planId,
              })
            ).unwrap();

            if (index === 0) {
              dispatch(setClubPlanMonthly(result));
            } else {
              dispatch(setClubPlanYearly(result));
            }
          } catch (err) {
            console.error(
              `Failed to fetch plan details for club ${club.planId}:`,
              err
            );
          } finally {
            setLoading(false);
          }
        }
      }
    };

    fetchClubPlanDetails();
  }, [data, dispatch]);

  const handleJoinNow = () => {
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
          {clubLocation}
        </p>

        <div className="flex flex-row justify-between mt-16">
          <MembershipPlanSelector />

          <div>
            <MembershipSummaryBoxDesktop />
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
