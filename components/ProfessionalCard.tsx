import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Professional } from '../data/professionals';

type ProfessionalCardProps = {
  professional: Professional;
};

export default function ProfessionalCard({ professional }: ProfessionalCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <FontAwesome name="user-circle" size={50} color="#A9C4D4" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{professional.name}</Text>
        <Text style={styles.specialty}>{professional.specialty}</Text>
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Agendar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarContainer: {
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  specialty: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#22577A',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});