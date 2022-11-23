import { api } from "../../services/api";

const comparisonApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSelfPastData: build.query({
      query: (metric) => `comparison/self/${metric}`,
    }),
    getOthersData: build.query({
      query: ({ metric, scale }) => `comparison/other/${metric}/${scale}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetSelfPastDataQuery, useGetOthersDataQuery } = comparisonApi;
