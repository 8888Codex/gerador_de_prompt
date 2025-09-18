import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const AnimatedGradientBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 8000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const color1 = interpolateColor(
      progress.value,
      [0, 0.5, 1],
      ['#111827', '#1E3A8A', '#111827']
    );
    const color2 = interpolateColor(
      progress.value,
      [0, 0.5, 1],
      ['#374151', '#3B82F6', '#374151']
    );
    return {
      flex: 1,
      colors: [color1, color2],
    };
  });

  return (
    <AnimatedLinearGradient
      style={styles.container}
      animatedProps={animatedStyle}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </AnimatedLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AnimatedGradientBackground;