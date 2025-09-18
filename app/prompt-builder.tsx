import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { PromptProject, ObjetivoModule } from '../types';
import ProgressHeader from '../components/ProgressHeader';
import Level1Objective from '../components/Level1Objective';

const initialProjectState: PromptProject = {
  id: '1',
  name: 'Novo Prompt',
  currentLevel: 1,
  completedLevels: [],
  levelScores: {},
  achievements: [],
  totalProgress: 5,
  modules: {
    objetivo: {
      nomeAssistente: '',
      missao: '',
      isUnlocked: true,
      isCompleted: false,
      completionScore: 0,
    },
  },
};

export default function PromptBuilderScreen() {
  const [project, setProject] = useState<PromptProject>(initialProjectState);

  const handleObjectiveUpdate = (field: keyof ObjetivoModule, value: string) => {
    setProject(prevProject => ({
      ...prevProject,
      modules: {
        ...prevProject.modules,
        objetivo: {
          ...prevProject.modules.objetivo,
          [field]: value,
        },
      },
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ProgressHeader project={project} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {project.currentLevel === 1 && (
            <Level1Objective 
              data={project.modules.objetivo}
              onUpdate={handleObjectiveUpdate}
            />
          )}
          {/* Other levels will be rendered here based on project.currentLevel */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Light gray background
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    padding: 16,
  },
});