import { apiSlice } from "../apiSlice";

export const appointmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    bookAppointment: builder.mutation({
      query: (data) => ({
        url: "/appointments/book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Appointments"],
    }),
    getMyAppointments: builder.query({
      query: () => ({
        url: "/appointments/myappointments",
        method: "GET",
      }),
      providesTags: ["Appointments"],
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointments/${id}`, 
        method: "DELETE",
      }),
      invalidatesTags: ["Appointments"],
    }),
    getMyConversations: builder.query({
      query: () => ({
        url: "/appointments/conversations",
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),
  }),
});

export const {
  useBookAppointmentMutation,
  useGetMyAppointmentsQuery,
  useDeleteAppointmentMutation,
  useGetMyConversationsQuery,
} = appointmentApi;

