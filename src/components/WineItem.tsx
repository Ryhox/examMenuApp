import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { WineItem as WineItemType } from '../data/types';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { formatPrice, formatPriceVariants } from '../utils/formatPrice';
import AllergenBadges from './AllergenBadges';
import { Colors, Spacing, Radius } from '../theme';

const SECTION_ICON_COLORS: Record<string, string> = {
  sparkling: Colors.accentPale,
  white: Colors.accentPale,
  red: Colors.accentPale,
};

interface Props {
  item: WineItemType;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  sectionId?: string;
}

export default function WineItem({ item, navigation, sectionId }: Props) {
  const { t } = useTranslation();
  const name = t(item.nameKey);
  const glassPrice = item.prices.glass;
  const bottlePrices = { ...item.prices };
  delete (bottlePrices as any).glass;
  const hasBottle = Object.keys(bottlePrices).length > 0;
  
  const iconBg = (sectionId && SECTION_ICON_COLORS[sectionId]) ?? Colors.accentPale;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ItemDetail', { itemId: item.id, category: 'wine' })}
      activeOpacity={0.75}
    >
      <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
        <Ionicons name="wine-outline" size={22} color={Colors.accent} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subtitle}>{item.producer} — {item.appellation}</Text>
        <AllergenBadges allergens={item.allergens} />
      </View>
      <View style={styles.priceCol}>
        {hasBottle && (
          <Text style={styles.priceMain}>
            {formatPriceVariants(bottlePrices, t('price.bottle'))}
          </Text>
        )}
        {glassPrice !== undefined && (
          <Text style={styles.priceGlass}>
            {t('price.glass')} {formatPrice(glassPrice)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.screen,
    marginVertical: 5,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    flexShrink: 0,
  },
  info: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: 0.1,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  priceCol: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  priceMain: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.accent,
    textAlign: 'right',
  },
  priceGlass: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: 'right',
  },
});
