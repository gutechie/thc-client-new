import {api} from "../../services/api";

const masterApi = api.injectEndpoints({
    endpoints: (build) => ({
        getMasterMetrics: build.query<any, string>({
            query: (queryParams) => ({
                url: `masters/metrics?${queryParams}`
            }),
        }),
        getMasterCriteria: build.query<any, string>({
            query: (queryParams) => ({
                url: `masters/comparable-criteria?${queryParams}`
            }),
        }),
    }),
});

export const {useGetMasterMetricsQuery, useGetMasterCriteriaQuery} = masterApi;
