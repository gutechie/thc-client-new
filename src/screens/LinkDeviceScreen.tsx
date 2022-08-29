import {
  Alert,
  Box,
  Button,
  CloseIcon,
  Flex,
  HStack,
  IconButton,
  Image,
  Select,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { authorize } from "react-native-app-auth";
import { config } from "../constants/config";
import { images } from "../constants/images";
import { routes } from "../constants/routes";
import { setAppId } from "../features/auth/authSlice";
import { useUpdateAppMutation } from "../features/profile/profileApi";
import { useAppDispatch } from "../hooks";
import { Loading } from "../shared/Loading";

export const LinkDeviceScreen = ({ navigation }) => {
  const [device, setDevice] = useState("");
  
  const dispatch = useAppDispatch()

  const [updateApp, { isLoading, isError, error }] = useUpdateAppMutation();

  const connectDevice = async () => {
    try {
      const result = await authorize(config[device]);
      console.log(result);
      const response = await updateApp({ app_name: device, app_credentials: result }).unwrap();
      dispatch(setAppId(response.app_id))
      navigation.replace(routes.DEVICE_CONNECTED);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Alert w="100%" status={"error"}>
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.800">
                {error.error}
              </Text>
            </HStack>
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
              icon={<CloseIcon size="3" color="coolGray.600" />}
            />
          </HStack>
        </VStack>
      </Alert>
    );
  }

  return (
    <Box px={8}>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        h={56}
        position={"relative"}
      >
        <Box position={"absolute"}>
          <Image
            source={images.LINK_DEVICE_BANNER}
            size={"2xl"}
            resizeMode={"contain"}
            alt={"banner"}
          />
        </Box>
        <Box>
          <Text>Be a part of</Text>
          <Text>Healthy Comparison Community</Text>
          <Button w={"32"} variant={"outline"} colorScheme={"light"}>
            Know more
          </Button>
        </Box>
      </Flex>

      <VStack space={4} mb={8}>
        {/* <Heading size={"sm"}>Hello {user.name}</Heading> */}
        <Text>Let's connect with your fitness wearable app.</Text>
        <Select
          placeholder={"Select your wearable device app"}
          selectedValue={device}
          onValueChange={(value) => setDevice(value)}
        >
          <Select.Item label="Strava" value="strava" />
          <Select.Item label="Google Fit" value="google fit" />
          <Select.Item label="Other" value="other" />
        </Select>

        {device === "other" && (
          <Box bg={"danger.100"} p={4}>
            <Text>
              We are currently allowing ony Strava and Google fit to connect. In
              case you are using some other device, you can choose one of the
              below steps to continue using our app:
            </Text>
            <Text mt={4}>
              1. Connect your device with Google Fit and use our app with Google
              Fit.
            </Text>
            <Text>2. Manually share your data</Text>
          </Box>
        )}

        <Button colorScheme={"orange"} onPress={connectDevice}>
          Connect
        </Button>
      </VStack>
    </Box>
  );
};
