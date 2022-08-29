import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Divider,
  FlatList,
  Flex,
  Heading,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack
} from "native-base";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { routes } from "../constants/routes";
import { selectUser } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks";

export const HomeScreen = ({ navigation }) => {
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
    <Box bg={"white"}>
      <ScrollView px={8} py={4}>
        <VStack space={4}>
          <Box>
            <Heading size="md" fontWeight={"semibold"}>
              Hello {user.name.split(" ")[0]}
            </Heading>
            <Text>You did great today</Text>
          </Box>
          <Box bg={"gray.200"} p={4} rounded={"md"}>
            <HStack alignItems={"center"}>
              <Icon
                as={Ionicons}
                name="information-circle"
                color={"yellow.500"}
                size={"lg"}
              />
              <Text fontWeight={"bold"} px={4}>
                4755 people have ran more than 6 km today in your segment
              </Text>
            </HStack>
          </Box>
        </VStack>
        <VStack my={8}>
          <Heading size={"md"} mb={3}>
            Today
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
          <Button
            bg={"black"}
            rightIcon={<Icon as={Ionicons} name="ios-arrow-forward" />}
            my={6}
            onPress={() => navigation.navigate(routes.HOME_OTHERS)}
          >
            See how other are doing
          </Button>
        </VStack>
        <Divider orientation={"horizontal"} />
        <Text fontSize={"sm"} fontWeight={"bold"}>
          Comparison of your past performance
        </Text>
        <Box mb={16}>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryBar data={chartData} x="step" y="day" />
          </VictoryChart>
        </Box>
      </ScrollView>
    </Box>
  );
};
