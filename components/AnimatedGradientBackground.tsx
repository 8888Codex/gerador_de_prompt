import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedGradientBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Temporarily using a static gradient to avoid the reanimated crash on web.
  return (
    <LinearGradient
      style={styles.container}
      colors={['#111827', '#3B82F6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AnimatedGradientBackground;