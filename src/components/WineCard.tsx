import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { WineItem } from '../data/types';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { formatPrice, formatPriceVariants } from '../utils/formatPrice';
import { Colors, Radius } from '../theme';

const SECTION_COLORS: Record<string, string> = {
  sparkling: Colors.accentPale,
  white: Colors.accentPale,
  red: Colors.accentPale,
};

interface Props {
  item: WineItem;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  sectionId?: string;
}

export default function WineCard({ item, navigation, sectionId }: Props) {
  const { t } = useTranslation();
  const name = t(item.nameKey);
  const iconBg = (sectionId ? SECTION_COLORS[sectionId] : undefined) ?? Colors.accentPale;

  const bottlePrices = { ...item.prices };
  delete (bottlePrices as any).glass;
  const hasBottle = Object.keys(bottlePrices).length > 0;

  let priceDisplay: string;
  if (hasBottle) {
    priceDisplay = formatPriceVariants(bottlePrices, t('price.bottle'));
  } else if (item.prices.glass !== undefined) {
    priceDisplay = `${t('price.glass')} ${formatPrice(item.prices.glass)}`;
  } else {
    priceDisplay = '—';
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ItemDetail', { itemId: item.id, category: 'wine' })}
      activeOpacity={0.8}
    >
      <View style={[styles.imageArea, { backgroundColor: iconBg }]}>
        <Ionicons name="wine-outline" size={46} color={Colors.accent} />
      </View>
      <Text style={styles.name} numberOfLines={2}>{name}</Text>
      <Text style={styles.subtitle} numberOfLines={1}>{item.producer}</Text>
      <View style={styles.footer}>
        <Text style={styles.price} numberOfLines={1}>{priceDisplay}</Text>
      </View>
    </TouchableOpacity>
  );
}

const CARD_WIDTH = 158;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageArea: {
    width: '100%',
    height: 114,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 19,
    marginBottom: 2,
    minHeight: 38,
  },
  subtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.accent,
    textAlign: 'right',
  },
});
