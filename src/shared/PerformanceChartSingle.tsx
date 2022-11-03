import {Box, Heading, ScrollView, Text} from "native-base";
import {format} from "date-fns";
import {sentenceCase} from "../helpers";
import {VictoryBar, VictoryChart, VictoryTheme, VictoryAxis} from "victory-native";
import {useGetOthersPerformanceQuery} from "../features/performace/performanceApi";
import {Loading} from "./Loading";
import {ErrorScreen} from "./ErrorScreen";
import { useWindowDimensions } from 'react-native';


export const PerformanceChartSingle = ({dateRange, metric, criterion}) => {

    const start_date = format(dateRange.startDate, 'Y-MM-d')
    const end_date = format(dateRange.endDate, 'Y-MM-d')
    const title = metric.name
    const searchParams = new URLSearchParams({
        'metric': metric.id,
        'criteria': criterion.id,
        'start_date': start_date,
        'end_date': end_date
    })
    const {data: chartData, isLoading, isError, error} = useGetOthersPerformanceQuery(searchParams.toString())

    if (isLoading) {
        return <Loading/>
    }

    if (isError) {
        console.log(error)
        return <ErrorScreen/>
    }

    console.log(chartData)

    const windowWidth = useWindowDimensions().width;

    return <Box my={4}>
        <Heading size={"sm"} textTransform={"uppercase"} color={"gray.500"} fontWeight={"semibold"}>{sentenceCase(title)}</Heading>
        <VictoryChart height={250} width={windowWidth} theme={VictoryTheme.material}>
            <VictoryBar data={chartData.data} x="date" y="stats"/>
            <VictoryAxis
                tickFormat={(t) => format(new Date(t), 'do')}
                style={{tickLabels: {angle: 45, fontSize: 10, padding: 20}}}
            />
        </VictoryChart>
    </Box>
}