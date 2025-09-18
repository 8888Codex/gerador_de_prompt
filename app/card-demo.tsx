import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';
import { router } from 'expo-router';
import StyledButton from '../components/StyledButton';

export default function CardDemoScreen() {
  const handleNavigate = () => {
    router.push('/prompt-builder');
  };

  return (
    <View style={styles.fullScreen}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Gerador de Prompt com IA</Text>
          <Text style={styles.subtitle}>
            Crie, refine e exporte prompts poderosos com nosso guia passo a passo.
          </Text>
          <StyledButton 
            title="Começar a Construir"
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
    backgroundColor: '#111827', // Dark blue-gray
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#D1D5DB', // Lighter gray
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 26,
  },
});