import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Audio, AVPlaybackStatus } from "expo-av";
import Slider from "@react-native-community/slider";

export default function Preview() {
  const params = useLocalSearchParams();
  const uri = Array.isArray(params.uri) ? params.uri[0] : params.uri;

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const loadAudio = async () => {
      if (uri) {
        try {
          // Unload any existing sound first
          if (sound) {
            await sound.unloadAsync();
          }

          // Create and load the new sound
          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri },
            { shouldPlay: false }
          );

          setSound(newSound);

          // Get the duration of the audio
          const status = await newSound.getStatusAsync() as AVPlaybackStatus;
          if (status.isLoaded && status.durationMillis) {
            setDuration(status.durationMillis / 1000);

            // Set up playback status update listener
            newSound.setOnPlaybackStatusUpdate((playbackStatus: AVPlaybackStatus) => {
              if (playbackStatus.isLoaded) {
                // Correctly access positionMillis
                setPosition(playbackStatus.positionMillis / 1000);

                // Automatically pause when playback is finished
                if (playbackStatus.didJustFinish) {
                  setIsPlaying(false);
                }
              }
            });
          }
        } catch (error) {
          console.error("Error loading audio:", error);
        }
      }
    };

    if (uri) {
      loadAudio();
    }

    // Cleanup function
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [uri]);

  const playPauseAudio = async () => {
    if (sound) {
      try {
        const status = await sound.getStatusAsync() as AVPlaybackStatus;
        
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          // If at the end of the track, reset to beginning
          if (status.isLoaded && status.positionMillis >= (status.durationMillis || 0)) {
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

  const handleSeek = async (value: number) => {
    if (sound) {
      try {
        // Convert slider value (0-1) to milliseconds
        const seekPosition = value * (duration * 1000);
        await sound.setPositionAsync(seekPosition);
        setPosition(value * duration);
      } catch (error) {
        console.error("Error seeking audio:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Preview</Text>
      
      {uri ? (
        <>
          <Text style={styles.text}>Audio File URI: {uri}</Text>
          <Text style={styles.text}>
            Duration: {duration.toFixed(2)} seconds
          </Text>
          
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={position / duration}
            onSlidingComplete={handleSeek}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#CCCCCC"
          />
          
          <Text style={styles.text}>
            {position.toFixed(2)} / {duration.toFixed(2)} seconds
          </Text>
          
          <TouchableOpacity 
            style={styles.playPauseButton} 
            onPress={playPauseAudio}
          >
            <Text style={styles.buttonText}>
              {isPlaying ? "Pause" : "Play"}
            </Text>
          </TouchableOpacity>
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
  slider: {
    width: 300,
    height: 40,
    marginVertical: 20,
  },
  playPauseButton: {
    backgroundColor: '#1EB1FC',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});