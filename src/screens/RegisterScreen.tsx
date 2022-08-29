import Ionicons from "@expo/vector-icons/Ionicons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import * as Device from "expo-device";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  Toast,
  VStack
} from "native-base";
import { useState } from "react";
import { images } from "../constants/images";
import { routes } from "../constants/routes";
import {
  useLoginWithPasswordMutation,
  useRegisterUserMutation
} from "../features/auth/authApi";
import { login } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks";
import { Loading } from "../shared/Loading";

export const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [birthDay, setBirthday] = useState();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [loginWithPassword, { isLoading: isLoginLoading }] =
    useLoginWithPasswordMutation();
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState({
    invalidInputs: [],
    errors: {
      name: "",
      email: "",
      mobile: "",
      birthday: "",
      password: "",
    },
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setBirthday(currentDate);
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(1598051730000),
      onChange,
      mode: "date",
    });
  };

  const format = (date: Date) => {
    if (!date) {
      return "";
    }
    const month = date.getMonth() + 1;
    const day = date.getDate().toString();
    const year = date.getFullYear();

    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year.toString()}`;
  };

  const formatAlt = (date: Date) => {
    if (!date) {
      return "";
    }
    const month = date.getMonth() + 1;
    const day = date.getDate().toString();
    const year = date.getFullYear();

    return `${year.toString()}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };

  const onSignUp = async () => {
    const currentState = {
      invalidInputs: [],
      errors: {
        name: "",
        email: "",
        mobile: "",
        birthday: "",
        password: "",
      },
    };
    if (name === "") {
      currentState.invalidInputs.push("name");
      currentState.errors.name = "Full name is required";
    }
    if (email === "") {
      currentState.invalidInputs.push("email");
      currentState.errors.email = "Email is required";
    }
    if (mobile === "") {
      currentState.invalidInputs.push("mobile");
      currentState.errors.mobile = "Mobile number is required";
    }
    if (format(birthDay) === "") {
      currentState.invalidInputs.push("birthday");
      currentState.errors.birthday = "Birthday is required";
    }
    if (password === "") {
      currentState.invalidInputs.push("password");
      currentState.errors.password = "Password is required";
    }
    setFormState(currentState);

    if (formState.invalidInputs.length === 0) {
      if (!acceptedTerms) {
        Toast.show({ description: "Please accept the Terms & Condtions" });
      } else {
        try {
          const registerResponse = await registerUser({
            name,
            email,
            mobile_number: mobile,
            birth_date: formatAlt(birthDay),
            password,
          }).unwrap();
          const loginResponse = await loginWithPassword({
            email,
            password,
            device_name: Device.deviceName,
          }).unwrap();
          dispatch(
            login({
              authenticated: true,
              token: loginResponse.token,
              user: loginResponse.user,
            })
          );
        } catch (error) {
          console.log(error);
          Toast.show({ description: error.data.message });
        }
      }
    }
  };

  if(isLoading || isLoginLoading) {
    return <Loading />
  }

  return (
    <Box pt={9}>
      <ScrollView px={12}>
        <Box>
          <HStack justifyContent={"flex-end"}>
            <Pressable>
              <Text color={"orange.500"} letterSpacing={"lg"}>
                Skip
              </Text>
            </Pressable>
          </HStack>
          <Heading size={"md"} mt={4} color={"darkText"}>
            Create an account
          </Heading>
          <VStack space={4} my={8}>
            <Box>
              <Input
                rounded={"md"}
                borderColor={"orange.500"}
                placeholder="Full name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              {formState.invalidInputs.includes("name") && (
                <Text color={"red.500"} fontSize={"xs"}>
                  {formState.errors.name}
                </Text>
              )}
            </Box>
            <Box>
              <Input
                rounded={"md"}
                borderColor={"orange.500"}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              {formState.invalidInputs.includes("email") && (
                <Text color={"red.500"} fontSize={"xs"}>
                  {formState.errors.email}
                </Text>
              )}
            </Box>
            <Box>
              <Input
                rounded={"md"}
                borderColor={"orange.500"}
                placeholder="Mobile number"
                value={mobile}
                onChangeText={(text) => setMobile(text)}
              />
              {formState.invalidInputs.includes("mobile") && (
                <Text color={"red.500"} fontSize={"xs"}>
                  {formState.errors.mobile}
                </Text>
              )}
            </Box>
            <Box>
              <Input
                rounded={"md"}
                borderColor={"orange.500"}
                placeholder="Birthday"
                value={format(birthDay)}
                onPressOut={showDatePicker}
                InputRightElement={
                  <Icon
                    as={<Ionicons name={"calendar"} />}
                    size={8}
                    color={"orange.500"}
                    mr={2}
                  />
                }
              />
              {formState.invalidInputs.includes("birthday") && (
                <Text color={"red.500"} fontSize={"xs"}>
                  {formState.errors.birthday}
                </Text>
              )}
            </Box>
            <Box>
              <Input
                type={"password"}
                rounded={"md"}
                borderColor={"orange.500"}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              {formState.invalidInputs.includes("password") && (
                <Text color={"red.500"} fontSize={"xs"}>
                  {formState.errors.password}
                </Text>
              )}
            </Box>
          </VStack>
          <HStack justifyContent={"center"} space={1}>
            <Text color={"light.500"}>Already have an account?</Text>
            <Pressable
              onPress={() => navigation.navigate(routes.PASSWORD_LOGIN)}
            >
              <Text fontWeight={"bold"}>Login here</Text>
            </Pressable>
          </HStack>
          <Text textAlign={"center"} my={4} color={"light.500"}>
            or Sign up with
          </Text>
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
          <HStack my={4} space={2} alignItems={"flex-start"}>
            <Checkbox
              value={"acceptedTerms"}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
              accessibilityLabel={"Accept terms and conditions"}
            />
            <Text fontSize={"xs"}>
              I agree to the Terms & Conditions and Privacy Policy of The
              Healthy Comparision.
            </Text>
          </HStack>
          <Button mt={4} mb={8} colorScheme={"orange"} onPress={onSignUp}>
            Sign up
          </Button>
          <HStack justifyContent={"center"} space={1} mb={4}>
            <Pressable>
              <Text color={"light.500"} fontSize={"xs"}>
                Privacy Policy
              </Text>
            </Pressable>
            <Text color={"light.500"} fontSize={"xs"}>
              |
            </Text>
            <Pressable>
              <Text color={"light.500"} fontSize={"xs"}>
                Terms of Use
              </Text>
            </Pressable>
          </HStack>
        </Box>
      </ScrollView>
    </Box>
  );
};
