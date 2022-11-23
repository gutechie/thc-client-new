import {
  Box,
  Button,
  Heading,
  HStack,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { ActivityIndicator } from "react-native";
import { useGetChallengesSummaryQuery } from "../features/challenge/challengeApi";

export const ShowChallengesScreen = ({ navigation }) => {
  const { data, isLoading, isError, error } = useGetChallengesSummaryQuery();

  if (isLoading) {
    return (
      <Box>
        <ActivityIndicator />
      </Box>
    );
  }

  // if (isError) {
  //   return (
  //     <Box>
  //       <Text>{error.error}</Text>
  //     </Box>
  //   );
  // }

  console.log(data);

  return (
    <VStack bg={"white"} flex={1} p={4}>
      <VStack space={8} flex={1}>
        <Pressable onPress={() => navigation.navigate("Owned Challenges")}>
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
                Owned Challenges
              </Heading>
              <Text color={"warning.50"}>Challenges created by you</Text>
            </Box>
            <Box>
              <Text color={"primary.50"} fontSize={"xl"} textAlign={"center"}>
                {data.ownedChallenges}
              </Text>
              <Text color={"warning.50"}>Challenges</Text>
            </Box>
          </HStack>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Member Challenges")}>
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
                Member Challenges
              </Heading>
              <Text color={"primary.50"} w="48">
                Challenges in which you are a member
              </Text>
            </Box>
            <Box>
              <Text color={"primary.50"} fontSize={"xl"} textAlign={"center"}>
                {data.memberChallenges}
              </Text>
              <Text color={"primary.50"}>Challenges</Text>
            </Box>
          </HStack>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Invited Challenges")}>
          <HStack
            bg={"secondary.400"}
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
                Invited Challenges
              </Heading>
              <Text color={"primary.50"} w="48">
                Challenges you are invited to
              </Text>
            </Box>
            <Box>
              <Text color={"primary.50"} fontSize={"xl"} textAlign={"center"}>
                {data.invitedChallenges}
              </Text>
              <Text color={"primary.50"}>Challenges</Text>
            </Box>
          </HStack>
        </Pressable>
      </VStack>
      <Button
        colorScheme={"orange"}
        onPress={() => navigation.navigate("Create Challenge")}
      >
        Create Your Challenge
      </Button>
    </VStack>
  );
  // }
};
