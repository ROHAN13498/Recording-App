import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

const AudioWave = () => {
  const numberOfBars = 18; 
  const barAnimations = useRef<Animated.Value[]>([]);

  if (barAnimations.current.length === 0) {
    for (let i = 0; i < numberOfBars; i++) {
      barAnimations.current.push(new Animated.Value(1));
    }
  }

  useEffect(() => {
    const animateBars = () => {
      barAnimations.current.forEach((barAnimation, index) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(barAnimation, {
              toValue: 2, 
              duration: 400,
              delay: index * 50, 
              useNativeDriver: true,
            }),
            Animated.timing(barAnimation, {
              toValue: 0.8, 
              duration: 400,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    };

    animateBars();
  }, []);

  return (
    <View style={styles.container}>
      {barAnimations.current.map((barAnimation, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              transform: [{ scaleY: barAnimation }], 
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginVertical: 30,
    flexWrap: "wrap", 
  },
  bar: {
    width: 5, 
    height: 30, 
    backgroundColor: "#808080", 
    marginHorizontal: 1, 
    borderRadius: 2,
  },
});

export default AudioWave;
