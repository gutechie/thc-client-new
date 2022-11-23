import { Ionicons } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Icon,
  Input,
  ScrollView,
  Select,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useGetActivitiesQuery } from "../features/activity/activityApi";
import { useCreateChallengeMutation } from "../features/challenge/challengeApi";

// LogBox.ignoreAllLogs()

export const CreateChallengeScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  // const [logo, setLogo] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [activity, setActivity] = useState("");
  const [visibility, setVisibility] = useState("");

  const [createChallenge, { isLoading: isPosting }] =
    useCreateChallengeMutation();

  const {
    data: activities,
    isLoading,
    isError,
    error,
  } = useGetActivitiesQuery();

  if (isLoading || isPosting) {
    return (
      <Box>
        <ActivityIndicator />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box>
        <Text>{error.error}</Text>
      </Box>
    );
  }

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndDate(currentDate);
  };

  const showDatePicker = (arg: string) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: arg == "start" ? onStartDateChange : onEndDateChange,
      mode: "date",
    });
  };

  const format = (date: Date) => {
    if (!date) {
      return "";
    }
    const month = date.getMonth() + 1;
    const day = date.getDate().toString();
    const year = date.getFullYear();

    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year.toString()}`;
  };

  const formatAlt = (date: Date) => {
    if (!date) {
      return "";
    }
    const month = date.getMonth() + 1;
    const day = date.getDate().toString();
    const year = date.getFullYear();

    return `${year.toString()}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };

  const handleCreate = async () => {
    const postData = {
      title,
      description,
      start_date: formatAlt(startDate),
      end_date: formatAlt(endDate),
      open_for_teams: visibility == "2" || visibility == "3",
      open_for_users: visibility == "1" || visibility == "3",
      activity_id: activity,
    };
    console.log(postData);
    try {
      await createChallenge(postData).unwrap();
      navigation.replace("Show Challenges");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box h={"full"}>
      <ScrollView p={8}>
        <VStack space={4}>
          <Box>
            <Heading size={"md"} color={"gray.700"}>
              Create a new challenge
            </Heading>
          </Box>
          <Input
            type="text"
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholder={"Challenge title"}
          />
          <Select
            selectedValue={activity}
            onValueChange={(value) => setActivity(value)}
            placeholder="Activity Type"
          >
            {activities.map((activity) => (
              <Select.Item
                label={activity.name}
                value={activity.id}
                key={activity.id}
              />
            ))}
          </Select>
          <Input
            type="text"
            value={description}
            multiline={true}
            numberOfLines={6}
            onChangeText={(text) => setDescription(text)}
            placeholder={"Description"}
          />
          <Divider />
          <Text>Duration</Text>
          <HStack space={4}>
            <Input
              flex={1}
              type="text"
              value={format(startDate)}
              onPressOut={() => showDatePicker("start")}
              placeholder={"Starts at"}
              InputLeftElement={
                <Icon
                  as={<Ionicons name={"calendar"} />}
                  size={8}
                  color={"gray.300"}
                  ml={2}
                />
              }
            />
            <Input
              flex={1}
              type="text"
              value={format(endDate)}
              onPressOut={() => showDatePicker("end")}
              placeholder={"Ends at"}
              InputLeftElement={
                <Icon
                  as={<Ionicons name={"calendar"} />}
                  size={8}
                  color={"gray.300"}
                  ml={2}
                />
              }
            />
          </HStack>
          <Select
            selectedValue={visibility}
            onValueChange={(value) => setVisibility(value)}
            placeholder="Who can see your challenge"
          >
            <Select.Item label={"Open for Users"} value={"1"} />
            <Select.Item label={"Open for Teams"} value={"2"} />
            <Select.Item label={"Open for Both"} value={"3"} />
          </Select>
          <Button my={8} colorScheme={"orange"} onPress={handleCreate}>
            Create
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
};
