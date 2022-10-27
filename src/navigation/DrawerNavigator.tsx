import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import { CustomDrawer } from "../layouts";
import { ChallengeNavigator } from "./ChallengeNavigator";
import { HomeNavigator } from "./HomeNavigator";
import { TeamNavigator } from "./TeamNavigator";
import {routes} from "../constants/routes";
import {ActivityScreen} from "../screens";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const theme = useTheme();
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name={routes.HOME_NAVIGATOR}
        component={HomeNavigator}
        options={{
          headerTitle: "The Healthy Comparison",
          drawerActiveBackgroundColor: "#f97316",
          drawerActiveTintColor: "#fff7ed",
            title: "Home"
        }}
      />
        <Drawer.Screen name={routes.ACTIVITY} component={ActivityScreen}/>
      <Drawer.Screen
        name={routes.TEAM_NAVIGATOR}
        component={TeamNavigator}
        options={{
          drawerActiveBackgroundColor: "#f97316",
          drawerActiveTintColor: "#fff7ed",
            title: "Teams"
        }}
      />
      <Drawer.Screen
        name={routes.CHALLENGE_NAVIGATOR}
        component={ChallengeNavigator}
        options={{
          drawerActiveBackgroundColor: "#f97316",
          drawerActiveTintColor: "#fff7ed",
            title: "Challenges"
        }}
      />
    </Drawer.Navigator>
  );
};
