import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import AudioList from "@/components/AudioList";
import DocumentList from "@/components/DocumentList";

const Index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.libraryContainer}>
        <Text style={styles.library}>Your Documents</Text>
      </View>

      <View style={styles.audioLibraryContainer}>
        <Text style={styles.audioLibrary}>Documents</Text>
        <Pressable style={styles.addButtoncontainer}>
          <Text style={styles.addButton}>+</Text>
        </Pressable>
      </View>

      <DocumentList/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:50,
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  libraryContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
  },
  library: {
    padding: 0,
    fontSize: 20,
  },
  audioLibraryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  audioLibrary: {
    fontSize: 32,
  },
  addButtoncontainer: {
    backgroundColor: "#00439C",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  addButton: {
    fontSize: 35,
    color: "white",
  },
});

export default Index;
