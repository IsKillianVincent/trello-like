import React, { useState, useEffect } from 'react';
import { View, Animated, Image, StyleSheet } from 'react-native';

const ShimmerImage = ({ source, style }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const shimmerValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const shimmerBackgroundColor = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#c0c0c0'],
  });

  return (
    <View style={style}>
      {!imageLoaded && (
        <Animated.View style={[style, styles.shimmer, { backgroundColor: shimmerBackgroundColor }]} />
      )}
      <Image
        source={source}
        style={[style, { position: imageLoaded ? 'relative' : 'absolute', opacity: imageLoaded ? 1 : 0 }]}
        onLoad={() => setImageLoaded(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default ShimmerImage;
