import {useGetMasterMetricsQuery} from "../masters/masterApi";
import {ErrorScreen, Loading} from "../../shared";
import {MultiSelectableBadges} from "./MultiSeletableBadges";

export const MetricsSelector = ({selectedMetrics, handleMetricSelected}) => {
    // first load comparable metrics
    const metricsSearchParams = new URLSearchParams({
        'filter[comparable]': 'true',
        'fields': 'id,name,base_unit',
    })

    const {
        data: metrics,
        isLoading: metricsLoading,
        isError: metricsLoadingError,
        error: metricsError
    } = useGetMasterMetricsQuery(metricsSearchParams.toString())


    if (metricsLoading) {
        return <Loading/>
    }

    if (metricsLoadingError) {
        console.log(metricsError);
        return <ErrorScreen/>
    }

    return <MultiSelectableBadges
        selectables={metrics.data.map(metric => ({id: metric.id, title: metric.name}))}
        selected={selectedMetrics}
        onUpdate={item => handleMetricSelected(item)}
    />
}