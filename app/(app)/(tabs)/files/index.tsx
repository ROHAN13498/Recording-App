import DocumentList from "@/components/DocumentList";
import Loader from "@/components/Loader";
import { supabase } from "@/utils/supabase";
import { FileObject } from "@/utils/types";
import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Index() {
  const [documents, setDocuments] = useState<FileObject[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*", "video/*"],
        copyToCacheDirectory: true,
        multiple: false,
      });
      setIsLoading(true);  

      if (!result.canceled && result.assets && result.assets[0]) {
        const { uri, name, mimeType } = result.assets[0];
        const file = await fetch(uri);
        const fileData = await file.arrayBuffer();

        const { data, error } = await supabase.storage
          .from("App")
          .upload(`Documents/${name || `document_${Date.now()}`}`, fileData, {
            contentType: mimeType,
          });

        if (error) {
          throw new Error(error.message);
        }

        const newDocument: FileObject = {
          id: data?.path || "",
          name: name || `document_${Date.now()}`,
          created_at: new Date().toISOString(),
          metadata: { mimetype: mimeType },
        };

        setDocuments((prev) => (prev ? [newDocument, ...prev] : [newDocument]));
        Toast.show({
          type: "success",
          text1: "Document Uploaded",
          text2: `${name || "New Document"} uploaded successfully.`,
          position: "bottom",
        });
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Unexpected Error",
        text2: err.message || "An unknown error occurred",
        position: "bottom",
      });
    } finally {
      setIsLoading(false);  // Set loading to false after the upload is completed
    }
  };

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const { data, error } = await supabase.storage
          .from("App")
          .list("Documents", {
            sortBy: { column: "created_at", order: "asc" },
          });

        if (error) {
          console.error("Error fetching documents:", error);
          Toast.show({
            type: "error",
            text1: "Fetch Error",
            text2: error.message,
            position: "bottom",
          });
          return;
        }
        setDocuments(data || []);
      } catch (err) {
        console.error("Error fetching documents:", err);
        Toast.show({
          type: "error",
          text1: "Unexpected Error",
          text2: "Failed to fetch documents.",
          position: "bottom",
        });
      } finally {
        setIsLoading(false);
      }
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
      {isLoading ? (
        <Loader />
      ) : (
        <DocumentList files={documents} />
      )}
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
});
