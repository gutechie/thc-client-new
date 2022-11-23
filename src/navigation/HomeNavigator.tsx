import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "../constants/routes";
import { HomeOtherScreen, HomeScreen } from "../screens";

const HomeStack = createNativeStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_left" }}
    >
      <HomeStack.Screen name={routes.HOME} component={HomeScreen} />
      <HomeStack.Screen name={routes.HOME_OTHERS} component={HomeOtherScreen} />
    </HomeStack.Navigator>
  );
};
