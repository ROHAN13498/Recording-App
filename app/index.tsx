import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Eksaq</Text>
      <Button
        title="->"
        onPress={() => router.push("/audio")}
        color="darkblue" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Index;
