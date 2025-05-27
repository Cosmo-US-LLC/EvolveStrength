import React, { useEffect, useState } from "react";
import locationImg from "../../../assets/images/mobile/location-details/evolve-strength-bg.webp";

import healthWellnessIcon from "../../../assets/images/mobile/location-details/health&wellness.svg";
import personalTrainersIcon from "../../../assets/images/mobile/location-details/personal-trainers.svg";
import equipmentIcon from "../../../assets/images/mobile/location-details/equipment.svg";
import locationIcon from "../../../assets/images/mobile/location-details/location.svg";

import { useLocation, useNavigate } from "react-router-dom";
import EventDatePicker from "../../../utils/EventDatePicker";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  plansApi,
  useGetClubPlanDetailsQuery,
  useGetClubPlansQuery,
} from "../../../redux/services/plan";
import {
  resetClubPlanMonthly,
  resetClubPlanYearly,
  setClubPlanMonthly,
  setClubPlans,
  setClubPlanYearly,
  setStartDate,
} from "../../../redux/slices/planSlice";
import { formatDate } from "../../../libs/utils";

const LocationDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    clubLocation,
    clubLocationPostal,
    clubPlans,
    clubPlanMonthly,
    clubPlanYearly,
    isLoading,
    error,
  } = useSelector((state) => state.plan);
  const {
    data,
    error: queryError,
    isLoading: queryLoading,
  } = useGetClubPlansQuery(clubLocationPostal);
  const [localLoad, setLocalLoad] = useState(true);

  useEffect(() => {
    if (data && data?.plans) {
      dispatch(setClubPlans(data?.plans)); // Update the Redux store with the fetched data
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!clubLocationPostal) {
      navigate(`/`);
    }
    dispatch(resetClubPlanMonthly());
    dispatch(resetClubPlanYearly());
  }, []);
  useEffect(() => {
    if (clubPlans?.length > 1) {
      setLocalLoad(false);
    }
  }, [clubPlans]);

  useEffect(() => {
    if (clubPlanMonthly && clubPlanYearly && !localLoad) {
      navigate(`/membership`);
      // navigate(`/membership-plan`);
    }
  }, [clubPlanMonthly, clubPlanYearly]);
  // const selectedLocation = Cookies.get("location");

  const spaceIndex = clubLocation.indexOf(" ");
  const locationFirstPart = clubLocation.slice(0, spaceIndex);
  const locationSecondPart = clubLocation.slice(spaceIndex + 1);

  const [selectedDate, setSelectedDate] = useState(null);
  const facilities = [
    { icon: healthWellnessIcon, label: "Health & Wellness" },
    { icon: personalTrainersIcon, label: "Top Personal Trainers" },
    { icon: equipmentIcon, label: "Top of the Line Equipment" },
    { icon: locationIcon, label: "Access to All Locations" },
  ];

  const handleContinue = async () => {
    setLocalLoad(true);
    dispatch(setStartDate(formatDate(selectedDate)));

    for (let [index, club] of clubPlans.entries()) {
      try {
        const result = await dispatch(
          plansApi.endpoints.getClubPlanDetails.initiate({
            location: clubLocationPostal,
            planId: club.planId,
          })
        ).unwrap();

        {
          clubLocationPostal === 40248 || clubLocationPostal === 40327
            ? // If the postal code matches, check the index
              index === 0
              ? dispatch(setClubPlanYearly(result))
              : dispatch(setClubPlanMonthly(result))
            : // If the postal code doesn't match, check the index
            index === 0
            ? dispatch(setClubPlanMonthly(result))
            : dispatch(setClubPlanYearly(result));
        }

        // navigate(`/membership-plan${searchParams}&startDate=${formattedDate}`);
      } catch (err) {
        console.error(
          `Failed to fetch plan details for club ${club.planId}:`,
          err
        );
      } finally {
        setLocalLoad(false);
      }
    }
  };

  return (
    <div className="min-h-screen pt-[74px] bg-black text-white px-4 flex flex-col">
      <div>
        <span className="text-white font-[kanit] text-[50px] leading-[42px] font-bold uppercase">
          {locationFirstPart}
        </span>
        <br />
        <span className="text-[#2DDE28] font-[kanit] text-[50px] leading-[42px] font-bold uppercase">
          {locationSecondPart}
        </span>
      </div>

      <div className="border border-white/40 bg-black/30 backdrop-blur-[22.27px] my-6 p-3 flex flex-col gap-4">
        <div className="w-full">
          <img src={locationImg} alt="Location" className="w-full rounded-md" />
        </div>
        <div className="text-white font-[kanit] text-[18px] font-[500] uppercase tracking-[-0.791px]">
          Facilities
        </div>

        <ul className="text-[13px] flex flex-col gap-2">
          {facilities.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 px-2 py-[10px] 
                 border-[0.158px] border-transparent bg-white/0 "
                //  border-[0.158px] border-[#3A3A3A] bg-white/5 "
            >
              <img src={item.icon} alt={item.label} className="h-7 w-7" />
              <span className="text-[#F8F8F8] font-[vazirmatn] text-center text-[12px] font-[500] leading-[21.512px] uppercase">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <EventDatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        title={"Choose your start date"}
      />

      <button
        onClick={handleContinue}
        // onClick={() => navigate("/membership-plan")}
        className="flex items-center justify-center h-[42px] 
             px-0 py-[12.801px] border border-[#2DDE28] font-[kanit] 
             bg-[#2DDE28] text-black text-[16px] font-[500] 
             uppercase mb-5 disabled:opacity-60"
        disabled={selectedDate == null || localLoad}
      >
        Continue
      </button>
    </div>
  );
};

export default LocationDetails;
