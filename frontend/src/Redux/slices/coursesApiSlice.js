import { COURSES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => COURSES_URL,
      keepUnusedDataFor: 5,
    }),
    getCourseDetails: builder.query({
      query: (courseId) => `${COURSES_URL}/${courseId}`,
      keepUnusedDataFor: 5,
    }),
    createCourse: builder.mutation({
      query: (formData) => ({
        url: `${COURSES_URL}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Courses"],
    }),
    editCourse: builder.mutation({
      query: ({ data, courseId }) => ({
        url: `${COURSES_URL}/${courseId}/edit`,  
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { 
  useGetCoursesQuery, 
  useGetCourseDetailsQuery, 
  useCreateCourseMutation,
  useEditCourseMutation
} = coursesApiSlice;
