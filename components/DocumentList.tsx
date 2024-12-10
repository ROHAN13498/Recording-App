import { View, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import DocumentListItem from './DocumentListItem';
import { FileObject } from '@/utils/types';

const DocumentList = ({files}:{files:FileObject[] | null}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={files}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DocumentListItem item={item}  />}
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
