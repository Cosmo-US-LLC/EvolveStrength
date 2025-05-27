import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loader from "../Loader";
import { locations } from "../../constant/locationsData";
import {
    resetState,
  setClubLocation,
  setClubLocationPostal,
  setClubPlanMonthly,
  setClubPlans,
  setClubPlanYearly,
  setStartDate,
} from "../../redux/slices/planSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../libs/utils";
import Cookies from "js-cookie";
import { plansApi, useGetClubPlansQuery } from "../../redux/services/plan";

function SetClub() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = searchParams.get("location");

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
  } = useGetClubPlansQuery(location);

  useEffect(() => {
    if (data && data?.plans) {
      dispatch(setClubPlans(data?.plans)); // Update the Redux store with the fetched data
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(resetState())
    if (!location) {
      navigate(`/`);
    }
  }, []);

  async function getClubInfo() {
    const club = locations.find((loc) => loc.postalCode == location);
    console.log(club);
    // return;

    // Setting Club Location and Postal
    Cookies.set("location", club.clubName);
    dispatch(setClubLocation(club.clubName));
    dispatch(setClubLocationPostal(parseInt(club.postalCode)));
  }
  async function getClubPlansInfo() {
    // Setting Plans and Start date
    dispatch(setStartDate(formatDate(new Date())));

    for (let [index, club] of clubPlans?.entries()) {
      try {
        const result = await dispatch(
          plansApi.endpoints.getClubPlanDetails.initiate({
            location: clubLocationPostal,
            planId: club?.planId,
          })
        ).unwrap();

        // console?.log("Setting on index:", index, "result:", result);
        // index === 0
        //   ? dispatch(setClubPlanMonthly(result))
        //   : dispatch(setClubPlanYearly(result));
        result?.planName?.includes("12 Month")
          ? dispatch(setClubPlanYearly(result))
          : dispatch(setClubPlanMonthly(result));

        // navigate(`/membership-plan${searchParams}&startDate=${formattedDate}`);
        navigate(`/membership?location=${location}`);
      } catch (err) {
        console.error(
          `Failed to fetch plan details for club ${club?.planId}:`,
          err
        );
      }
    }
  }

  useEffect(() => {
    if (clubPlans && clubPlans.length > 1) {
      getClubInfo();
    }
  }, [clubPlans]);
  useEffect(() => {
    if (clubLocationPostal && clubPlans && clubPlans.length > 1) {
      getClubPlansInfo();
    }
  }, [clubLocationPostal]);

  return (
    <div>
      {/* {location} */}
      <Loader />
    </div>
  );
}

export default SetClub;
