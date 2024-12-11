import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import AudioListItem from "./AudioListItem";
import { useDebounce } from "@/hooks/useDebounce";
import { supabase } from "@/utils/supabase";
import { FileObject } from "@/utils/types";
import EmptyState from "./EmptyState";

const AudioList = () => {
  const [audioData, setAudioData] = useState<FileObject[]>([]);
  const [filteredData, setFilteredData] = useState<FileObject[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const debouncedValue = useDebounce(searchInput, 500);

  const loadAudioData = async () => {
    try {
      const { data } = await supabase.storage.from("App").list("Audios", {
        sortBy: { column: "created_at", order: "asc" },
      });
      setAudioData(data || []);
      setFilteredData(data || []);
    } catch (error) {
      console.error("Error loading audio data from Supabase:", error);
    }
  };

  useEffect(() => {
    loadAudioData();
  }, []);

  useEffect(() => {
    const filtered = audioData.filter((item) =>
      item.name.toLowerCase().includes(debouncedValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, [debouncedValue, audioData]);

  if (filteredData.length == 1) {
    return <EmptyState name="Audios" />;
  } else if (filteredData.length == 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00439C" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search audio.."
        value={searchInput}
        onChangeText={(text) => setSearchInput(text)}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <AudioListItem id={item.id} name={item.name} />
        )}
        keyExtractor={(item) => item.id.toString()} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
