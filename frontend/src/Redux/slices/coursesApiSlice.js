import { COURSES_URL, USERS_URL } from "../constants";
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
        url: `${USERS_URL}/me/create-course`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Courses"],
    }),
    editCourse: builder.mutation({
      query: ({ data, courseId }) => ({
        url: `${USERS_URL}/me/mycourses/${courseId}/edit-course`,  
        method: 'PUT',
        body: data,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `${USERS_URL}/me/mycourses/${courseId}/edit-course`,  
        method: 'DELETE',
      }),
    }),    
  }),
});

export const { 
  useGetCoursesQuery, 
  useGetCourseDetailsQuery, 
  useCreateCourseMutation,
  useEditCourseMutation,
  useDeleteCourseMutation
} = coursesApiSlice;
