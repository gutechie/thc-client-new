import { Box, Button, Heading, HStack, Text, VStack } from "native-base";
import { ActivityIndicator, Pressable } from "react-native";
import { useGetTeamsSummaryQuery } from "../features/team/teamApi";

export const ShowTeamsScreen = ({ navigation }) => {
  const { data, isLoading, isError, error } = useGetTeamsSummaryQuery();

  if (isLoading) {
    return (
      <Box flex={1}>
        <ActivityIndicator />
      </Box>
    );
  } else if (isError) {
    return <Box>{error.error}</Box>;
  } else {
    return (
      <VStack bg={"white"} flex={1} p={4}>
        <VStack space={8} flex={1}>
          <Pressable onPress={() => navigation.navigate("Owned Teams")}>
            <HStack
              bg={"warning.400"}
              borderTopLeftRadius={"3xl"}
              borderBottomRightRadius={"3xl"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mx={4}
              py={10}
              px={4}
            >
              <Box>
                <Heading fontWeight={"bold"} size={"md"} color={"warning.50"}>
                  Owned Teams
                </Heading>
                <Text color={"warning.50"}>Teams created by you</Text>
              </Box>
              <Box>
                <Text color={"primary.50"} fontSize={"xl"} textAlign={"center"}>
                  {data.ownedTeams}
                </Text>
                <Text color={"warning.50"}>Teams</Text>
              </Box>
            </HStack>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Member Teams")}>
            <HStack
              bg={"primary.400"}
              borderTopLeftRadius={"3xl"}
              borderBottomRightRadius={"3xl"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mx={4}
              py={10}
              px={4}
            >
              <Box>
                <Heading fontWeight={"bold"} size={"md"} color={"primary.50"}>
                  Member Teams
                </Heading>
                <Text color={"primary.50"}>
                  Teams in which you are a member
                </Text>
              </Box>
              <Box>
                <Text color={"primary.50"} fontSize={"xl"} textAlign={"center"}>
                  {data.memberTeams}
                </Text>
                <Text color={"primary.50"}>Teams</Text>
              </Box>
            </HStack>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Invited Teams")}>
            <HStack
              bg={"primary.400"}
              borderTopLeftRadius={"3xl"}
              borderBottomRightRadius={"3xl"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mx={4}
              py={10}
              px={4}
            >
              <Box>
                <Heading fontWeight={"bold"} size={"md"} color={"secondary.50"}>
                  Invited Teams
                </Heading>
                <Text color={"secondary.50"}>
                  Team Invitations
                </Text>
              </Box>
              <Box>
                <Text color={"secondary.50"} fontSize={"xl"} textAlign={"center"}>
                  {data.invitedTeams}
                </Text>
                <Text color={"secondary.50"}>Teams</Text>
              </Box>
            </HStack>
          </Pressable>
        </VStack>
        <Button
          colorScheme={"orange"}
          onPress={() => navigation.navigate("Create Team")}
        >
          Create Your Team
        </Button>
      </VStack>
    );
  }
};
