import {MaterialCommunityIcons} from "@expo/vector-icons";
import {
    Avatar,
    Box,
    Button,
    FlatList,
    Heading,
    HStack,
    Icon,
    Text,
    VStack
} from "native-base";
import {ActivityIndicator} from "react-native";
import {images} from "../constants/images";
import {useGetTeamQuery} from "../features/team/teamApi";
import {routes} from "../constants/routes";

export const AdminLeadershipScreen = ({route, navigation}) => {
    const {id} = route.params;
    const {data, isLoading, isError, error} = useGetTeamQuery({id});

    if (isLoading) {
        return (
            <Box flex={1}>
                <ActivityIndicator/>
            </Box>
        );
    }
    if (isError) {
        return <Box>{error.error}</Box>;
    }

    const team = data.team;

    return (
        <Box px={8} py={4}>
            <VStack space={8}>
                <Button colorScheme={"orange"}
                        onPress={() => navigation.navigate(routes.ADD_TEAM_MEMBERS, {team: team})}>Invite
                    Members</Button>
                <VStack>
                    <HStack space={2}>
                        <Heading size={"xs"}>{team.name}</Heading>
                        <Text>({team.users_count} people)</Text>
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
                                    <Avatar source={images.AVATAR}/>
                                    <Text>{item.name}</Text>
                                </HStack>
                                <Text fontWeight={"bold"}>
                                    {(Math.random() * 100).toFixed(2)}
                                </Text>
                            </HStack>
                        )}
                    />
                </VStack>
            </VStack>
        </Box>
    );
};
