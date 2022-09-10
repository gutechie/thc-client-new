import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store";
import {config} from "../constants/config";

export const api = createApi({
    reducerPath: "thcApi",
    baseQuery: fetchBaseQuery({
        baseUrl: config.API.BASE_URL,
        prepareHeaders: (headers, {getState}) => {
            headers.set("Accept", "application/json");
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    refetchOnFocus: true,
    keepUnusedDataFor: 0,
    endpoints: () => ({}),
    tagTypes: [
        "challenges",
        "ownedChallenges",
        "memberChallenges",
        "teams",
        "ownedTeams",
        'memberTeams',
        "invitedTeams",
        "invitedChallenges",
        "users",
    ],
});
