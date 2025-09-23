import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#22577A',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="comments" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bem-estar"
        options={{
          title: 'Bem-estar',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="leaf" color={color} />,
        }}
      />
      <Tabs.Screen
        name="sessao"
        options={{
          title: 'Sessão',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-md" color={color} />,
        }}
      />
    </Tabs>
  );
}