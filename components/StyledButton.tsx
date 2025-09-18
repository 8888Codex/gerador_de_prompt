import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface StyledButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({ title, onPress, disabled = false }) => {
  const buttonStyle: ViewStyle[] = [styles.button, styles.primaryButton];
  const textStyle: TextStyle[] = [styles.text, styles.primaryText];

  if (disabled) {
    buttonStyle.push(styles.disabledButton);
    textStyle.push(styles.disabledText);
  }

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#3B82F6', // Blue
  },
  disabledButton: {
    backgroundColor: '#9CA3AF', // Gray
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryText: {
    color: 'white',
  },
  disabledText: {
    color: '#E5E7EB',
  },
});

export default StyledButton;