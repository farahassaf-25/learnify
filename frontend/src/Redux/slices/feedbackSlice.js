import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const feedbackSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFeedback: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `${USERS_URL}/me/mycourses/${courseId}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Feedback"],
    }),
  }),
});

export const {
    useAddFeedbackMutation
} = feedbackSlice;
