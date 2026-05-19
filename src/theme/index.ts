import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_GAP = 12;
const CARDS_VISIBLE = 2.3;

// Responsive: always shows 2 full cards + ~30% peek of the 3rd, on any screen size
export const CARD_WIDTH = Math.floor(
  (SCREEN_WIDTH - 20 - (CARDS_VISIBLE - 1) * CARD_GAP) / CARDS_VISIBLE
);

export const Colors = {
  background: '#F9F6F3',
  surface: '#FFFFFF',
  textPrimary: '#1C1A18',
  textSecondary: '#8A8A8A',
  accent: '#83A83D',
  accentPale: '#ECF2E2',
  border: '#F0EBE5',
  tabActive: '#83A83D',
  tabInactive: '#BDBDBD',
  allergenBg: '#ECF2E2',
  allergenText: '#83A83D',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  screen: 20,
};

export const Radius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
};
