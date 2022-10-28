import { api } from "../../services/api";
import {ActivityData} from "../../screens";


const activityApi = api.injectEndpoints({
    endpoints: (build) => ({
        getActivities: build.query<any, void>({
            query: () => 'activities'
        }),
        ListUserActivities: build.query<ActivityData, string>({
            query: (queryParams) => `user/activities?${queryParams}`
        })
    }),
    overrideExisting: false
});

export const { useGetActivitiesQuery, useListUserActivitiesQuery } = activityApi