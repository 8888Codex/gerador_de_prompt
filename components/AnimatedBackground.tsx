import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
  withDelay,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const NUM_PARTICLES = 30;

const Particle = ({ initialX, initialY, size, duration, delay }: any) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(withTiming(1, { duration, easing: Easing.linear }), -1, false)
    );
  }, [progress, duration, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    const newX = initialX + (Math.random() - 0.5) * width * 0.5;
    const newY = initialY + (Math.random() - 0.5) * height * 0.5;

    const translateX = interpolate(progress.value, [0, 1], [initialX, newX]);
    const translateY = interpolate(progress.value, [0, 1], [initialY, newY]);
    const opacity = interpolate(progress.value, [0, 0.2, 0.8, 1], [0, 0.7, 0.7, 0]);
    const scale = interpolate(progress.value, [0, 0.5, 1], [1, 1.5, 1]);

    return {
      transform: [{ translateX }, { translateY }, { scale }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        { width: size, height: size, borderRadius: size / 2 },
        animatedStyle,
      ]}
    />
  );
};

const AnimatedBackground = () => {
  const particles = React.useMemo(
    () =>
      Array.from({ length: NUM_PARTICLES }).map((_, index) => ({
        id: index,
        initialX: Math.random() * width,
        initialY: Math.random() * height,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 8000 + 5000,
        delay: Math.random() * 5000,
      })),
    []
  );

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <LinearGradient
        colors={['#e3f2fd', '#90caf9', '#64b5f6']}
        style={StyleSheet.absoluteFillObject}
      />
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default AnimatedBackground;