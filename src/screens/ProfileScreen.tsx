import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Select,
  Text,
  Toast,
  VStack,
} from "native-base";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useUpdateProfileMutation } from "../features/profile/profileApi";
import { useGetCurrentUserQuery } from "../features/user/userApi";
import { Loading } from "../shared";

export const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [birthDay, setBirthday] = useState("");
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

  const [profileLoaded, setProfileLoaded] = useState(false);

  const [updateProfile, { isLoading, isError, error }] =
    useUpdateProfileMutation();
  const {
    data,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useGetCurrentUserQuery();

  if (data && !profileLoaded) {
    setName(data.name);
    setEmail(data.email);
    setMobile(data.mobile_number);
    /** @ts-ignore **/
    setBirthday(new Date(data.birth_date));
    setGender(data.profile.gender);
    setHeight(data.profile.height);
    const savedWeight = data.profile.weight;
    const weightInKg = Math.floor(savedWeight / 1000);
    const weightInGm = savedWeight % 1000;
    setWeightInKg(weightInKg.toString() + " Kg");
    setWeightInGm(weightInGm.toString() + " Gm");
    setFitnessClub(data.profile.fitness_club);
    setCompany(data.profile.company_name);
    setDepartment(data.profile.department);
    setBuilding(data.profile.building_society);
    setPincode(data.profile.pin_code);
    setCity(data.profile.city);
    setProfileLoaded(true);
  }

  const onChange = (event, selectedDate) => {
    setBirthday(selectedDate);
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

  const saveUpdatedDetails = async () => {
    try {
      await updateProfile({
        name,
        email,
        mobile,
        birthDay,
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
      Toast.show({
        title: "Success",
        description: "Your profile has been updated.",
      });
    } catch (e) {
      console.log(e);
      Toast.show({
        title: "Error updating profile details",
        description: e.message,
      });
    }
  };

  if (isLoading || isUserLoading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView>
      <Box>
        <ScrollView px={8}>
          <VStack space={4} mt={8} mb={24}>
            <Box>
              <Input
                rounded={"md"}
                borderColor={"orange.500"}
                placeholder="Full name"
                value={name}
                isReadOnly={true}
                onChangeText={(text) => setName(text)}
              />
            </Box>
            <Box>
              <Input
                rounded={"md"}
                borderColor={"orange.500"}
                placeholder="Email"
                value={email}
                isReadOnly={true}
                onChangeText={(text) => setEmail(text)}
              />
            </Box>
            <Box>
              <Input
                rounded={"md"}
                borderColor={"orange.500"}
                placeholder="Mobile number"
                value={mobile}
                isReadOnly={true}
                onChangeText={(text) => setMobile(text)}
              />
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
            </Box>
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
            <VStack space={4}>
              <Box>
                <Input
                  borderColor={"orange.500"}
                  placeholder="Fitness club name *"
                  value={fitnessClub}
                  onChangeText={(text) => setFitnessClub(text)}
                />
              </Box>
              <Box>
                <Input
                  borderColor={"orange.500"}
                  placeholder="Company name *"
                  value={company}
                  onChangeText={(text) => setCompany(text)}
                />
              </Box>
              <Box>
                <Input
                  borderColor={"orange.500"}
                  placeholder="Department *"
                  value={department}
                  onChangeText={(text) => setDepartment(text)}
                />
              </Box>
              <Box>
                <Input
                  borderColor={"orange.500"}
                  placeholder="Building/Society name *"
                  value={building}
                  onChangeText={(text) => setBuilding(text)}
                />
              </Box>
              <Box>
                <Input
                  borderColor={"orange.500"}
                  placeholder="PIN Code *"
                  value={pincode}
                  onChangeText={(text) => setPincode(text)}
                />
              </Box>
              <Box>
                <Input
                  borderColor={"orange.500"}
                  placeholder="City *"
                  value={city}
                  onChangeText={(text) => setCity(text)}
                />
              </Box>
            </VStack>
          </VStack>
        </ScrollView>
        <Box
          position={"absolute"}
          bottom={0}
          w={"full"}
          px={4}
          bg={"white"}
          py={4}
        >
          <Button colorScheme={"orange"} onPress={saveUpdatedDetails}>
            Save
          </Button>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};
