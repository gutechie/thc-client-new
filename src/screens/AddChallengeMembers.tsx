import {
    Avatar,
    Badge,
    Box,
    Button,
    FlatList,
    Heading,
    HStack,
    Input,
    SearchIcon,
    Text,
    Toast,
    VStack
} from "native-base";
import {useAddMembersMutation} from "../features/team/teamApi";
import {Loading} from "../shared/Loading";
import {useGetAllUsersQuery} from "../features/user/userApi";
import {useCallback, useState} from "react";
import debounce from 'lodash.debounce';
import {useAddMembersToChallengeMutation} from "../features/challenge/challengeApi";
import {InvitationStatus} from "./AddTeamMembers";

export const AddChallengeMembers = ({route, navigation}) => {
    const {challenge} = route.params
    const [search, setSearch] = useState("");

    let queryParams = new URLSearchParams({
        "fields[users]": 'id,name,email,avatar',
        "include": "challenges,challengesCount",
        "fields[teams]": "challenges.id,challenges.title",
        "sort": "users.name"
    });
    if (search !== "") {
        queryParams.append("filter[search]", search)
    }
    const {
        data: response,
        isError,
        error,
        refetch,
        isFetching
    } = useGetAllUsersQuery(queryParams.toString());

    const [addMembersToChallenge, {
        isLoading: addingMember,
        isError: isErrorAddingMember,
        error: addMemberError
    }] = useAddMembersToChallengeMutation();

    const addUserToChallenge = async (id: string) => {
        try {
            await addMembersToChallenge({challengeId: challenge.id, data: {members: [id]}}).unwrap()
            refetch()
            Toast.show({description: "User Added to the Challenge."})
        } catch (e) {
            console.log(e)
        }
    }

    if (isError || isErrorAddingMember) {
        console.log(error);
        console.log(addMemberError)
        Toast.show({description: "Whoops! Something gone wrong!"})
    }

    const users: User[] = response?.data;

    const userBelongsToChallenge = (user: User, challenge: Challenge) => {
        if (user.challenges_count === 0) {
            return false
        }

        const userChallenge = user.challenges;

        for (let i = 0; i < userChallenge.length; i++) {
            if (userChallenge[i].id == challenge.id) {
                return true
            }
        }

        return false;
    }

    const isMember = (teams: Challenge[]) => {
        const foundChallenge = teams.find(t => t.id == challenge.id)
        return foundChallenge.pivot.status === InvitationStatus.JOINED;
    }

    const setFilteredSearch = useCallback(debounce((text) => setSearch(text.toLowerCase())), [])

    return <Box p={4}>
        <Input value={search} size={"lg"} rounded={"lg"} onChangeText={text => setFilteredSearch(text)}
               borderColor={"orange.50" +
                   "0"} bgColor={"white"}
               rightElement={<SearchIcon size={5} mr={4}/>}
               placeholder={"Search for a user by name or email"}/>
        <Box mt={6} mb={2}>
            <Heading>{isFetching ? 'Searching...' : (search === "" ? "All Users" : "Search Results")}</Heading>
        </Box>
        <Box pb={48} mb={4}>
            {
                isFetching ? <Loading/> : (users && users.length > 0 ?
                    <FlatList data={users} keyExtractor={(item) => item.id.toString()}
                              renderItem={({item: user}: { item: User }) => (
                                  <HStack bg={"white"} my={1} p={4}
                                          borderRadius={"md"}
                                          shadow={4} alignItems={"center"}
                                          justifyContent={"space-between"}>
                                      <HStack alignItems={"center"} space={2}>
                                          <Avatar source={{uri: user.avatar}}/>
                                          <VStack>
                                              <Text fontSize={"sm"} fontWeight={"semibold"}>{user.name}</Text>
                                              <Text fontSize={"xs"} color={"muted.600"}>{user.email}</Text>
                                          </VStack>
                                      </HStack>
                                      {
                                          userBelongsToChallenge(user, challenge) ?
                                              <Badge
                                                  colorScheme={"orange"}>Already {isMember(user.challenges) ? 'a Member' : 'invited'}</Badge> :
                                              <Button size={"sm"}
                                                      onPress={() => addUserToChallenge(user.id.toString())}>Add</Button>
                                      }
                                  </HStack>
                              )}/> : <Text>No users found. Please adjust your search terms.</Text>)}
        </Box>
    </Box>
}


export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    challenges_count: number;
    challenges: Challenge[];
}

export interface Challenge {
    id: number;
    title: string;
    pivot: UserChallenge;
}

export interface UserChallenge {
    user_id: number;
    challenge_id: number;
    status: InvitationStatus
}