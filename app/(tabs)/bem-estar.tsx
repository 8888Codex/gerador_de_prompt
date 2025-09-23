import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { wellnessContent } from '../../data/wellnessContent';
import MoodChart from '../../components/MoodChart';
import ContentCard from '../../components/ContentCard';
import { useMoodHistory, MoodOption } from '../../hooks/useMoodHistory';

const moodOptions: MoodOption[] = [
  { icon: 'emoticon-happy-outline', label: 'Feliz' },
  { icon: 'emoticon-neutral-outline', label: 'Neutro' },
  { icon: 'emoticon-sad-outline', label: 'Triste' },
  { icon: 'emoticon-angry-outline', label: 'Irritado' },
  { icon: 'emoticon-cool-outline', label: 'Relaxado' },
];

const allCategories = ['Todos', ...Array.from(new Set(wellnessContent.map(item => item.category)))];

export default function BemEstarScreen() {
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);
  const { moodHistory, addMoodEntry } = useMoodHistory();
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const handleSaveMood = () => {
    if (selectedMood) {
      addMoodEntry(selectedMood);
      
      const suggestedCategory = wellnessContent.find(item => 
        item.relatedMoods?.includes(selectedMood.label)
      )?.category;
      
      if (suggestedCategory) {
        setSelectedCategory(suggestedCategory);
      }

      setSelectedMood(null);
    }
  };

  const filteredContent = wellnessContent.filter(item => 
    selectedCategory === 'Todos' || item.category === selectedCategory
  );

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
              <MaterialCommunityIcons name={option.icon} size={40} color={selectedMood?.label === option.label ? '#FFFFFF' : '#22577A'} />
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
          <MoodChart data={moodHistory} />
        </View>

        <View style={styles.wellnessContainer}>
          <Text style={styles.wellnessTitle}>Explorar Conteúdos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScrollView}>
            {allCategories.map(category => (
              <Pressable 
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.selectedCategoryChip
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}>{category}</Text>
              </Pressable>
            ))}
          </ScrollView>
          {filteredContent.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
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
    backgroundColor: '#22577A',
    borderColor: '#22577A',
  },
  moodLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#22577A',
  },
  selectedLabel: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#22577A',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
    alignSelf: 'center',
  },
  disabledButton: {
    backgroundColor: '#A9C4D4',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyContainer: {
    width: '100%',
    marginBottom: 20,
  },
  wellnessContainer: {
    width: '100%',
    marginTop: 20,
  },
  wellnessTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 20,
  },
  categoryScrollView: {
    marginBottom: 20,
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DCDCDC',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  selectedCategoryChip: {
    backgroundColor: '#22577A',
    borderColor: '#22577A',
  },
  categoryText: {
    color: '#22577A',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
});