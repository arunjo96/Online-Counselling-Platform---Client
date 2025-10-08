
import { apiSlice } from "../apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCheckoutSession: builder.mutation({
            query: (data) => ({
                url: "/payments/create-checkout-session",
                method: "POST",
                body: data,
            }),
        }),
        confirmPayment: builder.mutation({
            query: (data) => ({
                url: "/payments/confirm-payment",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Appointments'],
        }),
        cancelPayment: builder.mutation({
            query: (data) => ({
                url: "/payments/cancel",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Appointments'],
        })
    }),
});

export const {
    useCreateCheckoutSessionMutation,
    useConfirmPaymentMutation,
    useCancelPaymentMutation,
} = paymentApi;
