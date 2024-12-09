import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';


const SaveButton = ({ onPress }:{onPress:()=>void}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Save Audio</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    backgroundColor: 'darkblue',
    borderRadius: 15,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SaveButton;
