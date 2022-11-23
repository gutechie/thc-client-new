import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "../constants/routes";
import { selectUser } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks";
import {
  AddProfileScreen,
  ComparisonHomeScreen,
  LinkDeviceScreen,
} from "../screens";
import { DeviceConnectedScreen } from "../screens/DeviceConnectedScreen";
import { TabNavigator } from "./TabNavigator";

const AppStack = createNativeStackNavigator();

export const AppNavigator = () => {
  const user = useAppSelector(selectUser);
  return (
    <AppStack.Navigator
      screenOptions={{ headerTitleAlign: "center", headerShadowVisible: false }}
    >
      {!user.profileCreated && (
        <AppStack.Screen
          name={routes.ADD_PROFILE}
          component={AddProfileScreen}
          options={{ headerShown: false }}
        />
      )}
      {!user.fitnessDeviceAttached && (
        <>
          <AppStack.Screen
            name={routes.LINK_DEVICE}
            component={LinkDeviceScreen}
          />
          <AppStack.Screen
            name={routes.DEVICE_CONNECTED}
            component={DeviceConnectedScreen}
          />
        </>
      )}
      <AppStack.Screen
        name={routes.TAB_NAVIGATOR}
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};
