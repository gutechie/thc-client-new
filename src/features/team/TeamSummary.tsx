import { Feather } from "@expo/vector-icons";
import { Box, Heading, HStack, Icon, Image, Text, VStack } from "native-base";

export const TeamSummary = ({ name, members, leader, logo }) => {
  return (
    <HStack
      alignItems={"center"}
      space={4}
      borderWidth={1}
      borderColor={"gray.400"}
      p={2}
      borderRadius={"md"}
    >
      <Image
        source={{ uri: logo }}
        alt={"icon"}
        size={"lg"}
        key={`${name}-${leader}-${members}`}
      />
      <VStack space={1}>
        <Box>
          <Heading size={"sm"}>{name}</Heading>
          <Text fontSize={"xs"} color={"gray.400"}>
            ({members} members)
          </Text>
        </Box>
        {/* <Text>{location}</Text> */}
        <HStack alignItems={"center"} space={2}>
          <Icon as={Feather} name={"user-check"} />
          <Text fontSize={"sm"}>{leader}</Text>
        </HStack>
      </VStack>
    </HStack>
  );
};
