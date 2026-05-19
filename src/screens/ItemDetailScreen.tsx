import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { menuSections } from '../data/menu';
import { drinkSections } from '../data/drinks';
import { wineSections } from '../data/wines';
import type { MenuItem, DrinkItem, WineItem, PriceVariants } from '../data/types';
import AllergenList from '../components/AllergenList';
import type { AllergenCode } from '../data/allergens';
import { formatPrice } from '../utils/formatPrice';
import { Colors, Spacing, Radius } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ItemDetail'>;

function findItem(itemId: string, category: 'menu' | 'drinks' | 'wine') {
  if (category === 'menu') {
    for (const section of menuSections) {
      const found = section.items.find((i) => i.id === itemId);
      if (found) return { type: 'menu' as const, item: found };
    }
  } else if (category === 'drinks') {
    for (const section of drinkSections) {
      const found = section.items.find((i) => i.id === itemId);
      if (found) return { type: 'drinks' as const, item: found };
    }
  } else {
    for (const section of wineSections) {
      const found = section.items.find((i) => i.id === itemId);
      if (found) return { type: 'wine' as const, item: found };
    }
  }
  return null;
}

const CATEGORY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  menu: 'restaurant-outline',
  drinks: 'cafe-outline',
  wine: 'wine-outline',
};

export default function ItemDetailScreen({ route, navigation }: Props) {
  const { itemId, category } = route.params;
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [isFavorite, setIsFavorite] = useState(false);

  const result = findItem(itemId, category);

  if (!result) {
    return (
      <View style={styles.container}>
        <Text>Item not found</Text>
      </View>
    );
  }

  const { type, item } = result;

  let name = '';
  let description: string | undefined;
  let allergens: AllergenCode[] = [];
  let extraInfo: string | undefined;
  let prices: { label: string; price: number }[] = [];

  if (type === 'menu') {
    const m = item as MenuItem;
    name = t(m.nameKey);
    description = m.descriptionKey ? t(m.descriptionKey) : undefined;
    allergens = m.allergens;
    prices = [{ label: '1x', price: m.price }];
  } else if (type === 'drinks') {
    const d = item as DrinkItem;
    name = t(d.nameKey);
    allergens = d.allergens;
    if (typeof d.prices === 'number') {
      prices = [{ label: '1x', price: d.prices }];
    } else {
      prices = Object.entries(d.prices).map(([k, v]) => ({
        label: t(`price.${k}`) ?? k,
        price: v,
      }));
    }
  } else {
    const w = item as WineItem;
    name = t(w.nameKey);
    allergens = w.allergens;
    extraInfo = `${w.producer} — ${w.appellation}`;
    const wPrices: { label: string; price: number }[] = [];
    if (w.prices.glass) wPrices.push({ label: t('price.glass'), price: w.prices.glass });
    const bottlePrices = { ...w.prices };
    delete (bottlePrices as any).glass;
    Object.entries(bottlePrices).forEach(([k, v]) => {
      wPrices.push({ label: `${t('price.bottle')} ${k}`, price: v });
    });
    prices = wPrices;
  }

  const mainPrice = prices.length > 0 ? prices[0].price : 0;
  const iconName = CATEGORY_ICONS[type];

  return (
    <View style={styles.container}>
      {/* HEADER SECTION */}
      <View style={[styles.headerContainer, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Ionicons name="chevron-back" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.heroArea}>
        <Ionicons name={iconName} size={65} color={Colors.accent} />
      </View>

      {/* CONTENT SHEET */}
      <View style={styles.sheet}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.sheetScroll, { paddingBottom: insets.bottom + 80 }]}
        >
          <Text style={styles.name}>{name}</Text>

          {/* Restaurant & Price Info Row */}
          <View style={styles.infoRow}>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Restaurant</Text>
              <Text style={styles.infoValue}>Campedèl-Hof</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Price</Text>
              <Text style={styles.priceValue}>{formatPrice(mainPrice)}</Text>
            </View>
          </View>

          {/* Variants / Size */}
          {prices.length > 1 && (
            <View style={styles.variantsSection}>
              <Text style={styles.infoLabel}>Size / Options</Text>
              <View style={styles.pillRow}>
                {prices.map((p, idx) => (
                  <View key={idx} style={styles.pill}>
                    <Text style={styles.pillText}>{p.label}</Text>
                    <Text style={styles.pillPrice}>{formatPrice(p.price)}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {extraInfo && (
            <Text style={styles.description}>{extraInfo}</Text>
          )}

          {description && (
            <Text style={styles.description}>{description}</Text>
          )}

          {allergens.length > 0 && (
            <View style={styles.allergenSection}>
              <Text style={styles.allergenLabel}>{t('allergen.label')}</Text>
              <AllergenList allergens={allergens} />
            </View>
          )}

          <Text style={styles.vatNote}>{t('detail.vatNote')}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDEADD', // Matching the image's top background tone
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screen,
    zIndex: 10,
  },
  headerBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  heroArea: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheet: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  sheetScroll: {
    paddingHorizontal: Spacing.screen,
    paddingTop: 32,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 40,
  },
  infoCol: {
    flexDirection: 'column',
    gap: 4,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.accent,
  },
  variantsSection: {
    marginBottom: 24,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 10,
  },
  pill: {
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: Radius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pillText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  pillPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.accent,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  allergenSection: {
    marginTop: 8,
  },
  allergenLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  vatNote: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: Spacing.xl,
    fontStyle: 'italic',
  },
});
