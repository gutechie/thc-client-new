import { FontAwesome5 } from "@expo/vector-icons";
import { Box, Button, Icon, IconButton, Input, Text, VStack } from "native-base";
import { ActivityIndicator } from "react-native";
import { useGetTeamInvitationsQuery, useJoinTeamMutation } from "../features/team/teamApi";
import { TeamSummary } from "../features/team/TeamSummary";

export const InvitedTeamsScreen = ({ navigation }) => {
  const [joinTeam, {isLoading: isPosting}] = useJoinTeamMutation();
  const { data, isLoading, isError, error } = useGetTeamInvitationsQuery();
  
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

  const joinTeamHandle = async (id) => {
    try {
      await joinTeam({teamId: id}).unwrap()
      navigation.navigate("Show Teams")
    } catch (error) {
      console.log(error)
    }
  }

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
          {data.map((team, index) => (
            <Box key={index.toString()}>
              <TeamSummary
                name={team.name}
                members={team.users_count}
                // location={team.location}
                leader={team.owner.name}
              />
              <Button onPress={() => joinTeamHandle(team.id)}>JOIN</Button>
            </Box>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
};
