import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AddChallengeMembers,
  AdminLeadershipChallengeScreen,
  CreateChallengeScreen,
  InvitedChallengesScreen,
  MemberChallengesScreen,
  MemberLeadershipChallengeScreen,
  OwnChallengesScreen,
  ShowChallengesScreen,
} from "../screens";
import { routes } from "../constants/routes";

export const ChallengeNavigator = () => {
  const ChallengeStack = createNativeStackNavigator();
  return (
    <ChallengeStack.Navigator screenOptions={{ headerShown: false }}>
      <ChallengeStack.Screen
        name="Show Challenges"
        component={ShowChallengesScreen}
      />
      <ChallengeStack.Screen
        name="Owned Challenges"
        component={OwnChallengesScreen}
      />
      <ChallengeStack.Screen
        name="Member Challenges"
        component={MemberChallengesScreen}
      />
      <ChallengeStack.Screen
        name="Invited Challenges"
        component={InvitedChallengesScreen}
      />
      <ChallengeStack.Screen
        name="Create Challenge"
        component={CreateChallengeScreen}
      />
      <ChallengeStack.Screen
        name="Member Challenge Leadership"
        component={MemberLeadershipChallengeScreen}
      />
      <ChallengeStack.Screen
        name={routes.ADD_CHALLENGE_USER}
        component={AddChallengeMembers}
      />
      <ChallengeStack.Screen
        name="Admin Challenge Leadership"
        component={AdminLeadershipChallengeScreen}
      />
    </ChallengeStack.Navigator>
  );
};
