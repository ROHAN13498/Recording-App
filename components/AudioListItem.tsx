import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from "expo-router";

interface AudioListItemProps {
  uri: string;
  duration: string;
  name: string;
}

const AudioListItem = ({ uri, duration, name }: AudioListItemProps) => {
  const router = useRouter();

  const handlePlayButtonPress = () => {
    router.push({
      pathname: "/audio/preview",
      params: { uri,showSaveButton:"false" }, 
    });
  };

  return (
    <View style={styles.audioListItemContainer}>
      <View style={styles.iconTextContainer}>
        <View style={styles.iconBox}>
          <FontAwesome name="microphone" size={30} color="#16D7F9" />
        </View>
        <View style={styles.textContainer}>
          {/* Truncate long names with ellipsis */}
          <Text style={styles.audioName} numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Text> 
          <Text>
            {duration}
          </Text>
        </View>
      </View>
      <View style={styles.playButtonContainer}>
        <FontAwesome5 name="play" size={28} color="#9F9F9F" onPress={handlePlayButtonPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  audioListItemContainer: {
    height: 70, 
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,  // Adds margin between items
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center", 
  },
  textContainer: {
    marginLeft: 10, 
  },
  audioName: {
    fontWeight: "bold", 
    width: 150,  // Restrict the width for truncation
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
