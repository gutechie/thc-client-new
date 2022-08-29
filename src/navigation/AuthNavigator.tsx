import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "../constants/routes";
import {
  ForgotPasswordScreen,
  LoginWithOtpScreen,
  LoginWithPasswordScreen,
  RegisterScreen,
} from "../screens";

const AuthStack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerTitle: "" }}
      initialRouteName={routes.PASSWORD_LOGIN}
    >
      <AuthStack.Screen
        name={routes.OTP_LOGIN}
        component={LoginWithOtpScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name={routes.PASSWORD_LOGIN}
        component={LoginWithPasswordScreen}
      />
      <AuthStack.Screen name={routes.REGISTER} component={RegisterScreen} />
      <AuthStack.Screen
        name={routes.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
      />
    </AuthStack.Navigator>
  );
};
