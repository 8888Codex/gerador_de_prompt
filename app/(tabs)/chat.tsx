import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";
import * as Linking from "expo-linking";
import MessageBubble from "../../components/MessageBubble";
import TypingIndicator from "../../components/TypingIndicator";
import { useChatMessages, Message } from "../../hooks/useChatMessages";

const CVV_PHONE_NUMBER = "188";

const suggestions = [
  "Quero desabafar",
  "Preciso de dicas",
  "Estou ansioso(a)",
];

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const { messages, isTyping, sendMessage } = useChatMessages();
  const flatListRef = useRef<FlatList<Message>>(null);

  const handleEmergencyPress = () => {
    Linking.openURL(`tel:${CVV_PHONE_NUMBER}`);
  };

  const handleSendMessage = () => {
    if (message.trim().length > 0) {
      sendMessage(message);
      setMessage("");
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.greetingText}>Olá, como você está hoje?</Text>
        </View>

        <View style={styles.chatArea}>
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={({ item }) => <MessageBubble text={item.text} isUser={item.isUser} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />
            {isTyping && <TypingIndicator />}
        </View>

        <View style={styles.suggestionsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {suggestions.map((item, index) => (
              <Pressable
                key={index}
                style={styles.suggestionChip}
                onPress={() => handleSuggestionPress(item)}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#999"
            onSubmitEditing={handleSendMessage}
          />
          <Pressable style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      <Pressable style={styles.emergencyBanner} onPress={handleEmergencyPress}>
        <Text style={styles.emergencyText}>
          Precisa de ajuda urgente? Ligue 188 (CVV)
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4A4A4A",
  },
  chatArea: {
    flex: 1,
  },
  suggestionsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  suggestionChip: {
    backgroundColor: "rgba(34, 87, 122, 0.1)",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "rgba(34, 87, 122, 0.2)",
  },
  suggestionText: {
    color: "#22577A",
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    height: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginRight: 10,
    borderColor: '#DCDCDC',
    borderWidth: 1,
  },
  sendButton: {
    backgroundColor: "#22577A",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  emergencyBanner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#22577A",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  emergencyText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});