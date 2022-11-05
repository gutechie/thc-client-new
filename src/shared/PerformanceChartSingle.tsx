import {Box, Heading, HStack, ScrollView, Text} from "native-base";
import {format} from "date-fns";
import {sentenceCase} from "../helpers";
import {VictoryBar, VictoryChart, VictoryTheme, VictoryAxis} from "victory-native";
import {useGetOthersPerformanceQuery} from "../features/performace/performanceApi";
import {Loading} from "./Loading";
import {ErrorScreen} from "./ErrorScreen";
import {useWindowDimensions} from 'react-native';


export const PerformanceChartSingle = ({dateRange, metric, criterion}) => {

    const windowWidth = useWindowDimensions().width;
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

    return <Box my={4}>
        <HStack>
            <Text fontWeight={"semibold"} color={"gray.500"} textTransform={"uppercase"}
                  fontSize={"md"}>{sentenceCase(title)}</Text>
            <Text fontWeight={"semibold"} color={"gray.500"} fontSize={"md"}> - </Text>
            <Text fontWeight={"semibold"} color={"gray.500"}
                  fontSize={"md"}>{sentenceCase(chartData.metric.aggregation_method)} </Text>
            <Text fontWeight={"semibold"} color={"orange.500"}
                  fontSize={"md"}>{chartData.metric.aggregation_value.toFixed(2)} </Text>
            <Text fontWeight={"semibold"} color={"gray.500"}
                  fontSize={"md"}>{chartData.metric.converted_unit}</Text>
        </HStack>
        {
           chartData.metric.aggregation_value > 0 ?
               <VictoryChart height={250} width={windowWidth} theme={VictoryTheme.material} domainPadding={{ x: 50, y: [0, 20] }}>
                   <VictoryBar data={chartData.data} x="date" y="stats"/>
                   <VictoryAxis dependentAxis/>
                   <VictoryAxis
                       tickFormat={(t) => format(new Date(t), 'do')}
                       style={{tickLabels: {angle: 90, fontSize: 8, padding: 20}}}
                   />
               </VictoryChart> : <Text textAlign={"center"} fontSize={"md"} my={"4"} color={"gray.400"}>Data not available</Text>
        }
    </Box>
}