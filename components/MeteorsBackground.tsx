import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Meteor from './Meteor';

const { width } = Dimensions.get('window');

interface MeteorsBackgroundProps {
  number?: number;
}

const MeteorsBackground: React.FC<MeteorsBackgroundProps> = ({ number = 20 }) => {
  const meteors = new Array(number).fill(true).map((_, idx) => ({
    id: `meteor_${idx}`,
    left: Math.random() * width * 1.5 - (width * 0.25),
    delay: Math.random() * 800 + 200,
    duration: Math.floor(Math.random() * 8000 + 2000),
  }));

  return (
    <View style={styles.container}>
      {meteors.map(meteor => (
        <Meteor
          key={meteor.id}
          delay={meteor.delay}
          duration={meteor.duration}
          left={meteor.left}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    overflow: 'hidden',
  },
});

export default MeteorsBackground;