import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Record = () => {
  return (
    <View style={styles.container}>
      <View style={styles.outerCircle}>
        <View style={styles.innerCircle}>
          <FontAwesome5 name="microphone" size={24} color="black" />
        </View>
      </View>
      <Text style={styles.text}>
        Click on the Recording Button to Start Recording
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 20,
  },
  outerCircle: {
    width: 80,
    height: 80,
    backgroundColor: "#A8E6CF",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  innerCircle: {
    width: 60,
    height: 60,
    backgroundColor: "#7BDEB3",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize:20
  },
});

export default Record;
