import { useState } from "react";
import { Pressable, Platform, Dimensions } from "react-native";
import {
    Box,
    Text,
    HStack,
    Button,
    Input,
    Heading,
    Select,
    ScrollView,
    Center,
    Image,
    Icon,
    CheckIcon
} from "native-base";
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { VictoryBar, VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

export const ComparewithmyPeople = () => {

    let [firstSelect, setFirstSelect] = useState("");
    let [secondSelect, setSecondSelect] = useState("");

    const chartData = [
        { steps: 82, day: "Sun" },
        { steps: 64, day: "Mon" },
        { steps: 96, day: "Tue" },
        { steps: 72, day: "Wed" },
        { steps: 60, day: "Thu" },
        { steps: 112, day: "Fri" },
        { steps: 73, day: "Sat" },
    ];

    return (
        <ScrollView>
            <Box py={12} px={5}>
                <HStack justifyContent={"space-between"}>
                    <Icon
                        as={FontAwesome}
                        name="angle-left"
                        size="6"
                        color="#000"
                    />
                    <Icon
                        as={Ionicons}
                        name="notifications-outline"
                        size="6"
                        color="#000"
                    />
                </HStack>

                <HStack py={5} px={2} alignItems={"center"} justifyContent={"space-between"}>
                    <Text paddingRight={5} fontSize="md" bold>We have found suitable results for you based on your choices. </Text>
                    <Box backgroundColor={'#FFECE1'} padding={2} borderRadius={25}>
                        <Icon
                            as={AntDesign}
                            name="filter"
                            size="6"
                            color="#FF803F"
                        />
                    </Box>
                </HStack>

                <Text paddingX={5} py={5} textAlign="center" fontSize="md" bold color={'#FF803F'} > Distance </Text>

                {/* <LineChart
                    bezier

                    data={{
                        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        datasets: [{
                            data: [20, 45, 28, 80, 99, 43]
                        }]
                    }}

                    width={Dimensions.get('window').width * 0.9}
                    height={220}
                    chartConfig={{
                        backgroundColor: 'red',
                        backgroundGradientFrom: '#FF803F',
                        backgroundGradientTo: 'pink',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                /> */}

                <Box borderWidth={0.2} >
                    <Box >
                        <HStack justifyContent={"space-between"} alignItems={"center"}>
                            <Box w="2/5" >
                                <Text mt={1} ml={1} fontSize="xs" color="#8F8F8F">Comparing with Cyclones (1750) people</Text>
                            </Box>
                            <Box w="2/5" >
                                <Select selectedValue={secondSelect} accessibilityLabel="Graph" placeholder="Graph" _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />
                                }} mt={1} mx={1} onValueChange={itemValue => setSecondSelect(itemValue)}>
                                    <Select.Item label="UX Research" value="ux" />
                                    <Select.Item label="Web Development" value="web" />
                                    <Select.Item label="Cross Platform Development" value="cross" />
                                    <Select.Item label="UI Designing" value="ui" />
                                    <Select.Item label="Backend Development" value="backend" />
                                </Select>
                            </Box>
                        </HStack>

                        <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 10 }} >
                            <VictoryLine
                                // data={[
                                //     { x: 1, y: 2 },
                                //     { x: 2, y: 3 },
                                //     { x: 3, y: 5 },
                                //     { x: 4, y: 4 },
                                //     { x: 5, y: 7 }
                                // ]}
                                data={chartData}
                                x="day" y="steps"
                                // style={{
                                //     data: { fill: "#34DEDE", }
                                // }}
                                style={{
                                    data: { stroke: "#c43a31" },
                                    parent: { border: "1px solid #ccc" }
                                }}
                            />
                        </VictoryChart>

                    </Box>
                </Box>

                <Text paddingX={5} py={5} textAlign="center" fontSize="md" bold color={'#FF803F'} > Calories </Text>


            </Box>
        </ScrollView>
    );

}