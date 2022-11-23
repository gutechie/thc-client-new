import { FontAwesome5 } from "@expo/vector-icons";
import { Box, Button, Icon, IconButton, Input, VStack } from "native-base";
import { ActivityIndicator, Pressable } from "react-native";
import { useGetMemberTeamsQuery } from "../features/team/teamApi";
import { TeamSummary } from "../features/team/TeamSummary";

export const MemberTeamsScreen = ({ navigation }) => {
  const { data, isLoading, isError, error } = useGetMemberTeamsQuery();
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
    const teams = data.teams;
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
            {teams.map((team, index) => (
              <Pressable
                key={index.toString()}
                onPress={() =>
                  navigation.navigate("Member Leadership", { id: team.id })
                }
              >
                <TeamSummary
                  name={team.name}
                  members={team.users_count}
                  // location={team.location}
                  leader={team.owner.name}
                />
              </Pressable>
            ))}
          </VStack>
        </VStack>
        <Button
          colorScheme={"warning"}
          onPress={() => navigation.navigate("Create Team")}
        >
          Create Your Team
        </Button>
      </VStack>
    );
  }
};
