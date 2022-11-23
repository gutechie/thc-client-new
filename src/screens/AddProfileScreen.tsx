import {
  Alert,
  Box,
  Button,
  CloseIcon,
  Heading,
  HStack,
  IconButton,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Select,
  Text,
  Toast,
  VStack,
} from "native-base";
import { useState } from "react";
import { routes } from "../constants/routes";
import { authProfileCreated, selectUser } from "../features/auth/authSlice";
import { useAddProfileMutation } from "../features/profile/profileApi";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Loading } from "../shared/Loading";

export const AddProfileScreen = ({ navigation }) => {
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weightInKg, setWeightInKg] = useState("");
  const [weightInGm, setWeightInGm] = useState("");
  const [fitnessClub, setFitnessClub] = useState("");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [building, setBuilding] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [addProfile, { isLoading, isError, error }] = useAddProfileMutation();

  const [formState, setFormState] = useState({
    invalidInputs: [],
    errors: {
      gender: "",
      height: "",
      weight: "",
      fitnessClub: "",
      company: "",
      department: "",
      building: "",
      pincode: "",
      city: "",
    },
  });

  const handleSubmit = async () => {
    const currentState = {
      invalidInputs: [],
      errors: {
        gender: "",
        height: "",
        weight: "",
        fitnessClub: "",
        company: "",
        department: "",
        building: "",
        pincode: "",
        city: "",
      },
    };
    if (gender === "") {
      currentState.invalidInputs.push("gender");
      currentState.errors.gender = "Gender is required";
    }
    if (height === "") {
      currentState.invalidInputs.push("height");
      currentState.errors.height = "Height is required";
    }
    if (weightInKg === "") {
      currentState.invalidInputs.push("weight");
      currentState.errors.weight = "Weight is required";
    }
    if (fitnessClub === "") {
      currentState.invalidInputs.push("fitnessClub");
      currentState.errors.fitnessClub = "Fitness club name is required";
    }
    if (company === "") {
      currentState.invalidInputs.push("company");
      currentState.errors.company = "Company name is required";
    }
    if (department === "") {
      currentState.invalidInputs.push("department");
      currentState.errors.department = "Department is required";
    }
    if (building === "") {
      currentState.invalidInputs.push("building");
      currentState.errors.building = "Building/Society name is required";
    }
    if (pincode === "") {
      currentState.invalidInputs.push("pincode");
      currentState.errors.pincode = "PIN Code is required";
    }
    if (city === "") {
      currentState.invalidInputs.push("city");
      currentState.errors.city = "City is required";
    }
    setFormState(currentState);

    if (formState.invalidInputs.length === 0) {
      try {
        await addProfile({
          gender,
          height,
          weight: +weightInKg * 1000 + weightInGm,
          fitness_club: fitnessClub,
          company_name: company,
          department,
          building_society: building,
          pin_code: pincode,
          city,
        }).unwrap();

        dispatch(authProfileCreated());
        navigation.navigate(routes.LINK_DEVICE);
      } catch (error) {
        Toast.show({ description: error.data.message });
      }
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
    <KeyboardAvoidingView>
      <Box py={8} px={12} h={"full"}>
        <Heading size={"md"} color={"darkText"} mb={4}>
          Tell us about yourself
        </Heading>
        <HStack space={4}>
          <Box w={"1/2"}>
            <Select
              borderColor={"orange.500"}
              placeholder="Gender *"
              accessibilityLabel="Gender"
              selectedValue={gender}
              onValueChange={(value) => setGender(value)}
            >
              <Select.Item label="Male" value="male" />
              <Select.Item label="Female" value="female" />
              <Select.Item label="Other" value="transgender" />
            </Select>
            {formState.invalidInputs.includes("gender") && (
              <Text color={"red.500"} fontSize={"xs"}>
                {formState.errors.gender}
              </Text>
            )}
          </Box>
          <Box w={"1/2"}>
            <Select
              borderColor={"orange.500"}
              placeholder="Height *"
              accessibilityLabel="Height"
              selectedValue={height}
              onValueChange={(value) => setHeight(value)}
            >
              <Select.Item label="4.11 ft" value="159" />
              <Select.Item label="5.0 ft" value="160" />
              <Select.Item label="5.1 ft" value="161" />
              <Select.Item label="5.2 ft" value="162" />
              <Select.Item label="5.3 ft" value="163" />
              <Select.Item label="5.4 ft" value="164" />
              <Select.Item label="5.5 ft" value="165" />
              <Select.Item label="5.6 ft" value="166" />
              <Select.Item label="5.7 ft" value="167" />
              <Select.Item label="5.8 ft" value="168" />
              <Select.Item label="5.9 ft" value="169" />
              <Select.Item label="5.10 ft" value="170" />
              <Select.Item label="5.11 ft" value="171" />
              <Select.Item label="6.0 ft" value="172" />
            </Select>
            {formState.invalidInputs.includes("height") && (
              <Text color={"red.500"} fontSize={"xs"}>
                {formState.errors.height}
              </Text>
            )}
          </Box>
        </HStack>
        <Text mt={4}>Weight</Text>
        <HStack mt={2} space={4} mb={4}>
          <Box w={"1/2"}>
            <Input
              borderColor={"orange.500"}
              placeholder="Kg *"
              value={weightInKg}
              onChangeText={(text) => setWeightInKg(text)}
            />
            {formState.invalidInputs.includes("weight") && (
              <Text color={"red.500"} fontSize={"xs"}>
                {formState.errors.weight}
              </Text>
            )}
          </Box>
          <Box w={"1/2"}>
            <Input
              borderColor={"orange.500"}
              placeholder="Gm"
              value={weightInGm}
              onChangeText={(text) => setWeightInGm(text)}
            />
          </Box>
        </HStack>
        <Heading size={"md"} color={"darkText"} my={4}>
          Let's know more about you
        </Heading>
        <ScrollView mb={4}>
          <VStack space={4}>
            <Box>
              <Input
                borderColor={"orange.500"}
                placeholder="Fitness club name *"
                value={fitnessClub}
                onChangeText={(text) => setFitnessClub(text)}
              />
              {formState.invalidInputs.includes("fitnessClub") && (
                <Text color={"red.500"} fontSize={"xs"}>
                  {formState.errors.fitnessClub}
                </Text>
              )}
            </Box>
            <Box>
              <Input
                borderColor={"orange.500"}
                placeholder="Company name *"
                value={company}
                onChangeText={(text) => setCompany(text)}
              />
              {formState.invalidInputs.includes("company") && (
                <Text color={"red.500"} fontSize={"xs"}>
                  {formState.errors.company}
                </Text>
              )}
            </Box>
            <Box>
              <Input
                borderColor={"orange.500"}
                placeholder="Department *"
                value={department}
                onChangeText={(text) => setDepartment(text)}
              />
              {formState.invalidInputs.includes("department") && (
                <Text color={"red.500"} fontSize={"xs"}>
                  {formState.errors.department}
                </Text>
              )}
            </Box>
            <Box>
              <Input
                borderColor={"orange.500"}
                placeholder="Building/Society name *"
                value={building}
                onChangeText={(text) => setBuilding(text)}
              />
              {formState.invalidInputs.includes("building") && (
                <Text color={"red.500"} fontSize={"xs"}>
                  {formState.errors.building}
                </Text>
              )}
            </Box>
            <Box>
              <Input
                borderColor={"orange.500"}
                placeholder="Enter PIN Code *"
                value={pincode}
                onChangeText={(text) => setPincode(text)}
              />
              {formState.invalidInputs.includes("pincode") && (
                <Text color={"red.500"} fontSize={"xs"}>
                  {formState.errors.pincode}
                </Text>
              )}
            </Box>
            <Box>
              <Input
                borderColor={"orange.500"}
                placeholder="City *"
                value={city}
                onChangeText={(text) => setCity(text)}
              />
              {formState.invalidInputs.includes("city") && (
                <Text color={"red.500"} fontSize={"xs"}>
                  {formState.errors.city}
                </Text>
              )}
            </Box>
          </VStack>
        </ScrollView>
        <Button colorScheme={"orange"} onPress={handleSubmit}>
          Looks Good
        </Button>
      </Box>
    </KeyboardAvoidingView>
  );
};
