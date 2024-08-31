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
    deleteCourseByAdmin: builder.mutation({
      query: (courseId) => ({
        url: `${ADMIN_URL}/dashboard/course/${courseId}`,  
        method: 'DELETE',
      }),
    }),   
    deleteUserByAdmin: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_URL}/dashboard/user/${userId}`,  
        method: 'DELETE',
      }),
    }), 
  }),
});

export const { 
    useGetDashboardDataQuery,
    useDeleteCourseByAdminMutation,
    useDeleteUserByAdminMutation
} = adminSlice;
