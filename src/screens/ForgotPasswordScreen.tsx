import { Box, Button, Heading, Image, Input, Text } from "native-base";
import { useState } from "react";
import { images } from "../constants/images";

export const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  return (
    <Box py={8} px={12}>
      <Heading size={"md"} color={"darkText"}>
        Reset Password
      </Heading>
      <Box alignItems={"center"} my={4}>
        <Image
          source={images.BULB}
          size={"xl"}
          resizeMode={"contain"}
          alt={"Image of a bulb"}
        />
      </Box>
      <Text textAlign={"center"} fontWeight={"bold"} fontSize={"lg"}>
        Forgot your password?
      </Text>
      <Text textAlign={"center"} fontSize={"md"} color={"light.500"} my={2}>
        Don't worry! We will help you to reset it.
      </Text>
      <Box my={8}>
        <Input
          borderColor={"orange.500"}
          rounded={"md"}
          placeholder="Email address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </Box>
      <Button size={"lg"} colorScheme={"orange"}>
        Send reset email
      </Button>
    </Box>
  );
};
