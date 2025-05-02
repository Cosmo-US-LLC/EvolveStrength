import { createSlice } from "@reduxjs/toolkit";
import { plansApi } from "../services/plan";

// Define your initial state
const initialState = {
  plan: "monthly",
  clubLocation: "",
  clubLocationPostal: null,
  clubPlans: [],
  clubPlanMonthly: null,
  clubPlanYearly: null,
  startDate: "",
  userInfo: null,
  isLoading: false,
  error: null,
};

// Create a slice
const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlan(state, action) {
      state.plan = action.payload;
    },
    setClubLocation(state, action) {
      state.clubLocation = action.payload;
    },
    setClubLocationPostal(state, action) {
      state.clubLocationPostal = action.payload;
    },
    setClubPlans(state, action) {
      state.clubPlans = action.payload;
    },
    setClubPlanMonthly(state, action) {
      state.clubPlanMonthly = action.payload;
    },
    setClubPlanYearly(state, action) {
      state.clubPlanYearly = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    resetPlan: (state) => {
      state.plan = "monthly";
      state.isLoading = false;
      state.error = null;
    },
    resetClubLocation: (state) => {
      state.clubLocation = "";
      state.isLoading = false;
      state.error = null;
    },
    resetClubLocationPostal: (state) => {
      state.clubLocationPostal = null;
      state.isLoading = false;
      state.error = null;
    },
    resetClubPlans: (state) => {
      state.clubPlans = [];
      state.isLoading = false;
      state.error = null;
    },
    resetClubPlanMonthly: (state) => {
      state.clubPlanMonthly = null;
      state.isLoading = false;
      state.error = null;
    },
    resetClubPlanYearly: (state) => {
      state.clubPlanYearly = null;
      state.isLoading = false;
      state.error = null;
    },
    resetStartDate: (state) => {
      state.startDate = "";
      state.isLoading = false;
      state.error = null;
    },
    resetUserInfo: (state) => {
      state.userInfo = null;
      state.isLoading = false;
      state.error = null;
    },
    resetState: (state) => {
      state.plan = "monthly";
      state.clubLocation = "";
      state.clubLocationPostal = null;
      state.clubPlans = [];
      state.clubPlanMonthly = null;
      state.clubPlanYearly = null;
      state.startDate = "";
      state.userInfo = null
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fulfilled query for getClubPlans
      .addMatcher(
        plansApi.endpoints.getClubPlans.matchFulfilled,
        (state, action) => {
          state.clubPlans = action.payload.plans;
          state.clubPlanMonthly = null;
          state.clubPlanYearly = null;
          state.isLoading = false;
        }
      )
      // Handle error state for getClubPlans
      .addMatcher(
        plansApi.endpoints.getClubPlans.matchRejected,
        (state, action) => {
          state.error = action.error;
          state.isLoading = false;
        }
      )
      // Similarly handle other actions as needed (getClubPlanDetails etc)
      .addMatcher(
        plansApi.endpoints.getClubPlanDetails.matchFulfilled,
        (state, action) => {
        //   state.clubPlanDetails = action.payload;
          state.isLoading = false;
        }
      )
      .addMatcher(
        plansApi.endpoints.getClubPlanDetails.matchRejected,
        (state, action) => {
          state.error = action.error;
          state.isLoading = false;
        }
      );
  },
});

// Export actions and reducer
export const {
  setPlan,
  setClubLocation,
  setClubLocationPostal,
  setClubPlans,
  setClubPlanMonthly,
  setClubPlanYearly,
  setStartDate,
  setUserInfo,
  setLoading,
  setError,
  resetPlan,
  resetClubLocation,
  resetClubLocationPostal,
  resetClubPlans,
  resetClubPlanMonthly,
  resetClubPlanYearly,
  resetStartDate,
  resetUserInfo,
  resetState,
} = planSlice.actions;
export default planSlice.reducer;
