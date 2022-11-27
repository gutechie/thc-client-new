import {api} from "../../services/api";

const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query<any, string>({
            query: (queryParams) => ({
                url: `users?${queryParams}`,
                method: "GET",
            }),
            providesTags: ["users"],
        }),
        getCurrentUser: build.query<any, void>({
            query: () => ({
                url: "user",
                method: "GET",
            }),
        }),
        saveUserPreference: build.mutation({
            query: preference => ({
                url: 'user/preferences',
                method: 'POST',
                body: preference
            }),
            invalidatesTags: ["preferences"]
        }),
        getUserPreference: build.query({
            query: (searchParams) => ({
                url: `user/preferences?${searchParams}`,
                method: "GET"
            }),
            providesTags: ["preferences"]
        })
    }),
    overrideExisting: false,
});

export const {
    useGetAllUsersQuery,
    useGetCurrentUserQuery,
    useSaveUserPreferenceMutation,
    useGetUserPreferenceQuery
} = userApi;
