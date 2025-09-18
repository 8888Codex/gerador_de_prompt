import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { ObjetivoModule } from '../types';

interface Level1ObjectiveProps {
  data: ObjetivoModule;
  onUpdate: (field: keyof ObjetivoModule, value: string) => void;
}

const Level1Objective: React.FC<Level1ObjectiveProps> = ({ data, onUpdate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nível 1: Objetivo & Missão 🎯</Text>
      <Text style={styles.description}>
        Comece definindo quem é seu assistente e qual sua missão principal.
      </Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome do Assistente (obrigatório)</Text>
        <TextInput
          style={styles.input}
          value={data.nomeAssistente}
          onChangeText={(text) => onUpdate('nomeAssistente', text)}
          placeholder="Ex: Assistente de Vendas Proativo"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Missão (mín. 20 caracteres)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={data.missao}
          onChangeText={(text) => onUpdate('missao', text)}
          placeholder="Descreva o principal objetivo do assistente..."
          multiline
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default Level1Objective;