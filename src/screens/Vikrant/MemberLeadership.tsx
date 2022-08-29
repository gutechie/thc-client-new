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
import { Ionicons, FontAwesome, Fontisto, Entypo } from '@expo/vector-icons';

export const MemberLeadership = () => {

    let [service, setService] = useState("");
    let [today, setToday] = useState("");
    let [running, setRunning] = useState("");

    const ListData = [
        { "id": "1", "name": "Raj Sharma", "distance": "31.16 km" },
        { "id": "2", "name": "Divya Arihant", "distance": "30.73 km" },
        { "id": "3", "name": "Aron Vaz", "distance": "29.37 km" },
        { "id": "4", "name": "Vinit Gada", "distance": "28.12 km" },
        { "id": "5", "name": "Alia Bansal", "distance": "27.57 km" },
        { "id": "6", "name": "Vikash Das", "distance": "26.12 km" },
        { "id": "7", "name": "Remya R.", "distance": "26.11 km" },
        { "id": "8", "name": "Bala S.", "distance": "25.06 km" },
    ]

    const imgGold = require('../../assets/images/medals/gold.png');
    const imgSilver = require('../../assets/images/medals/silver.png');
    const imgBronze = require('../../assets/images/medals/bronze.png');

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

                <Text py={5} paddingX={5} fontSize="md" textAlign={"center"} bold>Leadership Board</Text>

                <Center>
                    <Box paddingBottom={5} >
                        <Select selectedValue={service} minWidth="200" accessibilityLabel="Select Team"
                            borderRadius={20}
                            placeholder="Select Team" _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                            <Select.Item label="UX Research" value="ux" />
                            <Select.Item label="Web Development" value="web" />
                            <Select.Item label="Cross Platform Development" value="cross" />
                            <Select.Item label="UI Designing" value="ui" />
                            <Select.Item label="Backend Development" value="backend" />
                        </Select>
                    </Box>
                </Center>

                <HStack>
                    <Box w="1/4" >
                        <Select selectedValue={today} accessibilityLabel="Today" placeholder="Today"
                            backgroundColor={'black'}
                            color={"grey"}
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }} mt={1} onValueChange={itemValue => setToday(itemValue)}>
                            <Select.Item label="UX Research" value="ux" />
                            <Select.Item label="Web Development" value="web" />
                            <Select.Item label="Cross Platform Development" value="cross" />
                            <Select.Item label="UI Designing" value="ui" />
                            <Select.Item label="Backend Development" value="backend" />
                        </Select>
                    </Box>
                    <Box w="2/6" paddingLeft={2} >
                        <Select selectedValue={running} accessibilityLabel="Running" placeholder="Running"
                            backgroundColor={'#F9FAFB'}
                            color={"grey"}
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }} mt={1} onValueChange={itemValue => setRunning(itemValue)}>
                            <Select.Item label="UX Research" value="ux" />
                            <Select.Item label="Web Development" value="web" />
                            <Select.Item label="Cross Platform Development" value="cross" />
                            <Select.Item label="UI Designing" value="ui" />
                            <Select.Item label="Backend Development" value="backend" />
                        </Select>
                    </Box>
                </HStack>

                <Box marginTop="5">
                    {
                        ListData.map((e, key) => (
                            <HStack key={key} justifyContent={"space-between"} py={3} alignItems={"center"}>
                                <Text color={"grey"} fontSize={16} >
                                    {
                                        e.id === '1' ?
                                            <Box>
                                                <Image
                                                    source={imgGold}
                                                    width={7}
                                                    height={7}
                                                    alt={'Gold'}
                                                />
                                            </Box>
                                            :
                                            e.id === '2' ?
                                                <Box>
                                                    <Image
                                                        source={imgSilver}
                                                        width={7}
                                                        height={7}
                                                        alt={'Gold'}
                                                    />
                                                </Box>
                                                :
                                                e.id === '3' ?
                                                    <Box>
                                                        <Image
                                                            source={imgBronze}
                                                            width={7}
                                                            height={7}
                                                            alt={'Gold'}
                                                        />
                                                    </Box>
                                                    :
                                                    <Box py={2} px={2} >
                                                        {e.id}
                                                    </Box>
                                    }
                                </Text>
                                <HStack flex={1} px={1} justifyContent={"space-between"} alignItems={"center"} >
                                    <HStack flex={1} px={1} alignItems={"center"} >
                                        <Icon as={Ionicons} name="person-circle-outline" size="30" color="#000" />
                                        <Text paddingLeft={2} fontSize={16}>{e.name}</Text>
                                    </HStack>
                                    <Text fontSize={16}>{e.distance}</Text>
                                </HStack>
                                <Icon as={Entypo} name="dots-three-vertical" size="6" color="#000" />
                            </HStack>
                        ))
                    }
                </Box>


            </Box>
        </ScrollView>
    );
}