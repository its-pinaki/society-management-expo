import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RouterHub from "./src/apps/RouterHub/RouterHub";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <RouterHub/>
  );
}

export default App;
