import { View, FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import DocumentListItem from "./DocumentListItem";
import { FileObject } from "@/utils/types";
import EmptyState from "./EmptyState";

const DocumentList = ({ files }: { files: FileObject[] | null }) => {
  if (files == null || files.length <= 1) {
    return (
      <EmptyState
        name="Documents"
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={files}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DocumentListItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
});

export default DocumentList;
