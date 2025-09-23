import { Stack } from 'expo-router';

export default function ContentLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#22577A',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitle: 'Voltar',
      }}
    />
  );
}