import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { wellnessContent, getContentIcon } from '../../data/wellnessContent';

type MoodOption = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
};

const moodOptions: MoodOption[] = [
  { icon: 'emoticon-happy-outline', label: 'Feliz' },
  { icon: 'emoticon-neutral-outline', label: 'Neutro' },
  { icon: 'emoticon-sad-outline', label: 'Triste' },
  { icon: 'emoticon-angry-outline', label: 'Irritado' },
  { icon: 'emoticon-cool-outline', label: 'Relaxado' },
];

type MoodEntry = {
  mood: MoodOption;
  timestamp: Date;
};

export default function BemEstarScreen() {
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  const handleSaveMood = () => {
    if (selectedMood) {
      const newEntry: MoodEntry = {
        mood: selectedMood,
        timestamp: new Date(),
      };
      setMoodHistory([newEntry, ...moodHistory]);
      setSelectedMood(null); // Reset selection
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Como você se sente hoje?</Text>
        
        <View style={styles.moodSelector}>
          {moodOptions.map((option) => (
            <Pressable
              key={option.label}
              style={[
                styles.moodOption,
                selectedMood?.label === option.label && styles.selectedMood,
              ]}
              onPress={() => setSelectedMood(option)}
            >
              <MaterialCommunityIcons name={option.icon} size={40} color={selectedMood?.label === option.label ? '#FFFFFF' : '#6A5ACD'} />
              <Text style={[styles.moodLabel, selectedMood?.label === option.label && styles.selectedLabel]}>{option.label}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable 
          style={[styles.saveButton, !selectedMood && styles.disabledButton]} 
          onPress={handleSaveMood}
          disabled={!selectedMood}
        >
          <Text style={styles.saveButtonText}>Salvar Humor</Text>
        </Pressable>

        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Seu Histórico</Text>
          {moodHistory.length === 0 ? (
            <Text style={styles.emptyHistoryText}>Nenhum registro ainda. Comece selecionando seu humor acima!</Text>
          ) : (
            moodHistory.map((entry, index) => (
              <View key={index} style={styles.historyEntry}>
                <MaterialCommunityIcons name={entry.mood.icon} size={24} color="#4A4A4A" />
                <Text style={styles.historyText}>
                  Você se sentiu <Text style={{fontWeight: 'bold'}}>{entry.mood.label}</Text> em {entry.timestamp.toLocaleDateString('pt-BR')}
                </Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.wellnessContainer}>
          <Text style={styles.wellnessTitle}>Conteúdos para seu Bem-estar</Text>
          {wellnessContent.map((item) => (
            <Pressable key={item.id} style={styles.contentCard} onPress={() => router.push(`/content/${item.id}`)}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name={getContentIcon(item.type as 'audio' | 'text' | 'podcast')} size={24} color="#6A5ACD" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardCategory}>{item.category}</Text>
              </View>
              {item.duration && (
                <Text style={styles.cardDuration}>{item.duration}</Text>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F3FF',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 30,
    textAlign: 'center',
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  moodOption: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    backgroundColor: '#FFFFFF',
    width: 65,
  },
  selectedMood: {
    backgroundColor: '#6A5ACD',
    borderColor: '#6A5ACD',
  },
  moodLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#6A5ACD',
  },
  selectedLabel: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 40,
  },
  disabledButton: {
    backgroundColor: '#C8A2C8',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyContainer: {
    width: '100%',
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingBottom: 5,
  },
  historyEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  historyText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  emptyHistoryText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  wellnessContainer: {
    width: '100%',
    marginTop: 20,
  },
  wellnessTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingBottom: 5,
  },
  contentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    backgroundColor: '#F5F3FF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A4A4A',
  },
  cardCategory: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  cardDuration: {
    fontSize: 12,
    color: '#6A5ACD',
    fontWeight: '600',
  },
});