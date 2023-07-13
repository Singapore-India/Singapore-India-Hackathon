import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import { NavigationContainer } from '@react-navigation/native';

const RootStack = createStackNavigator();
// const screenOptions = {
//     headerShown: false,
//     ...ComponentsStyle.transitionBetweenScreenPresets,
//   };


const RootStackScreen = () => (
    <NavigationContainer>
    <RootStack.Navigator >
        <RootStack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
         <RootStack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/> 
    </RootStack.Navigator>
    </NavigationContainer>

);

export default RootStackScreen;