import DocumentList from "@/components/DocumentList";
import { supabase } from "@/utils/supabase";
import { FileObject } from "@/utils/types";
import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [documents, setDocuments] = useState<FileObject[] | null>([]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*", "video/*"],
        copyToCacheDirectory: true,
        multiple:false
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const { uri, name, mimeType } = result.assets[0]; 
        const file = await fetch(uri);
        const fileData = await file.arrayBuffer();

        const { data: uploadData, error } = await supabase.storage
          .from("App")
          .upload(`Documents/${name || `document_${Date.now()}`}`, fileData, {
            contentType: mimeType,
          });

        if (error) {
          console.log(error)
        }

        const newDocument: FileObject = {
          id: uploadData?.path || "",
          name: name || `document_${Date.now()}`,
          created_at: new Date().toISOString(),
          metadata: { mimetype: mimeType },
        };

        setDocuments((prev) => (prev ? [newDocument, ...prev] : [newDocument]));
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  useEffect(() => {
    const getDocuments = async () => {
      const { data, error } = await supabase.storage
        .from("App")
        .list("Documents", {
          sortBy: { column: "created_at", order: "asc" },
        });

      if (error) {
        console.error("Error fetching documents:", error);
      } else {
        setDocuments(data || []);
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
      <DocumentList files={documents} />
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
