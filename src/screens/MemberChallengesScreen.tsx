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
import { useGetMemberChallengesQuery } from "../features/challenge/challengeApi";
import { TeamSummary } from "../features/team/TeamSummary";

export const MemberChallengesScreen = ({ navigation }) => {
  const { data, isLoading, isError, error } = useGetMemberChallengesQuery();
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
            placeholder="Search Challenges"
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
                  navigation.navigate("Member Challenge Leadership", {
                    id: challenge.id,
                  })
                }
              >
                <TeamSummary
                  name={challenge.title}
                  members={challenge.users_count}
                  // location={challenge.location}
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
