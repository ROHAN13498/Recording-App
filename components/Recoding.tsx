import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import AudioWave from "./AudioWave";
import { router } from "expo-router";

const Recording = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);

  const requestPermissions = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      setPermissionStatus(status);

      if (status !== "granted") {
        Alert.alert(
          "Permissions Required",
          "We need microphone permissions to record audio.",
          [{ text: "OK" }]
        );
        return false;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });

      return true;
    } catch (error) {
      console.error("Permission request failed:", error);
      Alert.alert("Error", "Could not request audio permissions");
      return false;
    }
  };

  const startRecording = async () => {
    if (recording) {
      console.log("Recording already in progress");
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await newRecording.startAsync();

      setRecording(newRecording);
      console.log("Recording started");
    } catch (error) {
      console.error("Failed to start recording:", error);
      Alert.alert("Recording Error", "Could not start audio recording");
    }
  };

  const stopRecording = async () => {
    if (!recording) {
      console.log("No active recording");
      return;
    }

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (uri) {
        const fileName = uri.split("/").pop(); 
        const documentDirectory = FileSystem.documentDirectory;
      if (!documentDirectory) {
        console.error("FileSystem.documentDirectory is null");
        Alert.alert("Storage Error", "Unable to access device storage");
        return;
      }
        const newUri = documentDirectory + fileName; 

        await FileSystem.moveAsync({
          from: uri,
          to: newUri,
        });

        console.log("File saved to:", newUri);

        router.push({
          pathname: "/audio/preview",
          params: { url: newUri ,showSaveButton:"true"},
        });
      }
    } catch (error) {
      console.error("Failed to stop recording:", error);
      Alert.alert("Recording Error", "Could not stop or save audio recording");
    }
  };

  // Automatically start recording when component mounts
  useEffect(() => {
    startRecording();

    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

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

export default Recording;
