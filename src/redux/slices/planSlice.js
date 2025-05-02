import { createSlice } from '@reduxjs/toolkit';
import { plansApi } from '../services/plan';

// Define your initial state
const initialState = {
  clubPlans: [],
  clubPlanDetails: null,
  isLoading: false,
  error: null,
};

// Create a slice
const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setClubPlans(state, action) {
      state.clubPlans = action.payload;
    },
    setClubPlanDetails(state, action) {
      state.clubPlanDetails = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fulfilled query for getClubPlans
      .addMatcher(plansApi.endpoints.getClubPlans.matchFulfilled, (state, action) => {
        state.clubPlans = action.payload;
        state.isLoading = false;
      })
      // Handle error state for getClubPlans
      .addMatcher(plansApi.endpoints.getClubPlans.matchRejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      // Similarly handle other actions as needed (getClubPlanDetails etc)
      .addMatcher(plansApi.endpoints.getClubPlanDetails.matchFulfilled, (state, action) => {
        state.clubPlanDetails = action.payload;
        state.isLoading = false;
      })
      .addMatcher(plansApi.endpoints.getClubPlanDetails.matchRejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      });
  },
});

// Export actions and reducer
export const { setClubPlans, setClubPlanDetails, setLoading, setError } = planSlice.actions;
export default planSlice.reducer;