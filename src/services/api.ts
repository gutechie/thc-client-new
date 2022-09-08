import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store";

export const api = createApi({
    reducerPath: "thcApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://thehealthycomparison.com/api/v1", // for server
        // baseUrl: "http://10.0.2.2:8000/api/v1", // for emulator
        // baseUrl: "http://192.168.1.2:8000/api/v1",
        // baseUrl: "http://127.0.0.1:8000/api/v1",
        // baseUrl: "https://df83-223-229-176-47.in.ngrok.io/api/v1",
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
