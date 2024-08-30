import { ADMIN_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const adminSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
        query: () => ({
          url: `${ADMIN_URL}/dashboard`,
          method: "GET",
        }),
      }),
  }),
});

export const { 
    useGetDashboardDataQuery
} = adminSlice;
