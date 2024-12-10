import AudioList from "@/components/AudioList";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.audioLibraryContainer}>
        <Text style={styles.audioLibrary}>Audio Library</Text>
        <Pressable style={styles.addButtoncontainer}>
          <Text style={styles.addButton} onPress={()=>{router.push("/audio/record")}}>+</Text>
        </Pressable>
      </View>
    
      <AudioList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
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


