import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function preview() {
  const params = useLocalSearchParams();
  const uri = Array.isArray(params.uri) ? params.uri[0] : params.uri;
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  const playAudio = async () => {
    if (uri) {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri });
        setSound(sound);
        await sound.playAsync();

        const status = await sound.getStatusAsync();
        setDuration(status.durationMillis / 1000);
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  const stopAudio = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        setSound(null);
      } catch (error) {
        console.error("Error stopping audio:", error);
      }
    }
  };

  const saveAudio = async () => {
    if (uri && duration) {
      const audioDetails = {
        uri,
        duration,
        dateSaved: new Date().toISOString(),
      };

      try {
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

