import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { ObjetivoModule } from '../types';
import StyledButton from './StyledButton';
import AIImproveButton from './AIImproveButton';

interface Level1ObjectiveProps {
  data: ObjetivoModule;
  onUpdate: (field: keyof ObjetivoModule, value: string) => void;
  onComplete: () => void;
  onImproveRequest: (field: keyof ObjetivoModule) => void;
  improvingField: keyof ObjetivoModule | null;
}

const Level1Objective: React.FC<Level1ObjectiveProps> = ({ 
  data, 
  onUpdate, 
  onComplete,
  onImproveRequest,
  improvingField,
}) => {
  const isCompletable = data.nomeAssistente.trim().length > 0 && data.missao.trim().length >= 20;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nível 1: Objetivo & Missão 🎯</Text>
      <Text style={styles.description}>
        Comece definindo quem é seu assistente e qual sua missão principal.
      </Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome do Assistente (obrigatório)</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={data.nomeAssistente}
            onChangeText={(text) => onUpdate('nomeAssistente', text)}
            placeholder="Ex: Assistente de Vendas Proativo"
          />
          <AIImproveButton 
            onPress={() => onImproveRequest('nomeAssistente')}
            loading={improvingField === 'nomeAssistente'}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Missão (mín. 20 caracteres)</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={data.missao}
            onChangeText={(text) => onUpdate('missao', text)}
            placeholder="Descreva o principal objetivo do assistente..."
            multiline
          />
          <AIImproveButton 
            onPress={() => onImproveRequest('missao')}
            loading={improvingField === 'missao'}
          />
        </View>
      </View>

      <StyledButton 
        title="Concluir Nível e Avançar 🚀"
        onPress={onComplete}
        disabled={!isCompletable}
      />
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default Level1Objective;