import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { PersonaModule } from '../types';
import StyledButton from './StyledButton';
import AIImproveButton from './AIImproveButton';

type ImprovingField = keyof Omit<PersonaModule, 'genero'>;

interface Level2PersonaProps {
  data: PersonaModule;
  onUpdate: (field: keyof PersonaModule, value: string) => void;
  onComplete: () => void;
  onImproveRequest: (field: ImprovingField) => void;
  improvingField: ImprovingField | null;
}

const Level2Persona: React.FC<Level2PersonaProps> = ({
  data,
  onUpdate,
  onComplete,
  onImproveRequest,
  improvingField,
}) => {
  const isCompletable = Object.values(data).every(value => typeof value === 'string' ? value.trim().length > 0 : true);

  const renderInputField = (field: ImprovingField, label: string, placeholder: string, multiline = false) => (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, multiline && styles.textArea]}
          value={data[field]}
          onChangeText={(text) => onUpdate(field, text)}
          placeholder={placeholder}
          multiline={multiline}
        />
        <AIImproveButton
          onPress={() => onImproveRequest(field)}
          loading={improvingField === field}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nível 2: Persona & Tom 🎭</Text>
      <Text style={styles.description}>
        Defina a personalidade do seu assistente. Como ele deve soar e se comportar?
      </Text>

      {renderInputField('postura', 'Postura', 'Ex: Guia prestativo e paciente...', true)}
      {renderInputField('tom', 'Tom', 'Ex: Encorajador e positivo...', true)}
      {renderInputField('atitude', 'Atitude', 'Ex: Solucionador de problemas...', true)}
      {renderInputField('empatia', 'Empatia', 'Ex: Reconhece as frustrações do usuário...', true)}
      {renderInputField('linguagemModos', 'Modos de Linguagem', 'Ex: Formal, técnico, casual, divertido...')}

      <View style={styles.formGroup}>
        <Text style={styles.label}>Gênero do Assistente</Text>
        <View style={styles.genderSelector}>
          {(['neutro', 'feminino', 'masculino'] as const).map(genero => (
            <TouchableOpacity
              key={genero}
              style={[styles.genderButton, data.genero === genero && styles.genderButtonSelected]}
              onPress={() => onUpdate('genero', genero)}
            >
              <Text style={[styles.genderButtonText, data.genero === genero && styles.genderButtonTextSelected]}>
                {genero.charAt(0).toUpperCase() + genero.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <StyledButton
        title="Concluir Nível e Avançar 🧠"
        onPress={onComplete}
        disabled={!isCompletable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, width: '100%' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  description: { fontSize: 16, color: '#6B7280', marginBottom: 24 },
  formGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 8 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8 },
  input: { flex: 1, borderWidth: 0, padding: 12, fontSize: 16 },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  genderSelector: { flexDirection: 'row', justifyContent: 'space-between' },
  genderButton: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#D1D5DB', alignItems: 'center', marginHorizontal: 4 },
  genderButtonSelected: { backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
  genderButtonText: { color: '#374151', fontWeight: '500' },
  genderButtonTextSelected: { color: 'white' },
});

export default Level2Persona;