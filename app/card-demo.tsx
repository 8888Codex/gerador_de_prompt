import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';
import FlipCard from '../components/FlipCard';
import { router } from 'expo-router';
import MeteorsBackground from '../components/MeteorsBackground';

export default function CardDemoScreen() {
  const handleNavigate = () => {
    router.push('/prompt-builder');
  };

  return (
    <View style={styles.fullScreen}>
      <StatusBar barStyle="light-content" />
      <MeteorsBackground number={30} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Gerador de Prompt</Text>
          <Text style={styles.subtitle}>Toque no cartão para virar</Text>
          <FlipCard 
            title="Seu PROMPT com IA"
            subtitle="Vamos criar juntos em tempo recorde"
            description="Crie, refine e exporte prompts de IA poderosos com nosso guia passo a passo."
            features={[
              'Processo Guiado',
              'Melhorias com IA',
              'Estrutura Gamificada',
              'Exportação Rápida',
            ]}
            onPress={handleNavigate}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#000',
  },
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
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});