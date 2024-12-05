import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface AudioListItemProps {
  name: string;
  duration: string;
  size: number;
}

const AudioListItem = ({ name, duration, size }: AudioListItemProps) => {
  return (
    <View style={styles.audioListItemContainer}>
      <View style={styles.iconTextContainer}>
        <View style={styles.iconBox}>
          <FontAwesome name="microphone" size={30} color="#16D7F9" />
        </View>
        <View style={styles.textContainer}>
          <Text>{name}</Text>
          <Text>
            {duration} --- {size} MB
          </Text>
        </View>
      </View>
      <View style={styles.playButtonContainer}>
        <FontAwesome5 name="play" size={28} color="#9F9F9F" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  audioListItemContainer: {
    height: 70, 
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center", 
  },
  textContainer: {
    marginLeft: 10, 
  },
  iconBox: {
    backgroundColor: "lightgrey", 
    borderRadius: 15, 
    padding: 8, 
    height: 50,
    width: 50,
    justifyContent: "center",  // Center the icon vertically
    alignItems: "center",      // Center the icon horizontally
  },
  playButtonContainer: {
    color: "lightgrey", 
    borderRadius: 25, 
    padding: 8, 
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AudioListItem;
