import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    ComparisonHomeScreen,
    ComparisonHomeScreenOthers,
    OtherComparisonScreen,
    SelfComparisonScreen
} from "../screens";
import {routes} from "../constants/routes";

const CompareStack = createNativeStackNavigator();

export const ComparisonNavigator = () => {
  return (
    <CompareStack.Navigator screenOptions={{animation: "none", headerBackVisible: false}}>
      <CompareStack.Screen
        name={routes.SELF_COMPARER_HOME}
        component={ComparisonHomeScreen}
        options={{title: 'Compare with self'}}
      />
        <CompareStack.Screen
            name={routes.OTHER_COMPARER_HOME}
            component={ComparisonHomeScreenOthers}
            options={{title: 'Compare with others'}}
        />
      <CompareStack.Screen
        name={routes.SELF_COMPARER}
        component={SelfComparisonScreen}
        options={{title: 'Comparison with Self', headerTitleAlign: "center"}}
      />
        <CompareStack.Screen
            name={routes.OTHER_COMPARER}
            component={OtherComparisonScreen}
            options={{title: 'Comparison with Other', headerTitleAlign: "center"}}
        />
    </CompareStack.Navigator>
  );
};
