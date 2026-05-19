import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DrinkItem as DrinkItemType, PriceVariants } from '../data/types';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { formatPrice } from '../utils/formatPrice';
import AllergenBadges from './AllergenBadges';
import { Colors, Spacing, Radius } from '../theme';

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
  item: DrinkItemType;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  sectionId?: string;
}

export default function DrinkItem({ item, navigation, sectionId }: Props) {
  const { t } = useTranslation();
  const name = t(item.nameKey);
  const isFlat = typeof item.prices === 'number';
  const iconName: IoniconName = (sectionId ? SECTION_ICONS[sectionId] : undefined) ?? 'cafe-outline';
  const iconBg = (sectionId ? SECTION_COLORS[sectionId] : undefined) ?? Colors.accentPale;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ItemDetail', { itemId: item.id, category: 'drinks' })}
      activeOpacity={0.75}
    >
      <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
        <Ionicons name={iconName} size={22} color={Colors.accent} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        {!isFlat && (
          <Text style={styles.variants}>
            {Object.entries(item.prices as PriceVariants)
              .filter(([, v]) => v !== undefined)
              .map(([k, v]) => `${k} ${formatPrice(v as number)}`)
              .join(' · ')}
          </Text>
        )}
        <AllergenBadges allergens={item.allergens} />
      </View>
      {isFlat && (
        <Text style={styles.price}>{formatPrice(item.prices as number)}</Text>
      )}
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
  variants: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 17,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.accent,
    flexShrink: 0,
  },
});
