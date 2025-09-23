import { MaterialCommunityIcons } from '@expo/vector-icons';

export const getContentIcon = (type: 'audio' | 'text' | 'podcast'): keyof typeof MaterialCommunityIcons.glyphMap => {
  switch (type) {
    case 'audio':
      return 'headphones';
    case 'text':
      return 'book-open-variant';
    case 'podcast':
      return 'podcast';
    default:
      return 'star-outline';
  }
};