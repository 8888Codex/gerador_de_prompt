import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type MoodOption = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
};

export type MoodEntry = {
  mood: MoodOption;
  timestamp: Date;
};

export function useMoodHistory() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const loadMoodHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem('moodHistory');
        if (storedHistory !== null) {
          const parsedHistory = JSON.parse(storedHistory).map((entry: any) => ({
            ...entry,
            timestamp: new Date(entry.timestamp),
          }));
          setMoodHistory(parsedHistory);
        }
      } catch (error) {
        console.error('Failed to load mood history.', error);
      }
    };
    loadMoodHistory();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const saveMoodHistory = async () => {
      try {
        await AsyncStorage.setItem('moodHistory', JSON.stringify(moodHistory));
      } catch (error) {
        console.error('Failed to save mood history.', error);
      }
    };
    saveMoodHistory();
  }, [moodHistory]);

  const addMoodEntry = (mood: MoodOption) => {
    const newEntry: MoodEntry = {
      mood,
      timestamp: new Date(),
    };
    setMoodHistory(prev => [newEntry, ...prev]);
  };

  return { moodHistory, addMoodEntry };
}