import { View, Text, StyleSheet,ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Pdf from "react-native-pdf";
import { Image } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { GetSignedUrl } from "@/utils/GetSIgnedUrl";

const PreviewScreen = () => {
  const { name, type } = useLocalSearchParams();
  const [url, SetUrl] = useState<string>("");
  useEffect(() => {
    const fetchDocument = async () => {
      const signedUrl = await GetSignedUrl(
        "Documents",
        Array.isArray(name) ? name[0] : name
      );
      if (signedUrl) {
        SetUrl(signedUrl);
      }
    };

    fetchDocument();
  }, [name]);

  const renderSelectedDocument = () => {
    if (!url) return (<ActivityIndicator size="large" color="#ADD8E6" />)

    if (type?.includes("pdf")) {
      return (
        <Pdf
          source={{ uri: url }}
          style={styles.documentContent}
          onError={(error: any) => console.error(error)}
        />
      );
    }
    if (type?.includes("image")) {
      return (
        <Image
          source={{ uri: url }}
          style={styles.documentContent}
          resizeMode="contain"
        />
      );
    }
    if (type?.includes("video")) {
      return (
        <Video
          source={{ uri: url }}
          style={styles.documentContent}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />
      );
    }

    return <Text>Unsupported document type</Text>;
  };

  return (
    <View style={styles.container}>
      {url && <Text style={styles.documentName}>{name}</Text>}
      {renderSelectedDocument()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  documentName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20, // Space between the name and the content
  },
  documentContent: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default PreviewScreen;
