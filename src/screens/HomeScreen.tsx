import {Ionicons} from "@expo/vector-icons";
import {
    Alert,
    Box,
    Button,
    CloseIcon,
    Divider,
    FlatList,
    Flex,
    Heading,
    HStack,
    Icon,
    IconButton,
    ScrollView,
    Text,
    VStack
} from "native-base";
import {useWindowDimensions} from "react-native";
import {VictoryAxis, VictoryBar, VictoryChart, VictoryTheme} from "victory-native";
import {routes} from "../constants/routes";
import {selectUser} from "../features/auth/authSlice";
import {useGetHomeDataQuery} from "../features/home/homeApi";
import {useAppSelector} from "../hooks";
import {Loading} from "../shared/Loading";
import Lottie from 'lottie-react-native';

export const HomeScreen = ({navigation}) => {
    const user = useAppSelector(selectUser);
    const {width} = useWindowDimensions();

    const {data, isLoading, isError, error, refetch} = useGetHomeDataQuery(null, {
        refetchOnMountOrArgChange: true
    });

    const colors = ['red', 'teal', 'yellow', 'purple'];
    const icons = {
        'distance': 'flag-outline',
        'cadence': 'bicycle-outline',
        'calories': 'bonfire-outline',
        'heart rate': 'heart-outline'
    };

    if (isLoading) {
        return <Loading/>
    }

    if (isError) {
        return (
            <Alert w="100%" status={"error"}>
                <VStack space={2} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2} justifyContent="space-between">
                        <HStack space={2} flexShrink={1}>
                            <Alert.Icon mt="1"/>
                            <Text fontSize="md" color="coolGray.800">
                                {error.error}
                            </Text>
                        </HStack>
                        <IconButton
                            variant="unstyled"
                            _focus={{
                                borderWidth: 0,
                            }}
                            icon={<CloseIcon size="3" color="coolGray.600"/>}
                        />
                    </HStack>
                </VStack>
            </Alert>
        );
    }

    if (data.chart_data.length === 0) {
        return <Box p={4}>
            <Heading size={"sm"}>
                We are syncing data from your device. It may take 10-15 minutes.
            </Heading>
            <Lottie style={{width: "100%"}} source={require('../assets/yoga.json')} autoplay loop/>
        </Box>
    }

    console.log(data)


    return (
        <Box bg={"white"}>
            <ScrollView px={8} py={4}>
                <VStack space={4}>
                    <Box>
                        <Heading size="md" fontWeight={"semibold"}>
                            Hello {user.name.split(" ")[0]}
                        </Heading>
                        <Text>You did great today</Text>
                    </Box>
                    {/*<Box bg={"gray.200"} p={4} rounded={"md"}>*/}
                    {/*    <HStack alignItems={"center"}>*/}
                    {/*        <Icon*/}
                    {/*            as={Ionicons}*/}
                    {/*            name="information-circle"*/}
                    {/*            color={"yellow.500"}*/}
                    {/*            size={"lg"}*/}
                    {/*        />*/}
                    {/*        <Text fontWeight={"bold"} px={4}>*/}
                    {/*            4755 people have ran more than 6 km today in your segment*/}
                    {/*        </Text>*/}
                    {/*    </HStack>*/}
                    {/*</Box>*/}
                </VStack>
                <VStack my={8}>
                    <Heading size={"md"} mb={3}>
                        Today
                    </Heading>
                    <FlatList
                        horizontal={true}
                        data={data.metric_data}
                        renderItem={({item, index}) => (
                            <Flex
                                bg={`${colors[index]}.100`}
                                w={32}
                                alignItems={"center"}
                                py={4}
                                mx={2}
                                rounded={"xl"}
                            >
                                <HStack alignItems={"center"}>
                                    <Icon
                                        as={Ionicons}
                                        name={icons[item.metric_name]}
                                        color={`${colors[index]}.500`}
                                        size={"xl"}
                                    />
                                    <Text fontSize={"sm"} color={`${colors[index]}.500`}>
                                        {item.metric_name}
                                    </Text>
                                </HStack>
                                <HStack alignItems={"baseline"} space={1}>
                                    <Text
                                        fontSize={"2xl"}
                                        fontWeight={"semibold"}
                                        color={`${colors[index]}.500`}
                                    >
                                        {item.value}
                                    </Text>
                                    <Text color={`${colors[index]}.500`}>{item.unit}</Text>
                                </HStack>
                            </Flex>
                        )}
                        keyExtractor={(item) => item.metric_name}
                    />
                    <Button
                        bg={"black"}
                        rightIcon={<Icon as={Ionicons} name="ios-arrow-forward"/>}
                        my={6}
                        onPress={() => navigation.navigate(routes.HOME_OTHERS)}
                    >
                        See how other are doing
                    </Button>
                </VStack>
                <Divider orientation={"horizontal"}/>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                    Comparison of your past performance
                </Text>
                <Box mb={16} key={Date.now.toString()}>
                    <VictoryChart
                        height={300}
                        width={width - 50}
                        padding={{left: 40, right: 40, bottom: 24, top: 20}}
                        domainPadding={{x: 20}}
                        theme={VictoryTheme.material}
                    >
                        <VictoryBar
                            labels={({datum}) => `${datum.value}`}
                            data={data.chart_data}
                            x="day"
                            y="value"
                            style={{
                                data: {fill: `#ea580c`},
                            }}
                            animate={{
                                onEnter: {
                                    after: () => ({_y: 0}),
                                },
                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            fixLabelOverlap
                            style={{grid: {stroke: "none"}}}
                        />
                        <VictoryAxis
                            crossAxis
                            fixLabelOverlap
                            style={{grid: {stroke: "none"}}}
                        />
                    </VictoryChart>
                </Box>
            </ScrollView>
        </Box>
    );
};
