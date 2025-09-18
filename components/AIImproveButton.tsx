import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface AIImproveButtonProps {
  onPress: () => void;
  loading?: boolean;
}

const AIImproveButton: React.FC<AIImproveButtonProps> = ({ onPress, loading = false }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading}>
      {loading ? (
        <ActivityIndicator color="#3B82F6" />
      ) : (
        <Text style={styles.icon}>🪄</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  icon: {
    fontSize: 20,
  },
});

export default AIImproveButton;