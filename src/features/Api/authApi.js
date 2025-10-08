
import { apiSlice } from "../apiSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: data,
            }),
        }),
        resetPassword: builder.mutation({
            query: ({ token, newPassword }) => ({
                url: `/auth/reset-password/${token}`,
                method: "POST",
                body: { newPassword },
            }),
        })
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;
