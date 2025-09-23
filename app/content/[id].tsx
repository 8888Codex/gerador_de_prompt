import React, 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';
import { wellnessContent, getContentIcon } from '../../data/wellnessContent';

export default function ContentDetailScreen() {
  const { id } = useLocalSearchParams();
  const content = wellnessContent.find(item => item.id === id);

  const [sound, setSound] = React.useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [playbackStatus, setPlaybackStatus] = React.useState<AVPlaybackStatusSuccess | null>(null);

  const onStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPlaybackStatus(status as AVPlaybackStatusSuccess);
      if (status.didJustFinish) {
        setIsPlaying(false);
        sound?.setPositionAsync(0);
      }
    }
  };

  async function togglePlayback() {
    if (isPlaying) {
      await sound?.pauseAsync();
      setIsPlaying(false);
    } else {
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
      } else {
        if (!content || !content.audioUrl) return;
        try {
          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: content.audioUrl }
          );
          newSound.setOnPlaybackStatusUpdate(onStatusUpdate);
          setSound(newSound);
          await newSound.playAsync();
          setIsPlaying(true);
        } catch (error) {
          console.error("Failed to load sound", error);
        }
      }
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const getProgress = () => {
    if (!playbackStatus || !playbackStatus.durationMillis) {
      return 0;
    }
    return (playbackStatus.positionMillis / playbackStatus.durationMillis) * 100;
  };

  const formatTime = (millis: number | undefined) => {
    if (millis === undefined) return '0:00';
    const totalSeconds = Math.floor(millis / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

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
        <ScrollView style={styles.contentArea}>
          <Text style={styles.textContent}>{content.content}</Text>
        </ScrollView>
      );
    }

    if (content.type === 'audio' || content.type === 'podcast') {
      return (
        <View style={styles.playerContainer}>
          <View style={styles.artworkContainer}>
            <MaterialCommunityIcons name={getContentIcon(content.type)} size={100} color="#6A5ACD" />
          </View>

          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>{content.title}</Text>
            <Text style={styles.trackArtist}>{content.category}</Text>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${getProgress()}%` }]} />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(playbackStatus?.positionMillis)}</Text>
              <Text style={styles.timeText}>{formatTime(playbackStatus?.durationMillis)}</Text>
            </View>
          </View>

          <View style={styles.controlsContainer}>
            <Pressable>
              <MaterialCommunityIcons name="skip-previous" size={40} color="#B0B0B0" />
            </Pressable>
            <Pressable style={styles.playButton} onPress={togglePlayback}>
              <MaterialCommunityIcons name={isPlaying ? 'pause' : 'play'} size={50} color="#FFFFFF" />
            </Pressable>
            <Pressable>
              <MaterialCommunityIcons name="skip-next" size={40} color="#B0B0B0" />
            </Pressable>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: content.title }} />
      {renderContent()}
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
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4A4A4A',
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
  playerContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 30,
  },
  artworkContainer: {
    width: 250,
    height: 250,
    backgroundColor: '#F5F3FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  trackTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
  },
  trackArtist: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  progressSection: {
    width: '100%',
    marginBottom: 20,
  },
  progressBarContainer: {
    height: 6,
    width: '100%',
    backgroundColor: '#EAEAEA',
    borderRadius: 3,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6A5ACD',
    borderRadius: 3,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  timeText: {
    fontSize: 12,
    color: '#888',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
  },
  playButton: {
    backgroundColor: '#6A5ACD',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});