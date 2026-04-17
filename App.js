import { useState, useEffect } from "react";
import * as Font from "expo-font";
import AppNavigator from "./src/navigation/AppNavigator";
import "./global.css";
import 'react-native-gesture-handler';

import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        InterRegular: require("./assets/fonts/Inter-UI-Regular.otf"),
        InterBold: require("./assets/fonts/Inter-UI-Bold.otf"),
        InterBlack: require("./assets/fonts/Inter-UI-Black.otf"),
        InterMedium: require("./assets/fonts/Inter-UI-Medium.otf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // blank screen while fonts load
  }
  return (
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  )
}
