import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

const AnimatedGradientBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 7000 }),
        withTiming(0, { duration: 7000 })
      ),
      -1, // Infinite repeat
      true // Reverse direction
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = progress.value * 100;
    return {
      transform: [{ translateX: `${translateX}%` }, { translateY: `${translateX}%` }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          style={styles.gradient}
          colors={['#3B82F6', '#111827', '#4F46E5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // Fallback color
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ scaleX: 2 }, { scaleY: 2 }], // Scale to avoid edges showing
  },
});

export default AnimatedGradientBackground;