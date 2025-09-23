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

const CVV_PHONE_NUMBER = "188";

const suggestions = [
  "Quero desabafar",
  "Preciso de dicas",
  "Estou ansioso(a)",
];

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

const initialMessages: Message[] = [
    {
        id: 'welcome-1',
        text: 'Olá! Sou sua companheira de bem-estar. Sinta-se à vontade para compartilhar o que estiver em sua mente.',
        isUser: false,
    }
]

export default function HomeScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const flatListRef = useRef<FlatList>(null);

  const handleEmergencyPress = () => {
    Linking.openURL(`tel:${CVV_PHONE_NUMBER}`);
  };

  const handleSendMessage = () => {
    if (message.trim().length > 0) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        isUser: true,
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
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
    backgroundColor: "#F5F3FF",
  },
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  header: {
    padding: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#4A4A4A",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
  chatArea: {
    flex: 1,
  },
  suggestionsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  suggestionChip: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DCDCDC",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  suggestionText: {
    color: "#6A5ACD",
    fontSize: 14,
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
    height: 40,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#8A2BE2",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    backgroundColor: "#6A5ACD",
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