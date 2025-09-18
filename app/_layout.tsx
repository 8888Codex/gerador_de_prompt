import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="prompt-builder" options={{ title: 'Construtor de Prompts', headerShown: false }} />
    </Stack>
  );
}