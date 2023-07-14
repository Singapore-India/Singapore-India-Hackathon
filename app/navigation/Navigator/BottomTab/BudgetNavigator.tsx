import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BudgetScreen from "../../../screens/Budget";
import MontlyBudgetScreen from "../../../screens/MonthlyBudget";
import AddEmissionScreen from "../../../screens/AddEmission";
import Challenge from "../../../screens/Challenge/Challenge";

const Stack = createStackNavigator();

const BudgetNavigator = (): React.ReactElement => (
  <Stack.Navigator>
    <Stack.Screen name="Budget" options={BudgetScreen.navigationOptions} component={BudgetScreen} />
    <Stack.Screen
      name="MonthlyBudget"
      options={MontlyBudgetScreen.navigationOptions}
      component={MontlyBudgetScreen}
    />
    <Stack.Screen
      name="AddEmission"
      options={AddEmissionScreen.navigationOptions}
      component={AddEmissionScreen}
    />
    <Stack.Screen
      name="Challenge"
      options={Challenge.navigationOptions}
      component={Challenge}
    />
  </Stack.Navigator>
);

export default BudgetNavigator;
