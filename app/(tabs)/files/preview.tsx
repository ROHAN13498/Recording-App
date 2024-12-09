import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { Document } from './index'; // Adjust the import based on your file structure
import Pdf from 'react-native-pdf';
import { Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const PreviewScreen = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const { documentId } = useLocalSearchParams(); // Fetch document ID from URL params

  useEffect(() => {
    const fetchDocument = async () => {
      const savedDocuments: Document[] = JSON.parse(
        (await AsyncStorage.getItem("documents")) || "[]"
      );

      const documentIndex = parseInt(documentId as string, 10);

      if (documentIndex >= 0 && documentIndex < savedDocuments.length) {
        setSelectedDocument(savedDocuments[documentIndex]); // Set the selected document based on ID
      }
    };

    if (documentId) {
      fetchDocument(); 
    }
  }, [documentId]);

  const renderSelectedDocument = () => {
    if (!selectedDocument) return <Text>Loading...</Text>; 

    switch (selectedDocument.type) {
      case 'pdf':
        return (
          <Pdf
            source={{ uri: selectedDocument.uri }}
            style={styles.documentContent}
            onError={(error: any) => console.error(error)} 
          />
        );
      case 'image':
        return (
          <Image
            source={{ uri: selectedDocument.uri }}
            style={styles.documentContent}
            resizeMode="contain" 
          />
        );
      case 'video':
        return (
          <Video
            source={{ uri: selectedDocument.uri }}
            style={styles.documentContent}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        );
      default:
        return <Text>Unsupported document type</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {selectedDocument && (
        <Text style={styles.documentName}>{selectedDocument.name}</Text> // Render the document name
      )}
      {renderSelectedDocument()} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:"white"
  },
  documentName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Space between the name and the content
  },
  documentContent: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default PreviewScreen;
