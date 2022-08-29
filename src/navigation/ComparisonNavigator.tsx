import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ComparisonHomeScreen, SelfComparisonScreen } from "../screens";

const CompareStack = createNativeStackNavigator();

export const ComparisonNavigator = () => {
  return (
    <CompareStack.Navigator>
      <CompareStack.Screen
        name="compare home"
        component={ComparisonHomeScreen}
        options={{title: 'Comparison'}}
      />
      <CompareStack.Screen
        name="self compare"
        component={SelfComparisonScreen}
        options={{title: 'Comparison with Self', headerTitleAlign: "center"}}
      />
    </CompareStack.Navigator>
  );
};
