import {Box, CheckIcon, Heading, HStack, ScrollView, Select, Text,} from "native-base";
import {selectUser} from "../features/auth/authSlice";
import {useAppSelector} from "../hooks";
import {ErrorScreen, Loading, PerformanceChartSingle} from "../shared";
import {useGetMasterCriteriaQuery, useGetMasterMetricsQuery} from "../features/masters/masterApi";
import {add, endOfMonth, endOfWeek, startOfMonth, startOfWeek, sub} from "date-fns";
import {useState} from "react";

export const HomeOtherScreen = () => {
    const user = useAppSelector(selectUser);

    // build state_date and end_date for different date filters
    const dateRanges = {
        currentWeek: {
            startDate: startOfWeek(new Date(Date.now()), {weekStartsOn: 1}),
            endDate: endOfWeek(new Date(Date.now()), {weekStartsOn: 1}),
        },
        currentMonth: {
            startDate: add(startOfMonth(new Date(Date.now())), {days: 1}),
            endDate: endOfMonth(new Date(Date.now())),
        },
        previousMonth: {
            startDate: add(startOfMonth(sub(new Date(Date.now()), {months: 1})), {days: 1}),
            endDate: endOfMonth(sub(new Date(Date.now()), {months: 1})),
        }
    };

    const [selectedDate, setSelectedDate] = useState("currentWeek")
    const [selectedCriterion, setSelectedCriterion] = useState<string>()
    const [selectedMetric, setSelectedMetric] = useState<string>()

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

    // then get all the comparable criteria
    const criteriaSearchParams = new URLSearchParams({
        'filter[active]': 'true',
        'fields': 'id,name,label'
    })
    const {
        data: criteriaData,
        isLoading: criteriaLoading,
        isError: criteriaLoadingError,
        error: criteriaError,
    } = useGetMasterCriteriaQuery(criteriaSearchParams.toString())


    // get the data for chart


    if (metricsLoading || criteriaLoading) {
        return <Loading/>
    }

    if (metricsLoadingError || criteriaLoadingError) {
        console.log(metricsError)
        console.log(criteriaError)
        return <ErrorScreen/>
    }

    if (criteriaData && !selectedCriterion) {
        setSelectedCriterion(criteriaData.data[0].id)
    }

    return <Box px={4}>
        <Heading size={"md"} textAlign={"center"} my={4} color={"orange.500"}>Here's what others are doing</Heading>
        <HStack space={4}>
            <Select selectedValue={selectedDate} w={"full"} minWidth={180}
                    accessibilityLabel="Choose Date Range" placeholder="Choose Date Range"
                    _selectedItem={{endIcon: <CheckIcon size="5"/>}} mt={1}
                    onValueChange={itemValue => setSelectedDate(itemValue)}>
                <Select.Item label="This week" value="currentWeek"/>
                <Select.Item label="This month" value="currentMonth"/>
                <Select.Item label="Last month" value="previousMonth"/>
            </Select>
            {
                criteriaData && metrics && <Box>
                    <Select selectedValue={selectedCriterion} minWidth="180" w={"full"} accessibilityLabel="Choose Criteria"
                            placeholder="Choose Criteria" _selectedItem={{endIcon: <CheckIcon size="5"/>}} mt={1}
                            onValueChange={itemValue => setSelectedCriterion(itemValue)}>
                        {criteriaData.data.map(criterion => <Select.Item key={criterion.id} label={criterion.label}
                                                                         value={criterion.id}/>)}
                    </Select>
                </Box>
            }
        </HStack>
        {criteriaData && metrics && <ScrollView my={4}>
            {
                metrics.data.map(metric => <PerformanceChartSingle dateRange={dateRanges[selectedDate]} metric={metric}
                                                                   key={metric.id.toString()}
                                                                   criterion={criteriaData.data.find(criterion => criterion.id === selectedCriterion)}/>)
            }
        </ScrollView>
        }
    </Box>

    // const {data, isLoading, isError, error} = useGetTopPerformersMetricsQuery();
    // const {
    //     data: chartData,
    //     isLoading: isChartLoading,
    //     isError: isChartError,
    //     error: charError
    // } = useGetCompetitorActivityQuery(1)
    //
    // if (isLoading || isChartLoading) {
    //     return <Loading/>
    // }
    //
    // if (isError || isChartError) {
    //     if (isError) {
    //         console.log(error)
    //     } else {
    //         console.log(charError)
    //     }
    // }
    //
    // console.log(data)
    // console.log(chartData)
    //
    // return (
    //     <Box px={8} py={4} bg={"white"} flex={1}>
    //         <VStack space={4}>
    //             <Box>
    //                 <Heading size="md" fontWeight={"semibold"}>
    //                     Hello {user.name.split(" ")[0]}
    //                 </Heading>
    //                 <Text>You did great today</Text>
    //             </Box>
    //         </VStack>
    //         {
    //             data.data && data.data.length > 0 && <VStack my={8}>
    //                 <Heading size={"md"} mb={3}>
    //                     Top performers in your city
    //                 </Heading>
    //                 <FlatList
    //                     horizontal={true}
    //                     data={data.data}
    //                     renderItem={({item}) => (
    //                         <Flex
    //                             bg={`${item.color}.100`}
    //                             w={32}
    //                             alignItems={"center"}
    //                             py={4}
    //                             mx={2}
    //                             rounded={"xl"}
    //                         >
    //                             <HStack alignItems={"center"}>
    //                                 <Icon
    //                                     as={Ionicons}
    //                                     name={item.icon}
    //                                     color={`${item.color}.500`}
    //                                     size={"xl"}
    //                                 />
    //                                 <Text fontSize={"sm"} color={`${item.color}.500`}>
    //                                     {item.metric_name}
    //                                 </Text>
    //                             </HStack>
    //                             <HStack alignItems={"baseline"} space={1}>
    //                                 <Text
    //                                     fontSize={"2xl"}
    //                                     fontWeight={"semibold"}
    //                                     color={`${item.color}.500`}
    //                                 >
    //                                     {item.value}
    //                                 </Text>
    //                                 <Text color={`${item.color}.500`}>{item.unit}</Text>
    //                             </HStack>
    //                         </Flex>
    //                     )}
    //                     keyExtractor={(item) => item.metric_name}
    //                 />
    //             </VStack>
    //         }
    //         <Box my={4}>
    //             <Text fontSize={"sm"} fontWeight={"bold"}>
    //                 How others doing in your city
    //             </Text>
    //         </Box>
    //         <Box>
    //             <Text textAlign={"center"} fontSize={"xl"}>Distance</Text>
    //             <VictoryChart height={250} width={350} theme={VictoryTheme.material}>
    //                 <VictoryBar data={chartData.data} x="day" y="value"/>
    //                 <VictoryAxis dependentAxis
    //                 />
    //                 <VictoryAxis
    //                     style={{tickLabels: {angle: 45, fontSize: 10, padding: 20}}}
    //                 />
    //             </VictoryChart>
    //         </Box>
    //     </Box>
    // );
};
