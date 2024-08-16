import { COURSES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => COURSES_URL,
      keepUnusedDataFor: 5,
    }),
    getCourseDetails: builder.query({
      query: (courseId) => {
        if (!courseId) {
          throw new Error('Course ID is undefined');
        }
        return `${COURSES_URL}/${courseId}`;
      },
      keepUnusedDataFor: 5,
    }),
    createCourse: builder.mutation({
      query: () => ({
        url: `${COURSES_URL}`,
        method: POST,
      }),
      invalidatesTags: ["Courses"]
    }),
  }),
});

export const { 
  useGetCoursesQuery, 
  useGetCourseDetailsQuery, 
  useCreateCourseMutation } 
= coursesApiSlice;