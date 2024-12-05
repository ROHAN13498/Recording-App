import { View, FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import AudioListItem from "./AudioListItem";

// Dummy data for the audio items
const audioData = [
  { id: '1', name: 'Audio 1', duration: '3:20', size: 5.6 },
  { id: '2', name: 'Audio 2', duration: '4:15', size: 7.2 },
  { id: '3', name: 'Audio 3', duration: '2:45', size: 3.1 },
  { id: '4', name: 'Audio 4', duration: '5:00', size: 6.8 },
  { id: '5', name: 'Audio 5', duration: '3:30', size: 4.5 },
];

const AudioList = () => {
  

  return (
    <View style={styles.container}>
      {audioData.length === 0 ? (
        <Text>No audio items available</Text>
      ) : (
        <FlatList
          data={audioData}
          renderItem={({ item }) => (
            <AudioListItem
              name={item.name}
              duration={item.duration}
              size={item.size}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    fontSize:10
  },
});

export default AudioList;
