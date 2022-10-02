import {api} from "../../services/api";
import {BaseQueryMeta, BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";

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
                url: 'user',
                'method': 'GET',
            })
        })
    }),
    overrideExisting: false,
});

export const {useGetAllUsersQuery, useGetCurrentUserQuery} = userApi;
