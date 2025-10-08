import { apiSlice } from "../apiSlice";

export const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendMessage: builder.mutation({
            query: (data) => ({
                url: "/messages/send",
                method: "POST",
                body: data,
            }),
        }),
        getMessages: builder.query({
            query: (otherUserId) => ({
                url: `/messages/${otherUserId}`,
                method: "GET",
            }),
            
        }),
    }),
});

export const { useSendMessageMutation, useGetMessagesQuery } = messageApi;
