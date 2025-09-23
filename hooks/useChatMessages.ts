import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBotResponse } from '../data/botResponses';

export type Message = {
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
];

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem('chatMessages');
        if (storedMessages !== null) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.error('Failed to load messages.', error);
      }
    };
    loadMessages();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem('chatMessages', JSON.stringify(messages));
      } catch (error) {
        console.error('Failed to save messages.', error);
      }
    };
    saveMessages();
  }, [messages]);

  const sendMessage = (text: string) => {
    if (text.trim().length === 0) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      isUser: true,
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botText = getBotResponse(text);
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        text: botText,
        isUser: false,
      };
      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  return { messages, isTyping, sendMessage };
}