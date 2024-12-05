import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const DocumentListItem = ({ name }: { name: string }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="document-text" size={32} color="#9E9E9E" /> 
      </View>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginRight: 15,
    borderRadius: 8,
    padding: 8,
  },
  text: {
    fontSize: 22,
    color: "#333",
  },
});

export default DocumentListItem;
