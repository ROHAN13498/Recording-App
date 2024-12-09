import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import AudioListItem from "./AudioListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AudioItem {
  uri: string;
  duration: string;
  name: string;
}

const AudioList = () => {
  const [audioData, setAudioData] = useState<AudioItem[]>([]);

  const loadAudioData = async () => {
    try {
      const savedAudios = await AsyncStorage.getItem("savedAudios");
     
      if (savedAudios) {
        const parsedAudios: AudioItem[] = JSON.parse(savedAudios);
        setAudioData(parsedAudios);
      } else {
        setAudioData([]);
      }
    } catch (error) {
      console.error("Error loading audio data from AsyncStorage:", error);
      setAudioData([]); 
    }
  };

  useEffect(() => {
    loadAudioData(); 
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
              uri={item.uri} 
              duration={item.duration}
              name={item.name} 
            />
          )}
          keyExtractor={(item, index) => index.toString()}
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
