import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withRepeat,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

interface MeteorProps {
  delay: number;
  duration: number;
  left: number;
}

const Meteor: React.FC<MeteorProps> = ({ delay, duration, left }) => {
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration,
          easing: Easing.linear,
        }),
        -1,
        false
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animationProgress.value,
      [0, 1],
      [-200, height + 200]
    );
    
    const translateX = interpolate(
      animationProgress.value,
      [0, 1],
      [0, -height]
    );

    const opacity = interpolate(
      animationProgress.value,
      [0, 0.7, 1],
      [1, 1, 0]
    );

    return {
      opacity,
      transform: [
        { translateX },
        { translateY },
      ],
    };
  });

  return (
    <Animated.View style={[styles.meteorContainer, { left }, animatedStyle]}>
      <LinearGradient
        colors={['#64748b', 'transparent']}
        style={styles.meteorTail}
      />
      <View style={styles.meteorHead} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  meteorContainer: {
    position: 'absolute',
    top: 0,
    transform: [{ rotate: '215deg' }],
    alignItems: 'center',
  },
  meteorTail: {
    width: 1,
    height: 80,
  },
  meteorHead: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'white',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});

export default Meteor;