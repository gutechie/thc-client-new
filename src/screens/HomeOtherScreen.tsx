import {Ionicons} from "@expo/vector-icons";
import {Box, Divider, FlatList, Flex, Heading, HStack, Icon, Text, VStack,} from "native-base";
import {VictoryAxis, VictoryBar, VictoryChart, VictoryTheme} from "victory-native";
import {selectUser} from "../features/auth/authSlice";
import {useAppSelector} from "../hooks";
import {useGetCompetitorActivityQuery, useGetTopPerformersMetricsQuery} from "../features/home/homeApi";
import {Loading} from "../shared/Loading";

export const HomeOtherScreen = () => {
    const user = useAppSelector(selectUser);

    const {data, isLoading, isError, error} = useGetTopPerformersMetricsQuery();
    const {
        data: chartData,
        isLoading: isChartLoading,
        isError: isChartError,
        error: charError
    } = useGetCompetitorActivityQuery(1)

    if (isLoading || isChartLoading) {
        return <Loading/>
    }

    if (isError || isChartError) {
        if (isError) {
            console.log(error)
        } else {
            console.log(charError)
        }
    }

    console.log(data)
    console.log(chartData)

    return (
        <Box px={8} py={4} bg={"white"} flex={1}>
            <VStack space={4}>
                <Box>
                    <Heading size="md" fontWeight={"semibold"}>
                        Hello {user.name.split(" ")[0]}
                    </Heading>
                    <Text>You did great today</Text>
                </Box>
            </VStack>
            {
                data.data && data.data.length > 0 && <VStack my={8}>
                    <Heading size={"md"} mb={3}>
                        Top performers in your city
                    </Heading>
                    <FlatList
                        horizontal={true}
                        data={data.data}
                        renderItem={({item}) => (
                            <Flex
                                bg={`${item.color}.100`}
                                w={32}
                                alignItems={"center"}
                                py={4}
                                mx={2}
                                rounded={"xl"}
                            >
                                <HStack alignItems={"center"}>
                                    <Icon
                                        as={Ionicons}
                                        name={item.icon}
                                        color={`${item.color}.500`}
                                        size={"xl"}
                                    />
                                    <Text fontSize={"sm"} color={`${item.color}.500`}>
                                        {item.metric_name}
                                    </Text>
                                </HStack>
                                <HStack alignItems={"baseline"} space={1}>
                                    <Text
                                        fontSize={"2xl"}
                                        fontWeight={"semibold"}
                                        color={`${item.color}.500`}
                                    >
                                        {item.value}
                                    </Text>
                                    <Text color={`${item.color}.500`}>{item.unit}</Text>
                                </HStack>
                            </Flex>
                        )}
                        keyExtractor={(item) => item.metric_name}
                    />
                </VStack>
            }
            <Box my={4}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                    How others doing in your city
                </Text>
            </Box>
            <Box>
                <Text textAlign={"center"} fontSize={"xl"}>Distance</Text>
                <VictoryChart height={250} width={350} theme={VictoryTheme.material}>
                    <VictoryBar data={chartData.data} x="day" y="value"/>
                    <VictoryAxis dependentAxis
                    />
                    <VictoryAxis
                        style={{tickLabels: {angle: 45, fontSize: 10, padding: 20}}}
                    />
                </VictoryChart>
            </Box>
        </Box>
    );
};
