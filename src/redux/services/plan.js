// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const plansApi = createApi({
  reducerPath: 'plansApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://138.197.175.219:8081/api" }),
  endpoints: (builder) => ({
    getClubPlans: builder.query({
      query: (location) => `/getClubInfo?location=${location}`,
    }),
    getClubPlanDetails: builder.query({
      query: ({location, planId}) => `/getPlanDetails?location=${location}&planId=${planId}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetClubPlansQuery, useGetClubPlanDetailsQuery } = plansApi;