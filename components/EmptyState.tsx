import React from "react";
import { View, Text, StyleSheet } from "react-native";



const EmptyState = ({ name }:{name:string}) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No {name} found </Text>
      <Text style={styles.emptySubText}>Click on + to add {name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 8,
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#0D47A1", 
    fontWeight: "bold",
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 14,
    color: "#1565C0", 
    marginTop: 8,
    textAlign: "center",
  },
});

export default EmptyState;
