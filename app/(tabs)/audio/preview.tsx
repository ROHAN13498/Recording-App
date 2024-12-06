import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Preview = () => {
  const params = useLocalSearchParams();
  const uri = Array.isArray(params.uri) ? params.uri[0] : params.uri; // Ensure `uri` is a string
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [duration, setDuration] = useState<number | null>(null); // To store the duration of the audio

  // Function to play audio
  const playAudio = async () => {
    if (uri) {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri });
        setSound(sound);
        await sound.playAsync();
        console.log("Playing audio...");

        // Get the audio duration
        const status = await sound.getStatusAsync();
        setDuration(status.durationMillis / 1000); // Convert from milliseconds to seconds
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  // Function to stop audio
  const stopAudio = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        setSound(null);
        console.log("Audio stopped.");
      } catch (error) {
        console.error("Error stopping audio:", error);
      }
    }
  };

  // Function to save audio details in AsyncStorage
  const saveAudio = async () => {
    if (uri && duration) {
      const audioDetails = {
        uri,
        duration,
        dateSaved: new Date().toISOString(),
      };

      try {
        // Store audio details in AsyncStorage
        const savedAudios = await AsyncStorage.getItem("savedAudios");
        const audios = savedAudios ? JSON.parse(savedAudios) : [];
        audios.push(audioDetails);

        await AsyncStorage.setItem("savedAudios", JSON.stringify(audios));
        console.log("Audio saved to AsyncStorage:", audioDetails);
      } catch (error) {
        console.error("Error saving audio to AsyncStorage:", error);
      }
    }
  };

  // Cleanup the sound when the component unmounts
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Preview</Text>
      {uri ? (
        <View>
          <Text style={styles.text}>Audio File URI: {uri}</Text>
          {duration && <Text style={styles.text}>Duration: {duration} seconds</Text>}
          <Button title="Play Audio" onPress={playAudio} />
          <Button title="Stop Audio" onPress={stopAudio} />
          <Button title="Save Audio" onPress={saveAudio} />
        </View>
      ) : (
        <Text style={styles.text}>No audio file found.</Text>
      )}
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
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default Preview;
