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
  VStack,
} from "native-base";
import { useAddMembersMutation } from "../features/team/teamApi";
import { Loading } from "../shared/Loading";
import { useGetAllUsersQuery } from "../features/user/userApi";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";

export const AddTeamMembers = ({ route, navigation }) => {
  const { team } = route.params;
  const [search, setSearch] = useState("");

  let queryParams = new URLSearchParams({
    "fields[users]": "id,name,email,avatar",
    include: "teams,teamsCount",
    "fields[teams]": "teams.id,teams.name",
    sort: "users.name",
  });
  if (search !== "") {
    queryParams.append("filter[search]", search);
  }
  const {
    data: response,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetAllUsersQuery(queryParams.toString());

  const [
    addMembers,
    {
      isLoading: addingMember,
      isError: isErrorAddingMember,
      error: addMemberError,
    },
  ] = useAddMembersMutation();

  const addUserToTeam = async (id: string) => {
    try {
      await addMembers({ teamId: team.id, data: { members: [id] } }).unwrap();
      refetch();
      Toast.show({ description: "User Added to the Team." });
    } catch (e) {
      console.log(e);
    }
  };

  if (isError || isErrorAddingMember) {
    console.log(error);
    console.log(addMemberError);
    Toast.show({ description: "Whoops! Something gone wrong!" });
  }

  const users: User[] = response?.data;

  const userBelongsToTeam = (user: User, team: Team) => {
    if (user.teams_count === 0) {
      return false;
    }

    const userTeams = user.teams;

    for (let i = 0; i < userTeams.length; i++) {
      if (userTeams[i].id == team.id) {
        return true;
      }
    }

    return false;
  };

  const isMember = (teams: Team[]) => {
    const foundTeam = teams.find((t) => t.id == team.id);
    return foundTeam.pivot.status === InvitationStatus.JOINED;
  };

  const setFilteredSearch = useCallback(
    debounce((text) => setSearch(text.toLowerCase())),
    []
  );

  return (
    <Box p={4}>
      <Input
        value={search}
        size={"lg"}
        rounded={"lg"}
        onChangeText={(text) => setFilteredSearch(text)}
        borderColor={"orange.50" + "0"}
        bgColor={"white"}
        rightElement={<SearchIcon size={5} mr={4} />}
        placeholder={"Search for a user by name or email"}
      />
      <Box mt={6} mb={2}>
        <Heading>
          {isFetching
            ? "Searching..."
            : search === ""
            ? "All Users"
            : "Search Results"}
        </Heading>
      </Box>
      <Box pb={48} mb={4}>
        {isFetching ? (
          <Loading />
        ) : users && users.length > 0 ? (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: user }: { item: User }) => (
              <HStack
                bg={"white"}
                my={1}
                p={4}
                borderRadius={"md"}
                shadow={4}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <HStack alignItems={"center"} space={2}>
                  <Avatar source={{ uri: user.avatar }} />
                  <VStack>
                    <Text fontSize={"sm"} fontWeight={"semibold"}>
                      {user.name}
                    </Text>
                    <Text fontSize={"xs"} color={"muted.600"}>
                      {user.email}
                    </Text>
                  </VStack>
                </HStack>
                {userBelongsToTeam(user, team) ? (
                  <Badge colorScheme={"orange"}>
                    Already {isMember(user.teams) ? "a Member" : "invited"}
                  </Badge>
                ) : (
                  <Button
                    size={"sm"}
                    onPress={() => addUserToTeam(user.id.toString())}
                  >
                    Add
                  </Button>
                )}
              </HStack>
            )}
          />
        ) : (
          <Text>No users found. Please adjust your search terms.</Text>
        )}
      </Box>
    </Box>
  );
};

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  teams_count: number;
  teams: Team[];
}

export interface Team {
  id: number;
  name: string;
  pivot: UserTeam;
}

export interface UserTeam {
  user_id: number;
  team_id: number;
  status: InvitationStatus;
}

export enum InvitationStatus {
  INVITED = "invited",
  JOINED = "joined",
  REMOVED = "removed",
}
