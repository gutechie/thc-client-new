import { useState } from "react";
import { Dimensions } from "react-native";
import {
    Box,
    Text,
    HStack,
    ScrollView,
    Center,
    Image,
    Icon,
    Select,
    CheckIcon,
    VStack,
} from "native-base";
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';


export const ConnectSuccess = () => {

    const imgCard = require('../../assets/images/link-device-banner.png');

    let [firstSelect, setFirstSelect] = useState("");
    let [secondSelect, setSecondSelect] = useState("");
    let [thirdSelect, setThirdSelect] = useState("");
    let [forthSelect, setForthSelect] = useState("");

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

                <Center py={10} >
                    <Image
                        source={imgCard}
                        height={Dimensions.get('screen').width * 0.5}
                        alt={'Shield'}
                    />
                </Center>

                <Box paddingX={5} >
                    <Text fontSize="md" py={3} bold >Congratulations Ankit!</Text>
                    <Text fontSize="md" color={"#8A8A8A"} >Your device app is successfully connected. Enjoy using The Healthy Comparison.</Text>
                </Box>

                <VStack py={20}>

                    <Box>
                        <Select selectedValue={firstSelect} accessibilityLabel="Select your wearable device app" placeholder="Select your wearable device app" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mx={1} onValueChange={itemValue => setFirstSelect(itemValue)}>
                            <Select.Item label="UX Research" value="ux" />
                            <Select.Item label="Web Development" value="web" />
                            <Select.Item label="Cross Platform Development" value="cross" />
                            <Select.Item label="UI Designing" value="ui" />
                            <Select.Item label="Backend Development" value="backend" />
                        </Select>
                    </Box>
                    <Box>
                        <Select selectedValue={secondSelect} accessibilityLabel="Strava" placeholder="Strava" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mx={1} onValueChange={itemValue => setSecondSelect(itemValue)}>
                            <Select.Item label="UX Research" value="ux" />
                            <Select.Item label="Web Development" value="web" />
                            <Select.Item label="Cross Platform Development" value="cross" />
                            <Select.Item label="UI Designing" value="ui" />
                            <Select.Item label="Backend Development" value="backend" />
                        </Select>
                    </Box>
                    <Box>
                        <Select selectedValue={thirdSelect} accessibilityLabel="Google Fit" placeholder="Google Fit" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mx={1} onValueChange={itemValue => setThirdSelect(itemValue)}>
                            <Select.Item label="UX Research" value="ux" />
                            <Select.Item label="Web Development" value="web" />
                            <Select.Item label="Cross Platform Development" value="cross" />
                            <Select.Item label="UI Designing" value="ui" />
                            <Select.Item label="Backend Development" value="backend" />
                        </Select>
                    </Box>
                    <Box>
                        <Select selectedValue={forthSelect} accessibilityLabel="Others" placeholder="Others" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mx={1} onValueChange={itemValue => setForthSelect(itemValue)}>
                            <Select.Item label="UX Research" value="ux" />
                            <Select.Item label="Web Development" value="web" />
                            <Select.Item label="Cross Platform Development" value="cross" />
                            <Select.Item label="UI Designing" value="ui" />
                            <Select.Item label="Backend Development" value="backend" />
                        </Select>
                    </Box>

                </VStack>

            </Box>
        </ScrollView>
    );

}