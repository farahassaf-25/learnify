import { COURSES_URL, USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const lecturesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addLecture: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `${USERS_URL}/me/create-course/${courseId}/add-lectures`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Courses"],
    }),
    editLectures: builder.mutation({
      query: ({ data, courseId, lectureId }) => ({
        url: `${USERS_URL}/me/mycourses/${courseId}/edit-lectures/${lectureId}`,
        method: 'PUT',
        body: data,
      }),
    }),    
    deleteLecture: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `${USERS_URL}/me/mycourses/${courseId}/edit-lectures/${lectureId}`,
        method: 'DELETE',
      }),
    }),    
  }),
});

export const {
  useAddLectureMutation,
  useEditLecturesMutation,
  useDeleteLectureMutation  
} = lecturesApiSlice;