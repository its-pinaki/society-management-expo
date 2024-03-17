import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
// importing screens here
import Onboarding from "../../libs/bcare-account-component/organisms/Onboarding/Onboarding";
import Login from "../../libs/bcare-account-component/organisms/Login/Login";
import Signup from "../../libs/bcare-account-component/organisms/Signup/Signup";
import Otp from "../../libs/bcare-account-component/organisms/Otp/Otp";

const Stack = createNativeStackNavigator();

const RouterHub = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouterHub;
