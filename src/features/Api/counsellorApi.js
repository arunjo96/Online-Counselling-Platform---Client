import { apiSlice } from "../apiSlice";

export const counsellorApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        upsertProfile: builder.mutation({
            query: (data) => {
                const isFormData = data instanceof FormData;
                
                return {
                    url: "/counsellors/profile",
                    method: "POST",
                    body: data,
                    formData: isFormData,
                };
            },
            invalidatesTags: (result) => [
                'Counsellors', 
                { type: 'Counsellors', id: 'LIST' },
                { type: 'Counsellors', id: result?.profile?._id || 'CURRENT' }
            ],
        }),
        
        getAllProfiles: builder.query({
            query: () => "/counsellors",
            keepUnusedDataFor: 30,
            providesTags: (result) => 
                result?.profiles
                    ? [
                        'Counsellors',
                        { type: 'Counsellors', id: 'LIST' },
                        ...result.profiles.map(profile => ({ 
                            type: 'Counsellors', 
                            id: profile._id 
                        }))
                    ]
                    : ['Counsellors', { type: 'Counsellors', id: 'LIST' }],
            transformResponse: (response) => {
                if (!response || !response.profiles || !Array.isArray(response.profiles)) {
                    return { profiles: [] };
                }
                return response;
            },
            extraOptions: {
                maxRetries: 3,
            },
        }),
        
        getProfileById: builder.query({
            query: (id) => `/counsellors/${id}`,
            providesTags: (result, error, id) => [
                { type: 'Counsellors', id }
            ],
        }),
    }),
});

export const {
    useUpsertProfileMutation,
    useGetAllProfilesQuery,
    useGetProfileByIdQuery,
} = counsellorApi;
