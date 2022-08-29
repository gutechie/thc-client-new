import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import { CustomDrawer } from "../layouts";
import { ChallengeNavigator } from "./ChallengeNavigator";
import { HomeNavigator } from "./HomeNavigator";
import { TeamNavigator } from "./TeamNavigator";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const theme = useTheme();
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name={"Main"}
        component={HomeNavigator}
        options={{
          headerTitle: "The Healthy Comparison",
          drawerActiveBackgroundColor: "#f97316",
          drawerActiveTintColor: "#fff7ed",
        }}
      />
      <Drawer.Screen
        name={"Teams"}
        component={TeamNavigator}
        options={{
          drawerActiveBackgroundColor: "#f97316",
          drawerActiveTintColor: "#fff7ed",
        }}
      />
      <Drawer.Screen
        name={"Challenges"}
        component={ChallengeNavigator}
        options={{
          drawerActiveBackgroundColor: "#f97316",
          drawerActiveTintColor: "#fff7ed",
        }}
      />
    </Drawer.Navigator>
  );
};
