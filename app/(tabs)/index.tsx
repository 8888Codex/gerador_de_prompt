import React, { useState } from "react";
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
} from "react-native";
import * as Linking from "expo-linking";

const CVV_PHONE_NUMBER = "188";

const suggestions = [
  "Quero desabafar",
  "Preciso de dicas",
  "Estou ansioso(a)",
];

export default function HomeScreen() {
  const [message, setMessage] = useState("");

  const handleEmergencyPress = () => {
    Linking.openURL(`tel:${CVV_PHONE_NUMBER}`);
  };

  const handleSendMessage = () => {
    if (message.trim().length > 0) {
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    console.log("Suggestion selected:", suggestion);
    // Futuramente, isso pode iniciar um fluxo de conversa específico
    setMessage(suggestion);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.greetingText}>Olá, como você está hoje?</Text>
        </View>

        {/* A área de mensagens do chat virá aqui no futuro */}
        <View style={styles.chatArea}></View>

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
    backgroundColor: "#F5F3FF", // Tom de lilás pastel suave
  },
  container: {
    flex: 1,
    paddingBottom: 50, // Espaço para o banner de emergência não sobrepor o input
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
    paddingHorizontal: 10,
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
    backgroundColor: "#8A2BE2", // Um roxo amigável
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
    backgroundColor: "#6A5ACD", // Um tom mais sóbrio para o banner
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