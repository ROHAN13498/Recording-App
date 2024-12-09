import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Document } from "@/app/(tabs)/files";

const DocumentListItem = ({ item }: { item: Document }) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/files/preview",
          params: { documentId: item.id },
        })
      }
    >
      <View style={styles.iconContainer}>
        {item.type === "pdf" && (
          <FontAwesome name="file-pdf-o" size={20} color="#E57373" />
        )}
        {item.type === "image" && (
          <FontAwesome name="file-image-o" size={20} color="#64B5F6" />
        )}
        {item.type === "video" && (
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
