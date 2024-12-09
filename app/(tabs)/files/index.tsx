import DocumentList from "@/components/DocumentList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

export interface Document {
  id:number,
  name: string;
  uri: string;
  type: "pdf" | "image" | "video";
}

export default function index() {
  const [documents, setDocuments] = useState<Document[]>([]);

const pickDocument = async () => {
  try {
    
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*", "video/*"],
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const { uri, name, mimeType } = result.assets[0];
      let docType: Document["type"] = "pdf";
      if (mimeType?.startsWith("image/")) {
        docType = "image";
      } else if (mimeType?.startsWith("video/")) {
        docType = "video";
      }

      const savedDocuments = JSON.parse(
        (await AsyncStorage.getItem("documents")) || "[]"
      ) as Document[];
      const newDocument = {
        name: name ?? "Untitled Document",
        uri: uri ?? "",
        type: docType,
        id: savedDocuments.length
      };
      const newSavedDocuments = [...savedDocuments, newDocument];
      await AsyncStorage.setItem(
        "documents",
        JSON.stringify(newSavedDocuments)
      );
      setDocuments(newSavedDocuments)
    }
  } catch (err) {
    console.error("Error picking document:", err);
  }
};


  useEffect(() => {
    const getDocuments = async () => {
      const savedDocuments = JSON.parse(
        (await AsyncStorage.getItem("documents")) || "[]"
      ) as Document[];
      setDocuments(savedDocuments);
    };
    getDocuments();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.audioLibraryContainer}>
        <Text style={styles.audioLibrary}>Documents</Text>
        <Pressable style={styles.addButtonContainer} onPress={pickDocument}>
          <Text style={styles.addButton}>+</Text>
        </Pressable>
      </View>
      <DocumentList files={documents}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  audioLibraryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  audioLibrary: {
    fontSize: 32,
  },
  addButtonContainer: {
    backgroundColor: "#00439C",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  addButton: {
    fontSize: 35,
    color: "white",
  },
  backButton: {
    padding: 10,
    backgroundColor: "#00439C",
    alignSelf: "flex-start",
    margin: 10,
    borderRadius: 5,
  },
  backText: {
    color: "white",
    fontSize: 16,
  },
  pdf: {
    flex: 1,
    margin: 10,
  },
  image: {
    flex: 1,
    margin: 10,
  },
  video: {
    flex: 1,
    margin: 10,
  },
  documentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  documentName: {
    fontSize: 16,
    flex: 1,
  },
  documentType: {
    fontSize: 12,
    color: "#666",
  },
});
