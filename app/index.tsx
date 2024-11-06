import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex items-center justify-center flex-1">
      <Text className="text-3xl text-black text-center">Aora!</Text>
      <Link href={"/profile"}>Go to Profile</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
// 39.11
