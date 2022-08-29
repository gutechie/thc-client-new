import { FontAwesome5 } from "@expo/vector-icons";
import {
  Box,
  Button,
  Icon,
  IconButton,
  Input,
  Pressable,
  VStack
} from "native-base";
import { ActivityIndicator } from "react-native";
import { useGetOwnedTeamsQuery } from "../features/team/teamApi";
import { TeamSummary } from "../features/team/TeamSummary";

export const OwnTeamsScreen = ({ navigation }) => {
  const { data, isLoading, isError, error } = useGetOwnedTeamsQuery();
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
              icon={<Icon as={FontAwesome5} name="search" color={"gray.400"} />}
            />
          }
        />
        <VStack space={4}>
          {teams.map((team, index) => (
            <Pressable
              key={index.toString()}
              onPress={() =>
                navigation.navigate("Admin Leadership", { id: team.id })
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
};
