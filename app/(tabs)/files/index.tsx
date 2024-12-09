import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Image } from "expo-image"; // Correct import for Image
import { Video } from "expo-av"; // Expo AV for rendering videos
import Pdf from "react-native-pdf";
import * as FileSystem from "expo-file-system"; // Import expo-file-system to read text files

const Index = () => {
  const [documents, setDocuments] = useState<
    { name: string; uri: string; type: string }[]
  >([]);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState<
    string | null
  >(null);
  const [textContent, setTextContent] = useState<string | null>(null); // Store the text content

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow all types (PDF, images, videos, etc.)
        copyToCacheDirectory: true, // Ensures the file is accessible
      });

      if (!result.canceled) {
        const { uri, name, mimeType } = result.assets[0];

        // Determine the document type based on mimeType
        const fileType = mimeType?.split("/")[0] || "unknown"; // PDF, image, video, text

        setDocuments((prevDocs) => [
          ...prevDocs,
          {
            name: name || "Untitled Document",
            uri: uri || "",
            type: fileType,
          },
        ]);
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const renderContent = () => {
    if (selectedDocument && selectedDocumentType) {
      if (selectedDocumentType === "application/pdf") {
        return (
          <Pdf
            source={{ uri: selectedDocument }}
            style={styles.pdf}
            onError={(error) => {
              console.error(error);
            }}
          />
        );
      }

      if (selectedDocumentType.startsWith("image")) {
        return (
          <Image source={{ uri: selectedDocument }} style={styles.image} />
        );
      }

      if (selectedDocumentType.startsWith("video")) {
        return (
          <Video
            source={{ uri: selectedDocument }}
            style={styles.video}
            useNativeControls
            onError={(error) => console.log(error)}
          />
        );
      }

      if (selectedDocumentType === "text/plain") {
        // Log URI to verify the path
        console.log("Selected document URI:", selectedDocument);

        // Read the text file content when it's selected
        if (selectedDocument) {
          FileSystem.readAsStringAsync(selectedDocument)
            .then((content) => {
              setTextContent(content); // Set the content to display
            })
            .catch((error) => {
              console.error("Error reading text file:", error);
            });
        }

        return (
          <View style={styles.textContainer}>
            <Text style={styles.text}>{textContent}</Text>
          </View>
        );
      }
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.libraryContainer}>
        <Text style={styles.library}>Your Documents</Text>
      </View>

      <View style={styles.audioLibraryContainer}>
        <Text style={styles.audioLibrary}>Documents</Text>
        <Pressable style={styles.addButtonContainer} onPress={pickDocument}>
          <Text style={styles.addButton}>+</Text>
        </Pressable>
      </View>

      {selectedDocument ? (
        <View style={{ flex: 1 }}>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              setSelectedDocument(null);
              setSelectedDocumentType(null);
              setTextContent(null); // Clear the text content when going back
            }}
          >
            <Text style={styles.backText}>Back</Text>
          </Pressable>

          {renderContent()}
        </View>
      ) : (
        <FlatList
          data={documents}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.documentItem}
              onPress={() => {
                setSelectedDocument(item.uri);
                setSelectedDocumentType(item.type);
              }}
            >
              <Text style={styles.documentName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  libraryContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
  },
  library: {
    padding: 0,
    fontSize: 20,
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
  documentItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  documentName: {
    fontSize: 16,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  video: {
    width: "100%",
    height: 250,
  },
  textContainer: {
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default Index;
