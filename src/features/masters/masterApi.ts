import { api } from "../../services/api";

const masterApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMasterMetrics: build.query<any, string>({
      query: (queryParams) => ({
        url: `masters/metrics?${queryParams}`,
      }),
    }),
    getMasterCriteria: build.query<any, string>({
      query: (queryParams) => ({
        url: `masters/comparable-criteria?${queryParams}`,
      }),
    }),
    getMasterCriterionValues: build.query<any, number>({
      query: (criterionId) => ({
        url: `masters/comparable-criteria/${criterionId}/values`,
      }),
    }),
  }),
});

export const {
  useGetMasterMetricsQuery,
  useGetMasterCriteriaQuery,
  useGetMasterCriterionValuesQuery,
} = masterApi;
