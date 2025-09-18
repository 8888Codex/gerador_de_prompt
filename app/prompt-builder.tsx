import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
import { PromptProject, ObjetivoModule } from '../types';
import { LEVELS } from '../data/levels';
import ProgressHeader from '../components/ProgressHeader';
import Level1Objective from '../components/Level1Objective';
import Level2Persona from '../components/Level2Persona';

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
    persona: {
      postura: '',
      tom: '',
      atitude: '',
      empatia: '',
      genero: 'neutro',
      linguagemModos: [],
      isUnlocked: false,
      isCompleted: false,
      completionScore: 0,
    }
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

  const handleLevel1Completion = () => {
    const { nomeAssistente, missao } = project.modules.objetivo;

    // Simple scoring logic
    let score = 0;
    if (nomeAssistente.trim().length > 0) score += 40;
    if (missao.trim().length >= 20) score += 40;
    if (missao.trim().length > 50) score += 20; // Bonus for detail
    score = Math.min(score, 100);

    const level1Info = LEVELS.find(l => l.id === 1);
    if (!level1Info || score < level1Info.minScore) {
      Alert.alert(
        "Pontuação Insuficiente",
        `Você fez ${score} pontos, mas precisa de ${level1Info?.minScore || 60} para avançar. Tente detalhar mais a missão.`
      );
      return;
    }

    setProject(prev => ({
      ...prev,
      currentLevel: 2,
      completedLevels: [...prev.completedLevels, 1],
      levelScores: { ...prev.levelScores, 1: score },
      totalProgress: 15,
      modules: {
        ...prev.modules,
        objetivo: {
          ...prev.modules.objetivo,
          isCompleted: true,
          completionScore: score,
          completedAt: new Date(),
        },
        persona: {
          ...prev.modules.persona,
          isUnlocked: true,
        }
      }
    }));
    
    Alert.alert("🎉 Nível 1 Concluído!", "Bem-vindo ao Nível 2: Persona & Tom!");
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
              onComplete={handleLevel1Completion}
            />
          )}
          {project.currentLevel === 2 && (
            <Level2Persona />
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