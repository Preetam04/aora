import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  // 1.29
  return (
    <>
      <Stack screenOptions={{}}>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />

        <StatusBar backgroundColor="#161622" style="light" />
      </Stack>
    </>
  );
};

export default AuthLayout;
// 1.29
