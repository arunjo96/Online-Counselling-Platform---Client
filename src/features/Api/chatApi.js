import { apiSlice } from "../apiSlice";

export const chatApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
         getMessages: builder.query({
      query: (otherUserId) => ({
        url: `/messages/${otherUserId}`,
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),
     sendMessage: builder.mutation({
      query: (data) => ({
        url: "/messages/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
    })
});

export const {useGetMessagesQuery, useSendMessageMutation} = chatApi