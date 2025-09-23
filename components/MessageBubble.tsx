import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type MessageBubbleProps = {
  text: string;
  isUser: boolean;
};

export default function MessageBubble({ text, isUser }: MessageBubbleProps) {
  return (
    <View style={[
      styles.container,
      isUser ? styles.userContainer : styles.botContainer
    ]}>
      <Text style={isUser ? styles.userText : styles.botText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    marginBottom: 10,
    maxWidth: '80%',
  },
  userContainer: {
    backgroundColor: '#22577A',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  botContainer: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  botText: {
    color: '#4A4A4A',
    fontSize: 16,
  },
});