import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FlipCard from '../components/FlipCard';

export default function CardDemoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Componente Flip Card</Text>
      <Text style={styles.subtitle}>Toque no cartão para virar</Text>
      <FlipCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 40,
  },
});