import { FontAwesome5 } from "@expo/vector-icons";
import {
  Box,
  Button,
  Icon,
  IconButton,
  Input,
  Pressable,
  VStack,
} from "native-base";
import { ActivityIndicator } from "react-native";
import { useGetOwnedChallengesQuery } from "../features/challenge/challengeApi";
import { TeamSummary } from "../features/team/TeamSummary";

export const OwnChallengesScreen = ({ navigation }) => {
  const { data, isLoading, isError, error } = useGetOwnedChallengesQuery();
  if (isLoading) {
    return (
      <Box flex={1}>
        <ActivityIndicator />
      </Box>
    );
  } else if (isError) {
    <Box>{error.error}</Box>;
  } else {
    console.log(data);
    const challenges = data.challenges;
    return (
      <VStack bg={"white"} flex={1} p={4}>
        <VStack space={8} flex={1}>
          <Input
            type="text"
            placeholder="Search Teams"
            InputRightElement={
              <IconButton
                icon={
                  <Icon as={FontAwesome5} name="search" color={"gray.400"} />
                }
              />
            }
          />
          <VStack space={4}>
            {challenges.map((challenge, index) => (
              <Pressable
                key={index.toString()}
                onPress={() =>
                  navigation.navigate("Admin Challenge Leadership", {
                    id: challenge.id,
                  })
                }
              >
                <TeamSummary
                  name={challenge.title}
                  members={challenge.users_count}
                  // location={team.location}
                  leader={challenge.owner.name}
                />
              </Pressable>
            ))}
          </VStack>
        </VStack>
        <Button
          colorScheme={"warning"}
          onPress={() => navigation.navigate("Create Challenge")}
        >
          Create Your Challenge
        </Button>
      </VStack>
    );
  }
};
