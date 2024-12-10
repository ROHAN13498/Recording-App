import { GetSignedUrl } from "@/utils/GetSIgnedUrl";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/SimpleLineIcons";
import { router, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AudioListItemProps {
  id: string;
  name: string;
}

const AudioListItem = ({ id, name }: AudioListItemProps) => {
  const handlePlayButtonPress = async () => {
    const url = await GetSignedUrl("Audios", name);
    console.log(url);
    if (url) {
      router.push({
        pathname: "/audio/preview",
        params: { url, showSaveButton: "false" },
      });
    } else {
      console.log("Failed to get signed URL");
    }
  };
  if (name == ".emptyFolderPlaceholder") {
    return <></>;
  }
  return (
    <View style={styles.audioListItemContainer}>
      <View style={styles.iconTextContainer}>
        <View style={styles.iconBox}>
          <FontAwesome name="microphone" size={30} color="#16D7F9" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.audioName} numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Text>
        </View>
      </View>
      <View style={styles.playButtonContainer}>
        <FontAwesome5
          name="play"
          size={28}
          color="#9F9F9F"
          onPress={handlePlayButtonPress}
        />
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
    marginBottom: 10,
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
    width: 150,
  },
  iconBox: {
    backgroundColor: "lightgrey",
    borderRadius: 15,
    padding: 8,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
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
