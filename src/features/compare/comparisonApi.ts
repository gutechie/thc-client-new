import { api } from "../../services/api";

const comparisonApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSelfPastData: build.query({
      query: (metric) => `comparison/self/${metric}`,
    }),
    getOthersData: build.query<any, string>({
      query: (queryParams) => `comparisons/others?${queryParams}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetSelfPastDataQuery, useGetOthersDataQuery } = comparisonApi;
