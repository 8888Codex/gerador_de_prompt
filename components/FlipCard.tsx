import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  withRepeat,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Rocket, Code2, ArrowRight, Zap, Copy } from 'lucide-react-native';

export interface FlipCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  color?: string;
  onPress?: () => void;
}

const AnimatedCodeLine = ({ delay, width, marginLeft }: { delay: number, width: string, marginLeft: string }) => {
  const translateX = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const animation = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming({ transform: [{ translateX: 0 }], opacity: 0.8 }, { duration: 800 }),
          withTiming({ transform: [{ translateX: 100 }], opacity: 0 }, { duration: 800 })
        ),
        -1,
        false
      )
    );
    translateX.value = animation;
    opacity.value = animation;
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
    };
  });

  return <Animated.View style={[styles.codeLine, { width, marginLeft }, animatedStyle]} />;
};

export default function FlipCard({
  title = 'Construa MVPs Rápido',
  subtitle = 'Lance sua ideia em tempo recorde',
  description = 'Use nossa biblioteca de componentes para lançar seu MVP mais rápido do que nunca.',
  features = [
    'Pronto para Copiar e Colar',
    'Foco no Desenvolvedor',
    'Otimizado para MVP',
  ],
  color = '#ff2e88',
  onPress,
}: FlipCardProps) {
  const rotate = useSharedValue(0);
  const rocketScale = useSharedValue(1);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotate.value, [0, 1], [0, 180]);
    return { transform: [{ rotateY: `${rotateY}deg` }] };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotate.value, [0, 1], [180, 360]);
    return { transform: [{ rotateY: `${rotateY}deg` }] };
  });

  const rocketAnimatedStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: rocketScale.value }] };
  });

  useEffect(() => {
    rocketScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const flipCard = () => {
    rotate.value = withTiming(rotate.value === 0 ? 1 : 0, { duration: 700 });
  };

  const icons = [Copy, Code2, Rocket, Zap];

  return (
    <Pressable onPress={flipCard} style={styles.container}>
      {/* Frente do Cartão */}
      <Animated.View style={[styles.card, frontAnimatedStyle]}>
        <LinearGradient colors={['#FFFFFF', '#F8FAFC', '#F1F5F9']} style={styles.gradient}>
          <View style={styles.codeBlocksContainer}>
            {[...Array(6)].map((_, i) => (
              <AnimatedCodeLine
                key={i}
                delay={i * 200}
                width={`${60 + Math.random() * 40}%`}
                marginLeft={`${Math.random() * 20}%`}
              />
            ))}
            <Animated.View style={[styles.rocketContainer, { backgroundColor: color }, rocketAnimatedStyle]}>
              <Rocket size={28} color="white" />
            </Animated.View>
          </View>
          <View style={styles.bottomContent}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <Zap size={20} color={color} />
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Verso do Cartão */}
      <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
        <LinearGradient colors={['#FFFFFF', '#F8FAFC', '#F1F5F9']} style={styles.gradient}>
          <View>
            <View style={styles.headerBack}>
              <View style={[styles.iconBackContainer, { backgroundColor: color }]}>
                <Code2 size={18} color="white" />
              </View>
              <Text style={styles.title}>{title}</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
          </View>
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
          <TouchableOpacity onPress={onPress} style={styles.footerBack}>
            <Text style={[styles.footerBackText, { color }]}>Comece a Construir</Text>
            <ArrowRight size={16} color={color} />
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { width: 300, height: 360 },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
  },
  cardBack: {
    justifyContent: 'space-between',
  },
  codeBlocksContainer: {
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeLine: {
    height: 10,
    borderRadius: 4,
    backgroundColor: '#ff2e8830',
    marginVertical: 3,
  },
  rocketContainer: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '30%',
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  subtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  headerBack: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  iconBackContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  description: { fontSize: 15, color: '#4B5563', lineHeight: 22 },
  featuresContainer: { gap: 12 },
  featureItem: { flexDirection: 'row', alignItems: 'center' },
  featureIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  featureText: { fontSize: 14, fontWeight: '500', color: '#374151' },
  footerBack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  footerBackText: { fontSize: 16, fontWeight: 'bold' },
});