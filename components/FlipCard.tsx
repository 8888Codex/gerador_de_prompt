import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Rocket, Code2, ArrowRight, Zap, Copy } from 'lucide-react-native';

export interface FlipCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  color?: string;
}

export default function FlipCard({
  title = 'Construa MVPs Rápido',
  subtitle = 'Lance sua ideia em tempo recorde',
  description = 'Use nossa biblioteca de componentes para lançar seu MVP mais rápido do que nunca.',
  features = [
    'Pronto para Copiar e Colar',
    'Foco no Desenvolvedor',
    'Otimizado para MVP',
  ],
  color = '#3B82F6',
}: FlipCardProps) {
  const rotate = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotate.value, [0, 1], [0, 180]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotate.value, [0, 1], [180, 360]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
    };
  });

  const flipCard = () => {
    rotate.value = withTiming(rotate.value === 0 ? 1 : 0, { duration: 600 });
  };

  const icons = [Copy, Code2, Rocket, Zap];

  return (
    <Pressable onPress={flipCard} style={styles.container}>
      {/* Frente do Cartão */}
      <Animated.View style={[styles.card, styles.cardFront, frontAnimatedStyle]}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Rocket size={32} color="white" />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Toque para ver mais</Text>
        </View>
      </Animated.View>

      {/* Verso do Cartão */}
      <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
        <View style={styles.headerBack}>
          <View style={[styles.iconBackContainer, { backgroundColor: color }]}>
            <Code2 size={20} color="white" />
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <View key={feature} style={styles.featureItem}>
                <View style={[styles.featureIconContainer, { backgroundColor: `${color}20` }]}>
                  <IconComponent size={14} color={color} />
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.footerBack}>
          <Text style={[styles.footerBackText, { color }]}>Comece a Construir</Text>
          <ArrowRight size={16} color={color} />
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 360,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardFront: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardBack: {
    padding: 20,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  headerBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBackContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
  },
  featuresContainer: {
    marginTop: 24,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  footerBack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  footerBackText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});