import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AdminLeadershipScreen,
  CreateTeamScreen, InvitedTeamsScreen, ListUsersScreen, MemberTeamsScreen,
  OwnTeamsScreen,
  ShowTeamsScreen
} from "../screens";
import { MemberLeadershipScreen } from "../screens/MemberLeadershipScreen";
import {routes} from "../constants/routes";
import {AddTeamMembers} from "../screens/AddTeamMembers";

const TeamStack = createNativeStackNavigator();

export const TeamNavigator = () => {
  return (
    <TeamStack.Navigator screenOptions={{ headerShown: false }}>
      <TeamStack.Screen name="Show Teams" component={ShowTeamsScreen} />
      <TeamStack.Screen name="Owned Teams" component={OwnTeamsScreen} />
      <TeamStack.Screen name="Member Teams" component={MemberTeamsScreen} />
      <TeamStack.Screen name="Create Team" component={CreateTeamScreen} />
      <TeamStack.Screen name="Invited Teams" component={InvitedTeamsScreen} />
      <TeamStack.Screen name="Admin Leadership" component={AdminLeadershipScreen} />
      <TeamStack.Screen name="Member Leadership" component={MemberLeadershipScreen} />
      <TeamStack.Screen name={routes.ADD_TEAM_MEMBERS} component={AddTeamMembers} />
    </TeamStack.Navigator>
  );
};
