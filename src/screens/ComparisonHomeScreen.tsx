import { Fontisto } from "@expo/vector-icons";
import {
  Box,
  Button,
  Divider,
  Icon,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { Pressable } from "react-native";
import { MultiSelectableBadges } from "../features/compare/MultiSeletableBadges";

export const ComparisonHomeScreen = ({ navigation }) => {
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
    { id: "1", title: "distance" },
    { id: "2", title: "heart rate" },
    { id: "3", title: "cadence" },
    { id: "5", title: "calories" },
    { id: "4", title: "steps" },
  ];

  const peopleList = [
    { id: "team", title: "Teams" },
    { id: "company", title: "Company/Club" },
    { id: "department", title: "Department" },
    { id: "state", title: "State" },
    { id: "city", title: "City" },
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
                style={{ width: "50%" }}
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
                style={{ width: "50%" }}
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
                <Divider />
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
                <Divider />
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
          <Icon as={Fontisto} name="checkbox-passive" size="4" color="grey" />
          <Text color={"black"} paddingLeft={3}>
            Remember my preferences
          </Text>
        </Box>

        <Button
          colorScheme={"orange"}
          onPress={() =>
            navigation.navigate("self compare", { metrics: selectedMetrics, competitors: selectedCompetitors })
          }
        >
          Compare now
        </Button>
      </Box>
    </ScrollView>
  );
};
