import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import { ProfileScreen, UploadScreen } from "../screens";
import { ComparisonNavigator } from "./ComparisonNavigator";
import { DrawerNavigator } from "./DrawerNavigator";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: (focused) =>
            focused ? (
              <Icon as={MaterialIcons} name="home-filled" size={"lg"} />
            ) : (
              <Icon as={Octicons} name="home" size={"lg"} />
            ),
        }}
      />
      <Tab.Screen
        name="Comparison"
        component={ComparisonNavigator}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: (focused) =>
            focused ? (
              <Icon
                as={MaterialCommunityIcons}
                name="scale-unbalanced"
                size={"lg"}
              />
            ) : (
              <Icon as={Octicons} name="home" size={"lg"} />
            ),
        }}
      />
      <Tab.Screen
        name="Uploader"
        component={UploadScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: (focused) =>
            focused ? (
              <Icon as={FontAwesome} name="cloud-upload" size={"lg"} />
            ) : (
              <Icon as={Octicons} name="home" size={"lg"} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: (focused) =>
            focused ? (
              <Icon as={FontAwesome} name="user-circle" size={"lg"} />
            ) : (
              <Icon as={Octicons} name="home" size={"lg"} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
