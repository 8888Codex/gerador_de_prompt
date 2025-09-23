import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.illustrationContainer}>
        <Image 
          source={require('../assets/images/welcome-avatar.png')} 
          style={styles.avatar}
          resizeMode="contain"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Bem-vindo(a)!</Text>
        <Text style={styles.subtitle}>
          Seu espaço seguro para cuidar do seu bem-estar emocional.
        </Text>
        <Pressable style={styles.button} onPress={() => router.replace('/chat')}>
          <Feather name="arrow-right" size={28} color="#22577A" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  illustrationContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  avatar: {
    width: 300,
    height: 300,
  },
  contentContainer: {
    flex: 2,
    backgroundColor: '#22577A',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 40,
    paddingHorizontal: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});