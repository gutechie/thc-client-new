import { api } from "../../services/api";


const activityApi = api.injectEndpoints({
    endpoints: (build) => ({
        getActivities: build.query<any, void>({
            query: () => 'activities'
        })
    }),
    overrideExisting: false
});

export const { useGetActivitiesQuery } = activityApi