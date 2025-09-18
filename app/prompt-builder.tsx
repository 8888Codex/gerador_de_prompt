import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
import { PromptProject, ObjetivoModule, PersonaModule } from '../types';
import { LEVELS } from '../data/levels';
import ProgressHeader from '../components/ProgressHeader';
import Level1Objective from '../components/Level1Objective';
import Level2Persona from '../components/Level2Persona';
import { supabase } from '../src/integrations/supabase/client';

type ImprovingFieldState = {
  module: 'objetivo' | 'persona';
  field: string;
} | null;

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
      linguagemModos: '',
      isUnlocked: false,
      isCompleted: false,
      completionScore: 0,
    }
  },
};

export default function PromptBuilderScreen() {
  const [project, setProject] = useState<PromptProject>(initialProjectState);
  const [improvingField, setImprovingField] = useState<ImprovingFieldState>(null);

  const handleUpdate = (module: 'objetivo' | 'persona', field: string, value: string) => {
    setProject(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [module]: {
          ...prev.modules[module],
          [field]: value,
        },
      },
    }));
  };

  const handleImproveWithAI = async (module: 'objetivo' | 'persona', field: string) => {
    const value = project.modules[module][field as keyof (ObjetivoModule | PersonaModule)];
    if (typeof value === 'string' && !value.trim()) {
      Alert.alert("Texto Vazio", "Por favor, escreva algo antes de pedir a ajuda da IA.");
      return;
    }

    setImprovingField({ module, field });
    try {
      const { data, error } = await supabase.functions.invoke('improve-text', {
        body: { field, value },
      });

      if (error) throw error;

      if (data.improvedText) {
        handleUpdate(module, field, data.improvedText);
      }
    } catch (error: any) {
      console.error("Error invoking Supabase function:", error);
      Alert.alert("Erro de IA", "Não foi possível melhorar o texto. Tente novamente.");
    } finally {
      setImprovingField(null);
    }
  };

  const handleLevel1Completion = () => {
    // ... (previous logic is correct, no changes needed)
    const { nomeAssistente, missao } = project.modules.objetivo;
    let score = 0;
    if (nomeAssistente.trim().length > 0) score += 40;
    if (missao.trim().length >= 20) score += 40;
    if (missao.trim().length > 50) score += 20;
    score = Math.min(score, 100);
    const level1Info = LEVELS.find(l => l.id === 1);
    if (!level1Info || score < level1Info.minScore) {
      Alert.alert("Pontuação Insuficiente", `Você fez ${score} pontos, mas precisa de ${level1Info?.minScore || 60} para avançar.`);
      return;
    }
    setProject(prev => ({
      ...prev,
      currentLevel: 2,
      completedLevels: [...prev.completedLevels, 1],
      levelScores: { ...prev.levelScores, 1: score },
      totalProgress: 15,
      modules: { ...prev.modules, objetivo: { ...prev.modules.objetivo, isCompleted: true, completionScore: score, completedAt: new Date() }, persona: { ...prev.modules.persona, isUnlocked: true } }
    }));
    Alert.alert("🎉 Nível 1 Concluído!", "Bem-vindo ao Nível 2: Persona & Tom!");
  };

  const handleLevel2Completion = () => {
    const { postura, tom, atitude, empatia, linguagemModos } = project.modules.persona;
    let score = [postura, tom, atitude, empatia, linguagemModos].filter(f => f.trim().length > 10).length * 20;
    score = Math.min(score, 100);

    const level2Info = LEVELS.find(l => l.id === 2);
    if (!level2Info || score < level2Info.minScore) {
      Alert.alert("Pontuação Insuficiente", `Você fez ${score} pontos, mas precisa de ${level2Info?.minScore || 70} para avançar. Tente detalhar mais os campos.`);
      return;
    }

    setProject(prev => ({
      ...prev,
      currentLevel: 3, // Avança para o próximo nível
      completedLevels: [...prev.completedLevels, 2],
      levelScores: { ...prev.levelScores, 2: score },
      totalProgress: 30,
      modules: { ...prev.modules, persona: { ...prev.modules.persona, isCompleted: true, completionScore: score, completedAt: new Date() } }
    }));
    Alert.alert("🎉 Nível 2 Concluído!", "Excelente! Agora vamos para o Nível 3: Memória do Assistente.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ProgressHeader project={project} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {project.currentLevel === 1 && (
            <Level1Objective 
              data={project.modules.objetivo}
              onUpdate={(field, value) => handleUpdate('objetivo', field, value)}
              onComplete={handleLevel1Completion}
              onImproveRequest={(field) => handleImproveWithAI('objetivo', field)}
              improvingField={improvingField?.module === 'objetivo' ? improvingField.field as keyof ObjetivoModule : null}
            />
          )}
          {project.currentLevel === 2 && (
            <Level2Persona 
              data={project.modules.persona}
              onUpdate={(field, value) => handleUpdate('persona', field, value)}
              onComplete={handleLevel2Completion}
              onImproveRequest={(field) => handleImproveWithAI('persona', field)}
              improvingField={improvingField?.module === 'persona' ? improvingField.field as keyof PersonaModule : null}
            />
          )}
          {project.currentLevel === 3 && (
            <View><Text>Nível 3: Variáveis Persistentes (Em construção)</Text></View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { flex: 1 },
  scrollContent: { alignItems: 'center', padding: 16 },
});