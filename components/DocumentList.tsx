import { View, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import DocumentListItem from './DocumentListItem';

const DocumentList = () => {
  const dummyData = [
    { id: '1', name: 'Document 1' },
    { id: '2', name: 'Document 2' },
    { id: '3', name: 'Document 3' },
    { id: '4', name: 'Document 4' },
    { id: '5', name: 'Document 5' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DocumentListItem name={item.name} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
});

export default DocumentList;
