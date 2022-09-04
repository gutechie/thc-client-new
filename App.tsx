import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic
} from "@expo-google-fonts/poppins";
import { useReduxDevToolsExtension } from "@react-navigation/devtools";
import {
  NavigationContainer,
  useNavigationContainerRef
} from "@react-navigation/native";
import * as Font from "expo-font";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { NativeBaseProvider } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { theme } from "./src/assets/theme";
import { RootNavigator } from "./src/navigation";
import { store } from "./src/store";

const prefix = Linking.createURL("/");

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const navigationRef = useNavigationContainerRef();
  useReduxDevToolsExtension(navigationRef);

  let persistor = persistStore(store);

  const linking = {
    prefixes: [prefix, "https://thehealthycomparison.com"],
    config: {
      screens: {
        "Link Device": "link/:code",
      },
    },
  };

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Poppins_100Thin,
          Poppins_100Thin_Italic,
          Poppins_200ExtraLight,
          Poppins_200ExtraLight_Italic,
          Poppins_300Light,
          Poppins_300Light_Italic,
          Poppins_400Regular,
          Poppins_400Regular_Italic,
          Poppins_500Medium,
          Poppins_500Medium_Italic,
          Poppins_600SemiBold,
          Poppins_600SemiBold_Italic,
          Poppins_700Bold,
          Poppins_700Bold_Italic,
          Poppins_800ExtraBold,
          Poppins_800ExtraBold_Italic,
          Poppins_900Black,
          Poppins_900Black_Italic,
        });
      } catch (e) {
        console.warn(e);
      } finally {
          setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <NativeBaseProvider theme={theme}>
            <NavigationContainer linking={linking}>
              <RootNavigator />
            </NavigationContainer>
          </NativeBaseProvider>
        </View>
      </PersistGate>
    </Provider>
  );
}
