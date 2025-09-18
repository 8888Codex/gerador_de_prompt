import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import FlipCard from '../components/FlipCard';
import AnimatedBackground from '../components/AnimatedBackground';

export default function CardDemoScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AnimatedBackground />
      <View style={styles.container}>
        <Text style={styles.title}>Componente Flip Card</Text>
        <Text style={styles.subtitle}>Toque no cartão para virar</Text>
        <FlipCard />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1F2937',
    textShadowColor: 'rgba(255, 255, 255, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 40,
    textShadowColor: 'rgba(255, 255, 255, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});