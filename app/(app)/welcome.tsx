import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Eksaq</Text>
      <Pressable onPress={() => router.push("/audio")}>
        <AntDesign name="arrowright" size={24} color="black" />
      </Pressable>
    </View>
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
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Index;
