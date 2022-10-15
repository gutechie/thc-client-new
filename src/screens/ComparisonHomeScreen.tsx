import {Fontisto} from "@expo/vector-icons";
import {
    Box,
    Button,
    Divider,
    Icon,
    ScrollView,
    Text,
    VStack,
} from "native-base";
import {useState} from "react";
import {Pressable} from "react-native";
import {MultiSelectableBadges} from "../features/compare/MultiSeletableBadges";

export const ComparisonHomeScreen = ({navigation}) => {
    const [selectedMetrics, setSelectedMetrics] = useState([]);
    const [selectedCompetitors, setSelectedCompetitors] = useState([]);
    const [withMySelf, setWithMySelf] = useState(true);
    // const [department, setDepartment] = useState({
    //   value: "",
    //   list: [
    //     { _id: 1, name: "Admin" },
    //     { _id: 2, name: "Accounts" },
    //     { _id: 2, name: "Operations" },
    //     { _id: 2, name: "Sales" },
    //     { _id: 2, name: "Marketing" },
    //     { _id: 2, name: "IT" },
    //     { _id: 2, name: "Legal" },
    //     { _id: 2, name: "Finance" },
    //   ],
    //   selectedList: [],
    //   error: "",
    // });
    // const [city, setCity] = useState({
    //   value: "",
    //   list: [
    //     { _id: 1, name: "Admin" },
    //     { _id: 2, name: "Accounts" },
    //     { _id: 2, name: "Operations" },
    //     { _id: 2, name: "Sales" },
    //     { _id: 2, name: "Marketing" },
    //     { _id: 2, name: "IT" },
    //     { _id: 2, name: "Legal" },
    //     { _id: 2, name: "Finance" },
    //   ],
    //   selectedList: [],
    //   error: "",
    // });
    // const [teams, setTeams] = useState({
    //   value: "",
    //   list: [
    //     { _id: 1, name: "Admin" },
    //     { _id: 2, name: "Accounts" },
    //     { _id: 2, name: "Operations" },
    //     { _id: 2, name: "Sales" },
    //     { _id: 2, name: "Marketing" },
    //     { _id: 2, name: "IT" },
    //     { _id: 2, name: "Legal" },
    //     { _id: 2, name: "Finance" },
    //   ],
    //   selectedList: [],
    //   error: "",
    // });
    // const [CompanyClub, setCompanyClub] = useState({
    //   value: "",
    //   list: [
    //     { _id: 1, name: "Admin" },
    //     { _id: 2, name: "Accounts" },
    //     { _id: 2, name: "Operations" },
    //     { _id: 2, name: "Sales" },
    //     { _id: 2, name: "Marketing" },
    //     { _id: 2, name: "IT" },
    //     { _id: 2, name: "Legal" },
    //     { _id: 2, name: "Finance" },
    //   ],
    //   selectedList: [],
    //   error: "",
    // });

    const mySelf = [
        // { id: "4", title: "steps" },
        {id: "1", title: "Distance covered"},
        {id: "6", title: "Speed"},
        {id: "2", title: "Heart rate"},
        {id: "3", title: "Cadence"},
        {id: "7", title: "Heart rate zones"},
        {id: "8", title: "Time spent in aerobic and anerobic zones"},
        {id: "9", title: "Calories burned"},
        {id: "9", title: "Elevation"},
        {id: "10", title: "Total time"},
        {id: "11", title: "Moving time"},
        {id: "12", title: "Elapsed time"},
        {id: "13", title: "Max heart rate"},
        {id: "14", title: "Average heart rate"},
        {id: "15", title: "Average pace"},
        {id: "16", title: "Average moving pace"},
        {id: "17", title: "Best pace"},
        {id: "18", title: "Average speed"},
        {id: "19", title: "Average moving speed"},
        {id: "20", title: "Max speed"},
        {id: "21", title: "Average cadence"},
        {id: "22", title: "Max run cadence"},
        {id: "23", title: "Avg stride length"},
    ];

    const peopleList = [
        {id: "", title: "Name"},
        {id: "", title: "DOB"},
        {id: "", title: "Date"},
        {id: "", title: "Month"},
        {id: "", title: "Year"},
        {id: "", title: "Gender"},
        {id: "", title: "Weight"},
        {id: "", title: "Height"},
        {id: "", title: "Fitness club"},
        {id: "company_name", title: "Company"},
        {id: "department", title: "Department"},
        {id: "", title: "Location"},
        {id: "city", title: "City"},
        {id: "", title: "Pincode"},
        {id: "state", title: "State"},
        {id: "team", title: "Team"},
    ];

    const handleMetricSelected = (metric) => {
        if (isIn(selectedMetrics, metric)) {
            setSelectedMetrics(
                selectedMetrics.filter((m) => m.title != metric.title)
            );
        } else {
            setSelectedMetrics([...selectedMetrics, metric]);
        }
    };

    const handleCompetitorSelected = (metric) => {
        if (isIn(selectedCompetitors, metric)) {
            setSelectedCompetitors(
                selectedCompetitors.filter((m) => m.title != metric.title)
            );
        } else {
            setSelectedCompetitors([...selectedCompetitors, metric]);
        }
    };

    const isIn = (selectedList, badge): boolean => {
        return selectedList.find((s) => s.id === badge.id);
    };

    return (
        <ScrollView>
            <Box py={4} px={5}>
                <Box py={4} px={1}>
                    <Box
                        width={"full"}
                        rounded={"full"}
                        p={1}
                        mb={8}
                        bgColor={"orange.100"}
                    >
                        <Box flexDirection={"row"}>
                            <Pressable
                                style={{width: "50%"}}
                                onPress={() => setWithMySelf(true)}
                            >
                                <Text
                                    fontSize="lg"
                                    textAlign={"center"}
                                    borderRadius={50}
                                    p={2}
                                    style={{
                                        backgroundColor: withMySelf ? "white" : "transparent",
                                    }}
                                    color="#FF803F"
                                >
                                    With myself
                                </Text>
                            </Pressable>
                            <Pressable
                                style={{width: "50%"}}
                                onPress={() => setWithMySelf(false)}
                            >
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

                    <VStack space={4}>
                        <VStack space={2}>
                            <VStack space={1}>
                                <Text fontSize="md">What do you want to compare?</Text>
                                <Divider/>
                            </VStack>
                            <MultiSelectableBadges
                                selectables={mySelf}
                                selected={selectedMetrics}
                                onUpdate={handleMetricSelected}
                            />
                        </VStack>
                        {withMySelf || (
                            <VStack space={2}>
                                <Text fontSize="md">With whom do you want to compare?</Text>
                                <Divider/>
                                <MultiSelectableBadges
                                    selectables={peopleList}
                                    selected={selectedCompetitors}
                                    onUpdate={handleCompetitorSelected}
                                />
                            </VStack>
                        )}
                    </VStack>
                </Box>

                {/* <VStack>
          {!withMySelf && selectedCompetitors.find((c) => c.title === "Department") && (
            <BTMultiSelect
              placeholder="Department"
              list={department.list}
              selectedList={department.selectedList}
              onSelection={(value: any) => {
                setDepartment({
                  ...department,
                  value: value.text,
                  selectedList: value.selectedList,
                  error: "",
                });
              }}
              errorText={department.error}
              pillStyle={{ backgroundColor: "white" }}
              errorStyle={{ textColor: "red" }}
            />
          )}

          {!withMySelf && selectedCompetitors.find((c) => c.title === "City") && (
            <BTSingleSelect
              placeholder="City"
              list={city.list}
              selectedList={city.selectedList}
              onSelection={(value: any) => {
                setCity({
                  ...city,
                  value: value.text,
                  selectedList: value.selectedList,
                  error: "",
                });
              }}
              errorText={city.error}
              pillStyle={{ backgroundColor: "white" }}
              errorStyle={{ textColor: "red" }}
            />
          )}
          {!withMySelf && selectedCompetitors.find((c) => c.title === "Teams") && (
            <BTMultiSelect
              placeholder="Teams"
              list={teams.list}
              selectedList={teams.selectedList}
              onSelection={(value: any) => {
                setTeams({
                  ...teams,
                  value: value.text,
                  selectedList: value.selectedList,
                  error: "",
                });
              }}
              errorText={teams.error}
              pillStyle={{ backgroundColor: "white" }}
              errorStyle={{ textColor: "red" }}
            />
          )}
          {!withMySelf && selectedCompetitors.find((c) => c.title === "Company/Club") && (
            <BTSingleSelect
              placeholder="Company / Club"
              list={CompanyClub.list}
              selectedList={CompanyClub.selectedList}
              onSelection={(value: any) => {
                setCompanyClub({
                  ...CompanyClub,
                  value: value.text,
                  selectedList: value.selectedList,
                  error: "",
                });
              }}
              errorText={CompanyClub.error}
              pillStyle={{ backgroundColor: "white" }}
              errorStyle={{ textColor: "red" }}
            />
          )}
        </VStack> */}

                <Box
                    py={5}
                    flexDirection="row"
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Icon as={Fontisto} name="checkbox-passive" size="4" color="grey"/>
                    <Text color={"black"} paddingLeft={3}>
                        Remember my preferences
                    </Text>
                </Box>

                <Button
                    colorScheme={"orange"}
                    onPress={() =>
                        navigation.navigate("self compare", {
                            metrics: selectedMetrics,
                            competitors: selectedCompetitors
                        })
                    }
                >
                    Compare now
                </Button>
            </Box>
        </ScrollView>
    );
};
