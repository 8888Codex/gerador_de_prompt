import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PromptProject } from '../types';

interface ProgressHeaderProps {
  project: PromptProject;
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({ project }) => {
  const progress = project.totalProgress;
  const currentLevelInfo = `Nível ${project.currentLevel}/8`;
  const achievementsCount = project.achievements.length;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        🎮 {currentLevelInfo} | ⭐ {achievementsCount} conquistas | 🎯 {progress}% concluído
      </Text>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    backgroundColor: '#1F2937', // Dark gray
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#4B5563', // Medium gray
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3B82F6', // Blue
    borderRadius: 5,
  },
});

export default ProgressHeader;