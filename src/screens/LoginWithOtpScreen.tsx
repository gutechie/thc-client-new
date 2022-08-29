import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Text,
} from "native-base";
import { useState } from "react";
import { Pressable } from "react-native";
import { images } from "../constants/images";
import { routes } from "../constants/routes";

export const LoginWithOtpScreen = ({ navigation }) => {
  const [otpVisible, setOtpVisible] = useState(false);

  return (
    <Box py={8} px={12}>
      <Box>
        <Input
          rounded={"md"}
          borderColor={"orange.500"}
          placeholder="10 digit mobile number"
        />
      </Box>
      <Box my="4">
        <Input
          rounded={"md"}
          borderColor={"orange.500"}
          type={otpVisible ? "text" : "password"}
          placeholder="Enter OTP"
          InputRightElement={
            <IconButton
              onPress={() => setOtpVisible(!otpVisible)}
              icon={<Icon as={Ionicons} name={"eye"} />}
              size={"md"}
            />
          }
        />
      </Box>
      <HStack justifyContent={"space-between"}>
        <HStack space={1}>
          <Text fontSize={"xs"}>OTP valid till</Text>
          <Text fontSize={"xs"} color={"green.500"}>
            0:59
          </Text>
        </HStack>
        <HStack mb={4} space={1}>
          <Text fontSize={"xs"}>Didn't receive OTP?</Text>
          <Pressable>
            <Text fontSize={"xs"} fontWeight={"semibold"}>
              Send again
            </Text>
          </Pressable>
        </HStack>
      </HStack>
      <Button my={4} colorScheme={"orange"}>
        Login
      </Button>
      <Pressable onPress={() => navigation.navigate(routes.PASSWORD_LOGIN)}>
        <Text textAlign={"center"}>Login with Passsword</Text>
      </Pressable>
      <HStack justifyContent={"center"} my={4} space={1}>
        <Text>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate(routes.REGISTER)}>
          <Text fontWeight={"semibold"}>sign up here</Text>
        </Pressable>
      </HStack>
      <HStack justifyContent={"center"} space="2">
        <Image
          key={"google"}
          source={images.social.GOOGLE}
          size={"xs"}
          alt="google social icon"
        />
        <Image
          key={"strava"}
          source={images.social.STRAVA}
          size={"xs"}
          alt="strava social icon"
        />
        <Image
          key={"fitbit"}
          source={images.social.FITBIT}
          size={"xs"}
          alt="fitbit social icon"
        />
      </HStack>
      <Heading size={"md"} color={"darkText"} textAlign={"center"} mt={4}>
        1,435 people today joined HealthyComparison.
      </Heading>
      <Box alignItems={"center"}>
        <Image
          key={"login-bg"}
          source={images.LOGIN_BG}
          size={"2xl"}
          alt="Login Background"
          resizeMode={"contain"}
        />
      </Box>
    </Box>
  );
};
