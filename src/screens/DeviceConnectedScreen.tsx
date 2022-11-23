import { Box, Button, Heading, Image, Text, VStack } from "native-base";
import { images } from "../constants/images";
import { selectUser } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks";

export const DeviceConnectedScreen = ({ navigation }) => {
  const user = useAppSelector(selectUser);

  const proceed = () => {
    navigation.replace("tab");
  };
  return (
    <Box p={8}>
      <VStack alignItems={"center"} space={8}>
        <Image
          key={"shield"}
          source={images.SHIELD}
          alt="A Picture of a shield"
          size={"2xl"}
        />
        <Heading size={"md"}>Congratulations {user.name}!</Heading>
        <Box color={"lightText"}>
          <Text>Your device app is successfully connected. </Text>
          <Text>Enjoy using The Healthy Comparison.</Text>
        </Box>

        <Button colorScheme={"orange"} onPress={proceed} width={"full"}>
          Proceed
        </Button>
      </VStack>
    </Box>
  );
};
