import {
  Box,
  Button,
  Heading, Input, ScrollView, VStack
} from "native-base";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import { useCreateTeamMutation } from "../features/team/teamApi";

export const CreateTeamScreen = ({navigation}) => {
  const [title, setTitle] = useState("");
  const [logo, setLogo] = useState<Asset>();
  const [description, setDescription] = useState("");

  const [createTeam, { isLoading }] = useCreateTeamMutation();

  const pickImage = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo'
    });
    
    if (!result.didCancel) {
      setLogo(result.assets[0]);
    }
  };

  const handleCreate = async () => {
    // const postData = new FormData();
    // postData.append('title', title)
    // postData.append('description', description)
    // postData.append('logo', {
    //   name: logo.fileName,
    //   type: logo.type,
    //   uri: logo.uri.replace(/file:\/\//, "")
    // })

    try {
      await createTeam({title, description}).unwrap();
      navigation.replace("Show Teams")
  } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <Box flex="1">
        <ActivityIndicator />
      </Box>
    );
  }

  return (
    <Box h={"full"}>
      <ScrollView p={8}>
        <VStack space={4}>
          <Box>
            <Heading size={"md"} color={"gray.700"}>
              Create a new team
            </Heading>
          </Box>
          <Input
            type="text"
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholder={"Team title"}
          />
          {/* <Pressable onPress={pickImage}>
            <HStack
              py={4}
              alignItems={"center"}
              justifyContent={"center"}
              bg={"gray.100"}
              borderColor={"gray.300"}
              borderWidth={1}
              rounded={"md"}
            >
              <VStack alignItems={"center"} space={1}>
                <Icon
                  as={Ionicons}
                  name={"image-outline"}
                  size={"lg"}
                  color={"gray.400"}
                />
                <Text color={"gray.400"} fontSize={"xs"}>
                  Upload Team Logo
                </Text>
              </VStack>
            </HStack>
            {logo && <Image src={logo.uri} size={"sm"} alt={"selected image"} />}
          </Pressable> */}
          <Input
            type="text"
            value={description}
            multiline={true}
            numberOfLines={6}
            onChangeText={(text) => setDescription(text)}
            placeholder={"Description"}
          />
          <Button my={8} colorScheme={"orange"} onPress={handleCreate}>
            Create
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
};
