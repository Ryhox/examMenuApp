import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DrinkItem, PriceVariants } from '../data/types';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { formatPrice } from '../utils/formatPrice';
import { Colors, Radius } from '../theme';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const SECTION_ICONS: Record<string, IoniconName> = {
  'hot-drinks': 'cafe-outline',
  'soft-drinks': 'water-outline',
  'beer': 'beer-outline',
  'aperitif': 'wine-outline',
  'digestif': 'flask-outline',
};

const SECTION_COLORS: Record<string, string> = {
  'hot-drinks': Colors.accentPale,
  'soft-drinks': Colors.accentPale,
  'beer': Colors.accentPale,
  'aperitif': Colors.accentPale,
  'digestif': Colors.accentPale,
};

interface Props {
  item: DrinkItem;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  sectionId?: string;
}

export default function DrinkCard({ item, navigation, sectionId }: Props) {
  const { t } = useTranslation();
  const name = t(item.nameKey);
  const iconName: IoniconName = (sectionId ? SECTION_ICONS[sectionId] : undefined) ?? 'cafe-outline';
  const iconBg = (sectionId ? SECTION_COLORS[sectionId] : undefined) ?? Colors.accentPale;

  let priceDisplay: string;
  if (typeof item.prices === 'number') {
    priceDisplay = formatPrice(item.prices);
  } else {
    const vals = Object.values(item.prices as PriceVariants).filter(Boolean) as number[];
    const min = Math.min(...vals);
    priceDisplay = `ab ${formatPrice(min)}`;
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ItemDetail', { itemId: item.id, category: 'drinks' })}
      activeOpacity={0.8}
    >
      <View style={[styles.imageArea, { backgroundColor: iconBg }]}>
        <Ionicons name={iconName} size={46} color={Colors.accent} />
      </View>
      <Text style={styles.name} numberOfLines={2}>{name}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>{priceDisplay}</Text>
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
    marginBottom: 3,
    minHeight: 38,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.accent,
  },
});
