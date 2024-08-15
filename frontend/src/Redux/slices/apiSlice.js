import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = async (args, api, extraOptions) => {
    const token = api.getState().auth.userInfo?.token; // Get the token from the Redux state
  
    const result = await fetchBaseQuery({
      baseUrl: BASE_URL,
      prepareHeaders: (headers) => {
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
    })(args, api, extraOptions);
  
    return result;
  };
  

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Courses", "Users"],
    endpoints: (builder) => ({}),
});
