import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text, TextInput } from "react-native";
import AudioListItem from "./AudioListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDebounce } from "@/hooks/useDebounce";

interface AudioItem {
  uri: string;
  duration: string;
  name: string;
}

const AudioList = () => {
  const [audioData, setAudioData] = useState<AudioItem[]>([]);
  const [filteredData, setFilteredData] = useState<AudioItem[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const debouncedValue = useDebounce(searchInput); 

  const loadAudioData = async () => {
    try {
      const savedAudios = await AsyncStorage.getItem("savedAudios");

      if (savedAudios) {
        const parsedAudios: AudioItem[] = JSON.parse(savedAudios);
        setAudioData(parsedAudios);
        setFilteredData(parsedAudios);
      } else {
        setAudioData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error loading audio data from AsyncStorage:", error);
      setAudioData([]);
      setFilteredData([]);
    }
  };

  useEffect(() => {
    loadAudioData();
  }, []);

  useEffect(() => {
    console.log("Debounced value:", debouncedValue); 
    const filtered = audioData.filter((item) =>
      item.name.toLowerCase().includes(debouncedValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, [debouncedValue, audioData]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search audio.."
        value={searchInput}
        onChangeText={(text) => setSearchInput(text)}
      />
      {filteredData.length === 0 ? (
        <Text>No audio items available</Text>
      ) : (
        <>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <AudioListItem
                uri={item.uri}
                duration={item.duration}
                name={item.name}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    marginBottom: 10,
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default AudioList;
