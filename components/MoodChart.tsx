import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

type MoodOption = {
  icon: any;
  label: string;
};
type MoodEntry = {
  mood: MoodOption;
  timestamp: Date;
};

type MoodChartProps = {
  data: MoodEntry[];
};

const moodValues: { [key: string]: number } = {
  'Feliz': 5,
  'Relaxado': 4,
  'Neutro': 3,
  'Irritado': 2,
  'Triste': 1,
};

const CHART_HEIGHT = 150;
const CHART_WIDTH = Dimensions.get('window').width - 80;

const dayLabels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export default function MoodChart({ data }: MoodChartProps) {
  if (data.length < 2) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Registre pelo menos dois humores para ver seu gráfico de evolução.</Text>
      </View>
    );
  }

  const points = data
    .slice(0, 14)
    .reverse()
    .map(entry => ({
      value: moodValues[entry.mood.label] || 0,
      date: new Date(entry.timestamp),
    }));

  const maxValue = 5;
  const minValue = 1;

  const getX = (index: number) => (index / (points.length - 1)) * CHART_WIDTH;
  const getY = (value: number) => CHART_HEIGHT - ((value - minValue) / (maxValue - minValue)) * CHART_HEIGHT;

  const linePath = points
    .map((point, index) => {
      const x = getX(index);
      const y = getY(point.value);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const areaPath = `${linePath} V ${CHART_HEIGHT} H 0 Z`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Evolução do Humor</Text>
          <Text style={styles.subtitle}>Últimos {points.length} registros</Text>
        </View>
      </View>
      <View style={{ height: CHART_HEIGHT, width: CHART_WIDTH, alignSelf: 'center' }}>
        <Svg height="100%" width="100%">
          <Defs>
            <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
              <Stop offset="0%" stopColor="#8A2BE2" stopOpacity={0.4} />
              <Stop offset="100%" stopColor="#F5F3FF" stopOpacity={0.1} />
            </LinearGradient>
          </Defs>
          <Path d={areaPath} fill="url(#gradient)" />
          <Path d={linePath} fill="none" stroke="#8A2BE2" strokeWidth={3} />
        </Svg>
      </View>
      <View style={styles.labelsContainer}>
        {points.map((point, index) => (
          <Text key={index} style={styles.label}>
            {dayLabels[point.date.getDay()]}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: CHART_WIDTH,
    alignSelf: 'center',
    marginTop: 10,
  },
  label: {
    fontSize: 12,
    color: '#888',
    width: 20,
    textAlign: 'center',
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});