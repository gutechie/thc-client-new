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
import { useNavigation } from "@react-navigation/native";
import { routes } from "../constants/routes";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Drawer"
        component={DrawerNavigator}
        listeners={{
          tabPress: (e) => {
            navigation.navigate(routes.HOME_NAVIGATOR, { screen: routes.HOME });
          },
        }}
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
        name={routes.COMPARISON_NAVIGATOR}
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
      {/* <Tab.Screen
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
      /> */}
      <Tab.Screen
        name={routes.PROFILE_EDIT}
        component={ProfileScreen}
        options={{
          headerTitle: "My Personal Details",
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
