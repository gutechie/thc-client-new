import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FlatList,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "native-base";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { images } from "../constants/images";
import { selectUser } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks";

export const HomeOtherScreen = () => {
  const user = useAppSelector(selectUser);
  const data = [
    {
      icon: "heart-outline",
      color: "red",
      text: "Heart Rate",
      metric: "158",
      unit: "bmp",
    },
    {
      icon: "bonfire-outline",
      color: "teal",
      text: "Calories",
      metric: "742",
      unit: "",
    },
    {
      icon: "flag-outline",
      color: "yellow",
      text: "Distance",
      metric: "2.4",
      unit: "km",
    },
  ];

  const teamData = [
    {
      icon: "medal",
      image: images.AVATAR,
      name: "Raj Sharma",
      stats: "31.6 km",
    },
    {
      icon: "medal",
      image: images.AVATAR,
      name: "Raj Sharma",
      stats: "31.6 km",
    },
    {
      icon: "medal",
      image: images.AVATAR,
      name: "Raj Sharma",
      stats: "31.6 km",
    },
    {
      icon: "medal",
      image: images.AVATAR,
      name: "Raj Sharma",
      stats: "31.6 km",
    },
    {
      icon: "medal",
      image: images.AVATAR,
      name: "Raj Sharma",
      stats: "31.6 km",
    },
  ];

  const chartData = [
    { steps: 82, day: "Sun" },
    { steps: 64, day: "Mon" },
    { steps: 96, day: "Tue" },
    { steps: 72, day: "Wed" },
    { steps: 49, day: "Thu" },
    { steps: 112, day: "Fri" },
    { steps: 73, day: "Sat" },
  ];

  return (
    <Box px={8} py={4} bg={"white"}>
      <VStack space={4}>
        <Box>
          <Heading size="md" fontWeight={"semibold"}>
            Hello {user.name.split(" ")[0]}
          </Heading>
          <Text>You did great today</Text>
        </Box>
      </VStack>
      <VStack my={8}>
        <Heading size={"md"} mb={3}>
          Top performers in your city
        </Heading>
        <FlatList
          horizontal={true}
          data={data}
          renderItem={({ item }) => (
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
                  {item.text}
                </Text>
              </HStack>
              <HStack alignItems={"baseline"} space={1}>
                <Text
                  fontSize={"2xl"}
                  fontWeight={"semibold"}
                  color={`${item.color}.500`}
                >
                  {item.metric}
                </Text>
                <Text color={`${item.color}.500`}>item.unit</Text>
              </HStack>
            </Flex>
          )}
          keyExtractor={(item) => item.text}
        />
      </VStack>
      <Divider orientation={"horizontal"} />
      <Box mb={4}>
        <Text fontSize={"sm"} fontWeight={"bold"}>
          Comparison of your past performance
        </Text>
      </Box>
      <Box>
        <VictoryChart height={250} width={350} theme={VictoryTheme.material}>
          <VictoryBar data={chartData} x="day" y="steps" />
        </VictoryChart>
      </Box>
      <VStack>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"md"} fontWeight={"bold"}>
            Leadership board of our team
          </Text>
          <Button size={"sm"} variant={"ghost"}>
            View all
          </Button>
        </HStack>
        <FlatList
          data={teamData}
          horizontal={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              my={2}
            >
              <HStack space={2} alignItems={"center"}>
                <Icon
                  as={MaterialCommunityIcons}
                  name={item.icon}
                  size={"lg"}
                />
                <Avatar source={item.image} />
                <Text>{item.name}</Text>
              </HStack>
              <Text fontWeight={"bold"}>{item.stats}</Text>
            </HStack>
          )}
        />
      </VStack>
    </Box>
  );
};
