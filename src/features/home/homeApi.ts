import { api } from "../../services/api";

export interface HomeData {
    metric_data: MetricDatum[];
    chart_data:  ChartDatum[];
}

export interface ChartDatum {
    day:     string;
    value: number;
}

export interface MetricDatum {
    metric_name: string;
    value:       number | string;
    unit:        string;
}


const homeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getHomeData: build.query<HomeData, void>({
      query: () => ({
        url: "user/metrics",
      }),
    }),
  }),
});

export const { useGetHomeDataQuery } = homeApi;
