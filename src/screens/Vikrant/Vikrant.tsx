import { useState } from "react";
import { Pressable, Platform } from "react-native";
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
import { Ionicons, FontAwesome, Fontisto } from '@expo/vector-icons';
import { BTMultiSelect, BTSingleSelect } from '@blump-tech/native-base-select';

import { images } from "../constants/images";

export const Vikrant = () => {

    const [withMySelf, setWithMySelf] = useState(true)

    let [service, setService] = useState("");

    const [department, setDepartment] = useState({
        value: '',
        list: [
            { _id: 1, name: 'Admin' },
            { _id: 2, name: 'Accounts' },
            { _id: 2, name: 'Operations' },
            { _id: 2, name: 'Sales' },
            { _id: 2, name: 'Marketing' },
            { _id: 2, name: 'IT' },
            { _id: 2, name: 'Legal' },
            { _id: 2, name: 'Finance' }

        ],
        selectedList: [],
        error: '',
    });
    const [city, setCity] = useState({
        value: '',
        list: [
            { _id: 1, name: 'Admin' },
            { _id: 2, name: 'Accounts' },
            { _id: 2, name: 'Operations' },
            { _id: 2, name: 'Sales' },
            { _id: 2, name: 'Marketing' },
            { _id: 2, name: 'IT' },
            { _id: 2, name: 'Legal' },
            { _id: 2, name: 'Finance' }

        ],
        selectedList: [],
        error: '',
    });
    const [terms, setTerms] = useState({
        value: '',
        list: [
            { _id: 1, name: 'Admin' },
            { _id: 2, name: 'Accounts' },
            { _id: 2, name: 'Operations' },
            { _id: 2, name: 'Sales' },
            { _id: 2, name: 'Marketing' },
            { _id: 2, name: 'IT' },
            { _id: 2, name: 'Legal' },
            { _id: 2, name: 'Finance' }

        ],
        selectedList: [],
        error: '',
    });
    const [CompanyClub, setCompanyClub] = useState({
        value: '',
        list: [
            { _id: 1, name: 'Admin' },
            { _id: 2, name: 'Accounts' },
            { _id: 2, name: 'Operations' },
            { _id: 2, name: 'Sales' },
            { _id: 2, name: 'Marketing' },
            { _id: 2, name: 'IT' },
            { _id: 2, name: 'Legal' },
            { _id: 2, name: 'Finance' }

        ],
        selectedList: [],
        error: '',
    });

    const mySelf = [
        { id: "1", title: "Age" },
        { id: "2", title: "Distance" },
        { id: "3", title: "Age" },
        { id: "4", title: "Calories" },
        { id: "5", title: "Steps Count" },
        { id: "6", title: "Age" },
        { id: "7", title: "Hydration" },
        { id: "8", title: "Age" },
        { id: "9", title: "Age" },
        { id: "10", title: "Age" },
        { id: "11", title: "Age" },
    ]

    const peopleList = [
        { id: "1", title: "Age" },
        { id: "2", title: "Distance" },
        { id: "3", title: "Age" },
        { id: "4", title: "Calories" },
        { id: "5", title: "Steps Count" },
        { id: "6", title: "Age" },
    ]

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
                <Box py={5} px={1} >
                    <Box
                        justifyContent={"space-between"}
                        width="100%"
                        borderWidth={1}
                        borderRadius={50}
                        flexDirection="row"
                    >
                        <Input
                            // variant="rounded"
                            // borderColor={"red.500"}
                            placeholder="Search parameters here to compare"
                            flex={1}
                            borderWidth={0}
                        />
                        <Box marginRight={4} justifyContent="center">
                            <Icon
                                as={FontAwesome}
                                name="search"
                                size="6"
                                color="#FF9057"
                            />
                        </Box>
                    </Box>
                </Box>
                <Text paddingX={5} fontSize="md" bold>Select all the parameters you want to make comparison with</Text>

                <Box py={5} px={1}>
                    <Box width="100%" borderRadius={50} backgroundColor={"#FFEADF"} >

                        <Box marginRight={4} marginX={1} marginY={1} flexDirection={"row"} >
                            <Pressable
                                style={{ width: '50%', }}
                                onPress={() => setWithMySelf(true)}>
                                <Text
                                    fontSize="lg"
                                    textAlign={"center"}
                                    borderRadius={50}
                                    p={2}
                                    style={{
                                        backgroundColor: withMySelf ? "white" : "transparent"
                                    }}
                                    color="#FF803F"
                                >
                                    With myself
                                </Text>
                            </Pressable>
                            <Pressable
                                style={{ width: '50%', }}
                                onPress={() => setWithMySelf(false)}>
                                <Text
                                    fontSize="lg"
                                    textAlign={"center"}
                                    borderRadius={50}
                                    p={2}
                                    style={{
                                        backgroundColor: withMySelf ? "transparent" : "white",
                                    }}
                                    color="#FF803F"
                                >
                                    with people
                                </Text>
                            </Pressable>
                        </Box>

                    </Box>

                    <Box py={5} px={1} >
                        {
                            withMySelf ?
                                <Box>
                                    <Text paddingBottom={2} fontSize="md" >What do you want to compare?</Text>
                                    <Box
                                    />
                                    <Box
                                        // height={200}
                                        flexDirection="row"
                                        // justifyContent="center"
                                        alignItems="center"
                                        flexWrap={"wrap"}

                                    >
                                        {
                                            mySelf.map((e, key) => (
                                                <Box
                                                    key={key}
                                                    style={{ backgroundColor: '#FF803F', }}
                                                    margin={1.5}
                                                    justifyContent={'center'}
                                                    // padding={5}
                                                    borderRadius={10}
                                                >
                                                    <Text
                                                        p={2}
                                                        // padding={5}
                                                        fontSize={"md"}
                                                        color={"white"}
                                                        fontWeight="bold"
                                                    >
                                                        {e.title}
                                                    </Text>
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                </Box>
                                :
                                <Box>
                                    <Text paddingBottom={2} fontSize="md" >What do you want to compare?</Text>
                                    <Box
                                    />
                                    <Box
                                        // height={200}
                                        flexDirection="row"
                                        // justifyContent="center"
                                        alignItems="center"
                                        flexWrap={"wrap"}

                                    >
                                        {
                                            mySelf.map((e, key) => (
                                                <Box
                                                    key={key}
                                                    style={{ backgroundColor: '#FF803F', }}
                                                    margin={1.5}
                                                    justifyContent={'center'}
                                                    // padding={5}
                                                    borderRadius={10}
                                                >
                                                    <Text
                                                        p={2}
                                                        // padding={5}
                                                        fontSize={"md"}
                                                        color={"white"}
                                                        fontWeight="bold"
                                                    >
                                                        {e.title}
                                                    </Text>
                                                </Box>
                                            ))
                                        }
                                    </Box>

                                    <Text paddingBottom={2} fontSize="md" >With whom do you want to compare?</Text>
                                    <Box h={0.6} backgroundColor={'black'} />
                                    <Box
                                        // height={200}
                                        flexDirection="row"
                                        // justifyContent="center"
                                        alignItems="center"
                                        flexWrap={"wrap"}

                                    >
                                        {
                                            peopleList.map((e, key) => (
                                                <Box
                                                    key={key}
                                                    style={{ backgroundColor: '#FF803F', }}
                                                    margin={1.5}
                                                    justifyContent={'center'}
                                                    // padding={5}
                                                    borderRadius={10}
                                                >
                                                    <Text
                                                        p={2}
                                                        // padding={5}
                                                        fontSize={"md"}
                                                        color={"white"}
                                                        fontWeight="bold"
                                                    >
                                                        {e.title}
                                                    </Text>
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                </Box>
                        }
                    </Box>



                </Box>

                <Box>
                    <BTMultiSelect
                        placeholder="Department"
                        list={department.list}
                        selectedList={department.selectedList}
                        onSelection={(value: any) => {
                            setDepartment({
                                ...department,
                                value: value.text,
                                selectedList: value.selectedList,
                                error: '',
                            });
                        }}
                        errorText={department.error}
                        pillStyle={{ backgroundColor: 'white' }}
                        errorStyle={{ textColor: 'red' }}
                    />

                    <BTSingleSelect
                        placeholder="City"
                        list={city.list}
                        selectedList={city.selectedList}
                        onSelection={(value: any) => {
                            setCity({
                                ...city,
                                value: value.text,
                                selectedList: value.selectedList,
                                error: '',
                            });
                        }}
                        errorText={city.error}
                        pillStyle={{ backgroundColor: 'white' }}
                        errorStyle={{ textColor: 'red' }}
                    />

                    <BTMultiSelect
                        placeholder="Terms"
                        list={terms.list}
                        selectedList={terms.selectedList}
                        onSelection={(value: any) => {
                            setTerms({
                                ...terms,
                                value: value.text,
                                selectedList: value.selectedList,
                                error: '',
                            });
                        }}
                        errorText={terms.error}
                        pillStyle={{ backgroundColor: 'white' }}
                        errorStyle={{ textColor: 'red' }}
                    />

                    <BTSingleSelect
                        placeholder="Company / Club"
                        list={CompanyClub.list}
                        selectedList={CompanyClub.selectedList}
                        onSelection={(value: any) => {
                            setCompanyClub({
                                ...CompanyClub,
                                value: value.text,
                                selectedList: value.selectedList,
                                error: '',
                            });
                        }}
                        errorText={CompanyClub.error}
                        pillStyle={{ backgroundColor: 'white' }}
                        errorStyle={{ textColor: 'red' }}
                    />

                    {/* <Select minWidth="200" accessibilityLabel="Company / Club" placeholder="Company / Club" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size={5} />
                    }} mt="1" borderRadius={10}>
                        <Select.Item label="YMCA" value="YMCA" />
                        <Select.Item label="Andheri Sports Club" value="AndheriSportsClub" />
                        <Select.Item label="India Bulls Mumbai" value="IndiaBullsMumbai" />
                        <Select.Item label="ICICI Bank Bandra" value="ICICIBankBandra" />
                        <Select.Item label="Yes Bank Lower Parel" value="YesBankLowerParel" />
                        <Select.Item label="MCA Club Kandivali" value="MCAClubKandivali" />
                        <Select.Item label="Sachin Tendulkar Gymkhana" value="SachinTendulkarGymkhana" />
                    </Select> */}

                </Box>

                <Box py={5}
                    // px={1}
                    // backgroundColor={"red.500"}
                    flexDirection="row"
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Icon
                        as={Fontisto}
                        name="checkbox-passive"
                        size="4"
                        color="grey"
                    />
                    <Text color={'black'}
                        // fontSize={"sm"}
                        // textAlign={"center"}
                        paddingLeft={3}
                    >
                        Remember my preferences
                    </Text>
                </Box>

                <Button backgroundColor={"#FF9057"}>
                    <Text color={'white'} fontSize={"md"} fontWeight={"bold"}>Compare now</Text>
                </Button>

            </Box>
        </ScrollView>
    );
};
