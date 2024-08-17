import { COURSES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const lecturesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addLecture: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `${COURSES_URL}/${courseId}/lectures`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Courses"],
    }),
  }),
});

export const {
  useAddLectureMutation  
} = lecturesApiSlice;