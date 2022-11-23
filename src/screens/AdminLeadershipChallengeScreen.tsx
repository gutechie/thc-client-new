import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "native-base";
import { ActivityIndicator } from "react-native";
import { images } from "../constants/images";
import { useGetChallengeQuery } from "../features/challenge/challengeApi";
import { routes } from "../constants/routes";

export const AdminLeadershipChallengeScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { data, isLoading, isError, error } = useGetChallengeQuery({ id });

  if (isLoading) {
    return (
      <Box flex={1}>
        <ActivityIndicator />
      </Box>
    );
  }
  if (isError) {
    return <Box>{error.error}</Box>;
  }

  const challenge = data.challenge;

  return (
    <Box px={8} py={4}>
      <VStack space={8}>
        <Button
          colorScheme={"orange"}
          onPress={() =>
            navigation.navigate(routes.ADD_CHALLENGE_USER, { challenge })
          }
        >
          Invite Members
        </Button>
        <VStack>
          <HStack space={2}>
            <Heading size={"xs"}>{challenge.title}</Heading>
            <Text>({challenge.users_count} people)</Text>
          </HStack>
          <FlatList
            data={challenge.users}
            horizontal={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <HStack
                justifyContent={"space-between"}
                alignItems={"center"}
                my={2}
              >
                <HStack space={2} alignItems={"center"}>
                  <Icon as={MaterialCommunityIcons} name="medal" size={"lg"} />
                  <Avatar source={images.AVATAR} />
                  <Text>{item.name}</Text>
                </HStack>
                <Text fontWeight={"bold"}>
                  {(Math.random() * 100).toFixed(2)}
                </Text>
              </HStack>
            )}
          />
        </VStack>
      </VStack>
    </Box>
  );
};
