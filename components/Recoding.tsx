import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Audio } from "expo-av";
import AudioWave from "./AudioWave";
import { router } from "expo-router";

const Recoding = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  useEffect(() => {
    let activeRecording: Audio.Recording | null = null;

    const configureAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        console.log("Audio mode configured successfully");
      } catch (error) {
        console.error("Failed to configure audio mode:", error);
      }
    };

    const startRecording = async () => {
      if (recording) {
        console.log("A recording is already active.");
        return;
      }

      const { status } = await Audio.requestPermissionsAsync();
      if (status === "granted") {
        try {
          const { recording: newRecording } = await Audio.Recording.createAsync(
            Audio.RecordingOptionsPresets.HIGH_QUALITY
          );
          activeRecording = newRecording;
          setRecording(newRecording);
          await newRecording.startAsync();
          console.log("Recording started...");
        } catch (error) {
          console.error("Failed to start recording:", error);
        }
      } else {
        console.log("Permission to access microphone was denied");
      }
    };

    configureAudio().then(startRecording);

    return () => {
      if (activeRecording) {
        activeRecording.stopAndUnloadAsync().then(() => {
          console.log("Recording stopped during cleanup.");
        });
      }
    };
  }, []);

  const stopRecording = async () => {
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log("Recording URL:", uri); 
        setRecording(null);
        router.push({
            pathname: "/audio/preview",
            params: { uri },
        });
      } catch (error) {
        console.error("Failed to stop recording:", error);
      }
    } else {
      console.log("No recording to stop.");
    }
  };

  return (
    <View style={styles.container}>
      <AudioWave />
      <TouchableOpacity onPress={stopRecording}>
        <View style={styles.doneButton}>
          <FontAwesome5 name="stop" size={15} color="#F3CFC6" />
          <Text style={styles.doneText}>Done</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  doneButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#00008B",
    borderRadius: 30,
  },
  doneText: {
    fontSize: 18,
    color: "#f5f5dc",
    marginLeft: 10,
  },
});

export default Recoding;
