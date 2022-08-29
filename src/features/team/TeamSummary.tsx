import { Feather } from "@expo/vector-icons";
import { Box, Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { images } from "../../constants/images";

export const TeamSummary = ({ name, members, leader }) => {
  return (
    <HStack
      alignItems={"center"}
      space={4}
      borderWidth={1}
      borderColor={"gray.400"}
      p={2}
      borderRadius={"md"}
    >
      <Image source={images.TEAM} alt={"icon"} size={"lg"} />
      <VStack space={1}>
        <Box>
          <Heading>{name}</Heading>
          <Text fontSize={"xs"} color={"gray.400"}>
            ({members} members)
          </Text>
        </Box>
        {/* <Text>{location}</Text> */}
        <HStack alignItems={"center"} space={2}>
          <Icon as={Feather} name={"user-check"} />
          <Text>{leader}</Text>
        </HStack>
      </VStack>
    </HStack>
  );
};
