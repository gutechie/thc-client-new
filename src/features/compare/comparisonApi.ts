
import { api } from "../../services/api";


const comparisonApi = api.injectEndpoints({
    endpoints: (build) => ({
        getSelfPastData: build.query<any, void>({
            query: (metric) => `comparison/self/${metric}`
        })
    }),
    overrideExisting: false
});

export const { useGetSelfPastDataQuery } = comparisonApi