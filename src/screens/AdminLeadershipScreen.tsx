import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Avatar, Box, Button, FlatList, Heading, HStack, Icon, Pressable, Text, Toast, VStack} from "native-base";
import {ActivityIndicator} from "react-native";
import {useGetTeamQuery, useUpdateTeamMutation} from "../features/team/teamApi";
import {routes} from "../constants/routes";
import {Team} from "../models";
import {useState} from "react";
import {Asset, launchImageLibrary} from "react-native-image-picker";

export const AdminLeadershipScreen = ({route, navigation}) => {
    const {id} = route.params;
    const {data, isLoading, isError, error} = useGetTeamQuery({id});
    const [updateTeam, {isLoading: isLogoUpdating, isError: isLogoError, error: logoError}] = useUpdateTeamMutation();

    const [logo, setLogo] = useState<Asset>();


    const pickImage = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo'
        });

        if (!result.didCancel) {
            setLogo(result.assets[0]);
        } else {
            Toast.show({title: "Error selecting the file", description: result.errorMessage})
        }
    };

    const handleLogoUpdate = async () => {
        try {
            await pickImage();
            await updateTeam({logo, teamId: team.id}).unwrap()
        } catch (e) {
            console.log(e);
            Toast.show({title: "Error updating logo", description: e.data ? e.data.message : 'Something gone wrong.'})
        }
    };

    // todo: dont load team and user data together. Load them separately to make the pagination work on users

    if (isLoading || isLogoUpdating) {
        return (
            <Box flex={1}>
                <ActivityIndicator/>
            </Box>
        );
    }
    if (isError || isLogoError) {
        if (isLogoError) {
            return <Box>{logoError.error}</Box>;
        }
        return <Box>{error.error}</Box>;
    }

    const team: Team = data.data

    return (
        <Box px={8} py={4}>
            <VStack space={8}>
                <Button colorScheme={"orange"}
                        onPress={() => navigation.navigate(routes.ADD_TEAM_MEMBERS, {team: team})}>Invite
                    Members</Button>
                <VStack>
                    <HStack space={2} alignItems={"center"}>
                        <Pressable onPress={handleLogoUpdate}>
                            <Avatar
                                source={{uri: team.logo_file_path}}
                                key={team.id}
                                shadow={4}
                                size={"md"}
                            />
                        </Pressable>
                        <Heading size={"sm"}>{team.name}</Heading>
                        <Text>({team.users_count} members)</Text>
                    </HStack>
                    <FlatList
                        data={team.users}
                        horizontal={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                            <HStack
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                my={2}
                            >
                                <HStack space={2} alignItems={"center"}>
                                    <Icon as={MaterialCommunityIcons} name="medal" size={"lg"}/>
                                    <Avatar source={{uri: item.avatar}}/>
                                    <Text>{item.name}</Text>
                                </HStack>
                                <Text fontWeight={"bold"}>
                                    {item.points}
                                </Text>
                            </HStack>
                        )}
                    />
                </VStack>
            </VStack>
        </Box>
    );
};
