import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Pdf from "react-native-pdf";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Document {
  name: string;
  uri: string;
  type: 'pdf' | 'image' | 'video';
}

export default function index(){
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",  
          "image/*",          
          "video/*"           
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const { uri, name, mimeType } = result.assets[0];
        
        let docType: Document['type'] = 'pdf';
        if (mimeType?.startsWith('image/')) {
          docType = 'image';
        } else if (mimeType?.startsWith('video/')) {
          docType = 'video';
        }

        const newDocument={
          name: name ?? "Untitled Document", 
          uri: uri ?? "",
          type: docType
        }



        setDocuments((prevDocs) => [
          ...prevDocs,
          { 
            name: name ?? "Untitled Document", 
            uri: uri ?? "",
            type: docType
          }
        ]);
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const renderSelectedDocument = () => {
    if (!selectedDocument) return null;

    switch (selectedDocument.type) {
      case 'pdf':
        return (
          <Pdf
            source={{ uri: selectedDocument.uri }}
            style={styles.pdf}
            onError={(error) => {
              console.error(error);
            }}
          />
        );
      
      case 'image':
        return (
          <Image
            source={{ uri: selectedDocument.uri }}
            style={styles.image}
            resizeMode="contain"
          />
        );
      
      case 'video':
        return (
          <Video
            source={{ uri: selectedDocument.uri }}
            style={styles.video}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      
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
            onPress={() => setSelectedDocument(null)}
          >
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          {renderSelectedDocument()}
        </View>
      ) : (
        <FlatList
          data={documents}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.documentItem}
              onPress={() => setSelectedDocument(item)}
            >
              <Text style={styles.documentName}>{item.name}</Text>
              <Text style={styles.documentType}>
                {item.type.toUpperCase()}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: '#666',
  },
});

