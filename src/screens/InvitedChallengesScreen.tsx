import { FontAwesome5 } from "@expo/vector-icons";
import {
  Box,
  Button,
  Icon,
  IconButton,
  Input,
  Text,
  VStack,
} from "native-base";
import { ActivityIndicator } from "react-native";
import {
  useGetChallengeInvitationsQuery,
  useJoinChallengeMutation,
} from "../features/challenge/challengeApi";
import { TeamSummary } from "../features/team/TeamSummary";

export const InvitedChallengesScreen = ({ navigation }) => {
  const [joinChallenge, { isLoading: isPosting }] = useJoinChallengeMutation();
  const { data, isLoading, isError, error } = useGetChallengeInvitationsQuery();

  if (isLoading || isPosting) {
    return (
      <Box flex={1} justifyContent={"center"} alignItems={"center"}>
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

  const joinChallengeHandle = async (id) => {
    try {
      await joinChallenge({ challengeId: id }).unwrap();
      navigation.navigate("Show Challenges");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack bg={"white"} flex={1} p={4}>
      <VStack space={8} flex={1}>
        <Input
          type="text"
          placeholder="Search Teams"
          InputRightElement={
            <IconButton
              icon={<Icon as={FontAwesome5} name="search" color={"gray.400"} />}
            />
          }
        />
        <VStack space={4}>
          {data.map((challenge, index) => (
            <Box key={index.toString()}>
              <TeamSummary
                name={challenge.title}
                members={challenge.users_count}
                // location={team.location}
                leader={challenge.owner.name}
              />
              <Button onPress={() => joinChallengeHandle(challenge.id)}>
                JOIN
              </Button>
            </Box>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
};
