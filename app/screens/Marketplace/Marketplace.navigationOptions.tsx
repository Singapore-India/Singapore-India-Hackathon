import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";

import { Text } from "components";
import { t } from "utils";
import { Layout, ComponentsStyle } from "style";

const navigationOptions = (): StackNavigationOptions => ({
  headerStyle: {
    ...ComponentsStyle.header,
  },
  headerBackTitle: null,
  headerTitle: () => <Text.H1 style={Layout.androidNavTitle}>Redeem Coupons</Text.H1>,
});

export default navigationOptions;
