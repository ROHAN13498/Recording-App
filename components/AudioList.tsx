import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import AudioListItem from "./AudioListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the type for the audio data
interface AudioItem {
  uri: string;
  duration: string;
  size: number;
}

const AudioList = () => {
  const [audioData, setAudioData] = useState<AudioItem[]>([]);

  // Function to load audio data from AsyncStorage
  const loadAudioData = async () => {
    try {
      const savedAudios = await AsyncStorage.getItem("savedAudios");
      if (savedAudios) {
        const parsedAudios: AudioItem[] = JSON.parse(savedAudios);
        setAudioData(parsedAudios);
      } else {
        setAudioData([]); // If no data is found, set an empty array
      }
    } catch (error) {
      console.error("Error loading audio data from AsyncStorage:", error);
      setAudioData([]); // Reset in case of error
    }
  };

  useEffect(() => {
    loadAudioData(); // Load audio data when the component mounts
  }, []);

  return (
    <View style={styles.container}>
      {audioData.length === 0 ? (
        <Text>No audio items available</Text>
      ) : (
        <FlatList
          data={audioData}
          renderItem={({ item }) => (
            <AudioListItem
              uri={item.uri} // Show URI or a more readable name, as you prefer
              duration={item.duration}
              size={item.size} // If you store the file size, else adjust accordingly
            />
          )}
          keyExtractor={(item, index) => index.toString()} // Use index as the key
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default AudioList;
