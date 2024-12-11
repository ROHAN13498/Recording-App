import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Toast from 'react-native-toast-message';

const Index = () => {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.title}>Welcome to Eksaq</Text>
      <Text onPress={() => router.push("/audio")}>
        <AntDesign name="arrowright" size={24} color="black" />
      </Text>
     
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Index;
