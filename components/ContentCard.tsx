import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { WellnessContent, getContentIcon } from '../data/wellnessContent';

type ContentCardProps = {
  item: WellnessContent;
};

const categoryColors: { [key: string]: string } = {
  'Respiração': '#a2d2ff',
  'Meditação': '#bde0fe',
  'Ansiedade': '#ffafcc',
  'Relaxamento': '#cdb4db',
  'Autoestima': '#ffc8dd',
  'Foco': '#a9d6e5',
  'Bem-estar': '#d4e09b',
  'default': '#e5e5e5',
};

export default function ContentCard({ item }: ContentCardProps) {
  const backgroundColor = categoryColors[item.category] || categoryColors.default;
  const iconName = getContentIcon(item.type as 'audio' | 'text' | 'podcast');

  return (
    <Pressable 
      style={[styles.card, { backgroundColor }]} 
      onPress={() => router.push(`/content/${item.id}`)}
    >
      <View style={styles.textContainer}>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={iconName} size={30} color="#333" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    minHeight: 100,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardCategory: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A4A4A',
    opacity: 0.8,
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  iconContainer: {
    marginLeft: 15,
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});