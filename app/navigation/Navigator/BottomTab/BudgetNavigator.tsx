import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BudgetScreen from "../../../screens/Budget";
import MontlyBudgetScreen from "../../../screens/MonthlyBudget";
import AddEmissionScreen from "../../../screens/AddEmission";
import Challenge from "../../../screens/Challenge/Challenge";
import Marketplace from "../../../screens/Marketplace/Marketplace";
import Coupons from "../../../screens/Coupons/Coupons";

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
    <Stack.Screen
      name="Marketplace"
      options={Marketplace.navigationOptions}
      component={Marketplace}
    />
    <Stack.Screen
    name="Coupons"
    options={Coupons.navigationOptions}
    component={Coupons}

    />
  </Stack.Navigator>
);

export default BudgetNavigator;
