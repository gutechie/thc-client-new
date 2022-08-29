import { selectIsAuthenticated } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks";
import { AppNavigator } from "./AppNavigator";
import { AuthNavigator } from "./AuthNavigator";

import { Vikrant } from "../screens/Vikrant/Vikrant";
import { Comparewithmyself } from "../screens/Vikrant/Comparewithmyself";
import { ComparewithmyPeople } from "../screens/Vikrant/ComparewithmyPeople";
import { MemberLeadership } from "../screens/Vikrant/MemberLeadership";
import { AdminLeadership } from "../screens/Vikrant/AdminLeadership";
import { ConnectSuccessShield } from "../screens/Vikrant/ConnectSuccessShield";
import { ConnectSuccess } from "../screens/Vikrant/ConnectSuccess";

export const RootNavigator = () => {
  const authenticated = useAppSelector(selectIsAuthenticated);
  console.log(authenticated);
  return authenticated ? <AppNavigator /> : <AuthNavigator />;
  // return authenticated ? <AppNavigator /> : <ConnectSuccess />;
};
