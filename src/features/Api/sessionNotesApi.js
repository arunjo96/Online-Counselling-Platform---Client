import { apiSlice } from "../apiSlice";

export const sessionNotesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNote: builder.mutation({
      query: (formData) => ({
        url: "/notes",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["SessionNotes"],
    }),
    getNotesByAppointment: builder.query({
      query: (appointmentId) => ({
        url: `/notes/appointment/${appointmentId}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.notes.map((note) => ({ type: "SessionNotes", id: note._id })),
              { type: "SessionNotes", id: "LIST" },
            ]
          : [{ type: "SessionNotes", id: "LIST" }],
    }),
    deleteNote: builder.mutation({
      query: (noteId) => ({
        url: `/notes/${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SessionNotes"],
    }),
  }),
});

export const {
  useAddNoteMutation,
  useGetNotesByAppointmentQuery,
  useDeleteNoteMutation,
} = sessionNotesApi;
