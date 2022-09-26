import {api} from "../../services/api";

export interface HomeData {
    metric_data: MetricDatum[];
    chart_data: ChartDatum[];
}

export interface ChartDatum {
    day: string;
    value: number;
}

export interface MetricDatum {
    metric_name: string;
    value: number | string;
    unit: string;
    color?: string;
    icon?: string;
}

export interface ChartResponse {
    data: ChartDatum[]
}

export interface MetricResponse {
    data: MetricDatum[]
}

const homeApi = api.injectEndpoints({
    endpoints: (build) => ({
        getHomeData: build.query<HomeData, void>({
            query: () => ({
                url: "user/metrics",
            }),
        }),
        getTopPerformersMetrics: build.query<MetricResponse, void>({
            query: () => ({
                url: `competitors/metrics/top`
            })
        }),
        getCompetitorActivity: build.query<ChartResponse, number>({
            query: (activityId) => ({
                url: `competitors/activities/${activityId}`
            })
        })
    }),
});

export const {useGetHomeDataQuery, useGetTopPerformersMetricsQuery, useGetCompetitorActivityQuery} = homeApi;
