import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: `${USERS_URL}/me`,
        method: "GET",
      }),
    }),
    updateDetails: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/me`,
        method: 'PUT',
        body: data,
        formData: true,
      }),
    }),
    getUserCourses: builder.query({
      query: (userId) => ({
        url: `/users/${userId}/courses`,
        method: 'GET',
      }),
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useLogoutMutation,
  useProfileQuery,  
  useUpdateDetailsMutation,
  useGetUserCoursesQuery,
} = userApiSlice;
