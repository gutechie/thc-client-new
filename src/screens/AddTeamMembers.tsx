import {Avatar, Box, Button, FlatList, HStack, Image, Text, Toast} from "native-base";
import {useRoute} from "@react-navigation/native";
import {useAddMembersMutation, useListUsersQuery} from "../features/team/teamApi";
import {Loading} from "../shared/Loading";
import {useAppDispatch} from "../hooks";
import {api} from "../services/api";

export const AddTeamMembers = ({route, navigation}) => {
    const {team} = route.params

    const {data: users, isLoading: usersLoading, isError, error} = useListUsersQuery(null);

    const [addMembers, {isLoading: addingMembers}] = useAddMembersMutation();

    const dispatch = useAppDispatch();

    function addUserToTeam(id: string) {
        try {
           addMembers({teamId: team.id, data: [id]}).unwrap()
            Toast.show({description: "User Added to the Team."})
            dispatch(api.util.updateQueryData('listUsers', undefined, (users) => []))
        } catch (e) {
            console.log(e)
        }
    }

    if (addingMembers|| usersLoading) {
        return <Loading/>
    }

    return <Box p={4}>
        <FlatList data={users} keyExtractor={(item) => item.id} renderItem={({item: user}) => (
            <HStack bg={"white"} my={1} p={4} borderRadius={"md"} shadow={4} alignItems={"center"}
                    justifyContent={"space-between"}>
                <HStack alignItems={"center"} space={2}>
                    <Avatar source={{uri: user.avatar}}/>
                    <Text fontSize={"md"} fontWeight={"semibold"}>{user.name}</Text>
                </HStack>
                {
                 (user.teams.find(t => t.id != team.id)) || user.teams.length === 0 && <Button onPress={() => addUserToTeam(user.id)}>Add</Button>
                }
            </HStack>
        )}/>
    </Box>
}