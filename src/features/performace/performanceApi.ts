
import { api } from "../../services/api";


const performanceApi = api.injectEndpoints({
    endpoints: (build) => ({
        getOthersPerformance: build.query({
            query: (queryParams) => `performance/others/?${queryParams}`
        }),
    }),
    overrideExisting: false
});

export const { useGetOthersPerformanceQuery } = performanceApi