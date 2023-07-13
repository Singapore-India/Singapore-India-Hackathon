import React, { useEffect, useState } from "react";
import { View ,ActivityIndicator} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { GlobalizeProvider } from "react-native-globalize";
import { locale as localeExpo } from "expo-localization";
import { includes } from "ramda";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// eslint-disable-next-line import/no-named-as-default
import Constants from "expo-constants";
import * as Sentry from "sentry-expo";
import { Provider } from "react-redux";
import { enableScreens } from "react-native-screens";

import { LocalizationContext } from "utils";
import StoreReviewChecker from "components/StoreReviewChecker";

import { loadGlobalize } from "./i18";
import AppNavigator from "./app/navigation/Navigator/AppNavigator";
import store from "./app/redux/store";
import { AuthContext } from "./components/context";
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import RootStackScreen from './screens/RootStackScreen';


const supportedLanguages: string[] = [
  "en",
  "fr",
  "de",
  "sv",
  "da",
  "ru",
  "pt",
  "pl",
  "zh",
  "ms",
  "es",
  "it",
];
const defaultLanguage = "en";
const defaultLocale = "en-us";

loadGlobalize();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const release = Constants.manifest.revisionId || "0.0.0";

if (!__DEV__) {
  /* TODO: change secret.dsn to Constants.manifest.extra.sentryPublicDsn */
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enableInExpoDevelopment: false,
    debug: true,
    release,
  });
}

const Drawer = createDrawerNavigator();


const App: React.FC = () => {
  enableScreens();

  let lang = localeExpo.substring(0, 2);

  if (!includes(lang, supportedLanguages)) {
    lang = defaultLanguage;
  }

  const [ready, setReady] = useState(false);
  const [language, setLanguage] = useState(lang);

  const [locale, setLocale] = useState(localeExpo);

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null); 

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      setUserToken('fgkj');
      setIsLoading(false);
      // const userToken = String(foundUser[0].userToken);
      // const userName = foundUser[0].username;
      
      try {
        // await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      // dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      setUserToken(null);
      setIsLoading(false);
      try {
        // await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      setUserToken('fgkj');
      setIsLoading(false);
    },
    // toggleTheme: () => {
    //   setIsDarkTheme( isDarkTheme => !isDarkTheme );
    // }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      setIsLoading(false);
      // let userToken;
      // userToken = null;
      try {
        // userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      // dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);



  useEffect(() => {
    Promise.all([
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialCommunityIcons.font,
        "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
        "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
        "Inter-Light-BETA": require("./assets/fonts/Inter-Light-BETA.ttf"),
        "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
      }),
    ])
      .then(() => {
        setReady(true);
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Sentry.captureException(error);
      });
  }, []);




  let body = <View />;

  // if( isLoading ) {
  //   return(
  //     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  //       <ActivityIndicator size="large"/>
  //     </View>
  //   );
  // }
 

  if (ready) {
    if(userToken === null){
      body= <RootStackScreen />
    }
    else{
    body = (
      <Provider store={store}>
        <GlobalizeProvider locale={language || defaultLanguage}>
          <LocalizationContext.Provider
            value={{
              locale: locale || defaultLocale,
              setLocale: setLocale,
              language: language || defaultLanguage,
              setLanguage: setLanguage,
            }}
          >
            {__DEV__ ? (
              <AppNavigator />
            ) : (
              <StoreReviewChecker>
                <AppNavigator />
              </StoreReviewChecker>
            )}
          </LocalizationContext.Provider>
        </GlobalizeProvider>
      </Provider>
    );
            }
  }

  return (
    <PaperProvider >
    <AuthContext.Provider value={authContext}>
      {/* <NavigationContainer > */}
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {/* { userToken !== null ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
        </Drawer.Navigator>
      )
    :
      <RootStackScreen />
    } */}
    {body}
       
        

        {/* { userToken === null && body} */}

   
    </SafeAreaProvider>
    {/* </NavigationContainer> */}
    </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
