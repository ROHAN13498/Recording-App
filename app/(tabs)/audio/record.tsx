import Recoding from "@/components/Recoding";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function record() {
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <View style={styles.container}>
      {!isRecording ? (
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleToggleRecording}
        >
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <FontAwesome5 name="microphone" size={24} color="black" />
            </View>
          </View>
          <Text style={styles.text}>Press the button to start recording</Text>
        </TouchableOpacity>
      ) : (
        <Recoding/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  outerCircle: {
    width: 80,
    height: 80,
    backgroundColor: "#A8E6CF",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 60,
    height: 60,
    backgroundColor: "#7BDEB3",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    color: "black", 
  },
  
});


