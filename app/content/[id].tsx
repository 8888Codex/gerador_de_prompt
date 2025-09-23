import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { wellnessContent, getContentIcon } from '../../data/wellnessContent';

export default function ContentDetailScreen() {
  const { id } = useLocalSearchParams();
  const content = wellnessContent.find(item => item.id === id);

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function togglePlayback() {
    if (isPlaying) {
      console.log('Pausing Sound');
      await sound?.pauseAsync();
      setIsPlaying(false);
    } else {
      if (sound) {
        console.log('Resuming Sound');
        await sound.playAsync();
        setIsPlaying(true);
      } else {
        if (!content || !content.audioUrl) return;
        console.log('Loading and Playing Sound');
        try {
          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: content.audioUrl }
          );
          setSound(newSound);
          await newSound.playAsync();
          setIsPlaying(true);
        } catch (error) {
          console.error("Failed to load sound", error);
        }
      }
    }
  }

  useEffect(() => {
    // Unload the sound when the component unmounts
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  if (!content) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Conteúdo não encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderContent = () => {
    if (content.type === 'text') {
      return (
        <ScrollView>
          <Text style={styles.textContent}>{content.content}</Text>
        </ScrollView>
      );
    }

    if (content.type === 'audio' || content.type === 'podcast') {
      return (
        <View style={styles.audioContainer}>
          <Text style={styles.audioText}>{content.content}</Text>
          <Pressable style={styles.playButton} onPress={togglePlayback}>
            <MaterialCommunityIcons name={isPlaying ? 'pause-circle' : 'play-circle'} size={80} color="#6A5ACD" />
          </Pressable>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: content.title }} />
      <View style={styles.header}>
        <View style={styles.iconContainer}>
            <MaterialCommunityIcons name={getContentIcon(content.type)} size={30} color="#6A5ACD" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{content.title}</Text>
          <Text style={styles.category}>{content.category}</Text>
        </View>
      </View>
      <View style={styles.contentArea}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    backgroundColor: '#F5F3FF',
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  category: {
    fontSize: 16,
    color: '#888',
  },
  contentArea: {
    flex: 1,
    padding: 20,
  },
  textContent: {
    fontSize: 18,
    lineHeight: 28,
    color: '#333',
  },
  audioContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  audioText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  playButton: {
    marginBottom: 20,
  },
});