import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Level2Persona: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nível 2: Persona & Tom 🎭</Text>
      <Text style={styles.description}>
        Parabéns por chegar até aqui! Agora, vamos construir a personalidade do seu assistente.
      </Text>
      <Text style={styles.wip}>-- Em construção --</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  wip: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F59E0B', // Yellow
  }
});

export default Level2Persona;