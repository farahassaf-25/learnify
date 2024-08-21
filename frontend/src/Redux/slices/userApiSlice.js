import { USERS_URL, COURSES_URL } from "../constants";
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
        url: `${USERS_URL}/register`,
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
    deleteUserAccount: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/me`,
        method: 'DELETE',
      }),
    }),
    getUserCourses: builder.query({
      query: () => ({
        url: `${USERS_URL}/me/mycourses`,
        method: 'GET',
      }),
    }),
    getCourseAndLectures: builder.query({
      query: (courseId) => ({
        url: `${USERS_URL}/me/mycourses/${courseId}`,
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
  useDeleteUserAccountMutation,
  useGetUserCoursesQuery,
  useGetCourseAndLecturesQuery
} = userApiSlice;
