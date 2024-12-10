import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FileObject } from "@/utils/types";

const DocumentListItem = ({ item }: { item: FileObject }) => {
  console.log(item.metadata.mimetype)
  if(item.name===".emptyFolderPlaceholder") return (<></>)
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/files/preview",
          params: { name: item.name,type:item.metadata.mimetype },
        })
      }
    >
      <View style={styles.iconContainer}>
        {item.metadata.mimetype.includes("pdf") && (
          <FontAwesome name="file-pdf-o" size={20} color="#E57373" />
        )}
        {item.metadata.mimetype.includes("image") && (
          <FontAwesome name="file-image-o" size={20} color="#64B5F6" />
        )}
        {item.metadata.mimetype.includes("video") && (
          <FontAwesome name="file-video-o" size={20} color="#81C784" />
        )}
      </View>
      <Text style={styles.text}>{item.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 40, 
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0", 
    borderRadius: 8,
    marginRight: 15,
  },
  text: {
    fontSize: 22,
    color: "#333",
  },
});

export default DocumentListItem;
