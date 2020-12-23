/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';

import Tts from 'react-native-tts';
import VoiceEditorScreen from './src/screens/VoiceEditorScreen';
import {DARK_BLUE, WHITE} from './src/styles/Colors';
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import VoicesListScreen from "./src/screens/VoicesListScreen";

const Stack = createStackNavigator();

declare const global: {HermesInternal: null | {}};

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: DARK_BLUE
    },
};

export const SCREENS = {
    VoiceEditorScreen: "VoiceEditorScreen",
    VoicesListScreen: "VoicesListScreen"
}

const App = () => {
  useEffect(() => {
    // Tts.setDefaultLanguage('ro-RO');
  }, []);
  return (
      <NavigationContainer theme={MyTheme}>
        <StatusBar barStyle="light-content" />
          <SafeAreaView style={{ flex: 0, backgroundColor: DARK_BLUE }} />
          <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name={SCREENS.VoiceEditorScreen}
                    component={VoiceEditorScreen}
                />
                <Stack.Screen
                    name={SCREENS.VoicesListScreen}
                    component={VoicesListScreen}
                />
            </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: DARK_BLUE,
  },
});

export default App;
