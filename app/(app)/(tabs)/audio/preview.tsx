import SaveButton from "@/components/SaveButton";
import { supabase } from "@/utils/supabase";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio, AVPlaybackStatus } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Preview() {
  const params = useLocalSearchParams();
  const url = Array.isArray(params.url) ? params.url[0] : params.url;
  const showSaveButton = params.showSaveButton === "true" ? true : false;
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const loadAudio = async () => {
      if (url) {
        try {
          if (sound) {
            await sound.unloadAsync();
          }

          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri:url },
            { shouldPlay: false }
          );

          setSound(newSound);

          const status = (await newSound.getStatusAsync()) as AVPlaybackStatus;
          if (status.isLoaded && status.durationMillis) {
            setDuration(status.durationMillis / 1000);

            newSound.setOnPlaybackStatusUpdate(
              (playbackStatus: AVPlaybackStatus) => {
                if (playbackStatus.isLoaded) {
                  setPosition(playbackStatus.positionMillis / 1000);
                  if (playbackStatus.didJustFinish) {
                    setIsPlaying(false);
                  }
                }
              }
            );
          }
        } catch (error) {
          console.error("Error loading audio:", error);
        }
      }
    };

    if (url) {
      loadAudio();
    }

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [url]);

  const playPauseAudio = async () => {
    if (sound) {
      try {
        const status = (await sound.getStatusAsync()) as AVPlaybackStatus;
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          if (
            status.isLoaded &&
            status.positionMillis >= (status.durationMillis || 0)
          ) {
            await sound.setPositionAsync(0);
          }
          await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error("Error playing/pausing audio:", error);
      }
    }
  };

  const saveAudio = async () => {
    try {
      if (!url) {
        throw new Error("No audio url found.");
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch audio file from url.");
      }

      const arrayBuffer = await response.arrayBuffer();

      const fileName = `Audios/audio_${Date.now()}.mp3`;

      const { data } = await supabase.storage
        .from("App")
        .upload(fileName, arrayBuffer, {
          contentType: "audio/mpeg",
        });
      console.log("Audio uploaded successfully:", data);
      Alert.alert("Success", "Audio saved successfully.");
    } catch (error) {
      console.error("Error uploading audio:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      router.replace("/audio");
    }
  };

  const handleSeek = async (value: number) => {
    if (sound) {
      try {
        const seekPosition = value * (duration * 1000);
        await sound.setPositionAsync(seekPosition);
        setPosition(value * duration);
      } catch (error) {
        console.error("Error seeking audio:", error);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      {url ? (
        <>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={position / duration || 0}
            onSlidingComplete={handleSeek}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#D3D3D3"
            thumbTintColor="#1EB1FC"
          />
          <Text style={styles.timeText}>
            {formatTime(position)} / {formatTime(duration)}
          </Text>
          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={playPauseAudio}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={40}
              color="#FFFFFF"
            />
          </TouchableOpacity>
          {showSaveButton && <SaveButton onPress={saveAudio} />}
        </>
      ) : (
        <Text style={styles.text}>No audio file found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  slider: {
    width: 300,
    height: 40,
    marginVertical: 20,
  },
  timeText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#333333",
  },
  playPauseButton: {
    backgroundColor: "#1EB1FC",
    borderRadius: 50,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    color: "#333333",
  },
});
