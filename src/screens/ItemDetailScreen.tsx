import React, { useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useData } from '../context/DataContext';
import { resolveImageUrl, localName, parseDrinkPrices } from '../services/api';
import type { ApiMenuItem, ApiDrinkItem, ApiWineItem } from '../services/api';
import AllergenList from '../components/AllergenList';
import type { AllergenCode } from '../data/allergens';
import { formatPrice } from '../utils/formatPrice';
import { Colors, Spacing, Radius } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ItemDetail'>;

const { height: SCREEN_H } = Dimensions.get('window');
const HERO_H = Math.min(320, Math.round(SCREEN_H * 0.42));
const SHEET_OVERLAP = 40;

export default function ItemDetailScreen({ route, navigation }: Props) {
  const { itemId, category } = route.params;
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const lang = i18n.language;
  const { menu, drinks, wines } = useData();

  // Close detail when user switches tabs
  const wasRemovedRef = useRef(false);
  useEffect(() => {
    const unsub = navigation.addListener('beforeRemove', () => {
      wasRemovedRef.current = true;
    });
    return unsub;
  }, [navigation]);
  useFocusEffect(
    useCallback(() => {
      wasRemovedRef.current = false;
      return () => {
        if (!wasRemovedRef.current) {
          navigation.goBack();
        }
      };
    }, [navigation])
  );

  let found:
    | { type: 'menu'; item: ApiMenuItem }
    | { type: 'drinks'; item: ApiDrinkItem }
    | { type: 'wine'; item: ApiWineItem }
    | null = null;

  if (category === 'menu') {
    for (const s of menu) {
      const item = s.items.find(i => i.id === itemId);
      if (item) { found = { type: 'menu', item }; break; }
    }
  } else if (category === 'drinks') {
    for (const s of drinks) {
      const item = s.items.find(i => i.id === itemId);
      if (item) { found = { type: 'drinks', item }; break; }
    }
  } else {
    for (const s of wines) {
      const item = s.wines.find(w => w.id === itemId);
      if (item) { found = { type: 'wine', item }; break; }
    }
  }

  if (!found) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <TouchableOpacity style={[styles.backBtn, { margin: 16 }]} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.center}>
          <Ionicons name="search-outline" size={40} color={Colors.textSecondary} />
          <Text style={styles.notFoundText}>{t('detail.notFound')}</Text>
        </View>
      </View>
    );
  }

  const { type, item } = found;

  let name = '';
  let description: string | undefined;
  let allergens: AllergenCode[] = [];
  let imageUrl: string | null = null;
  let prices: { label: string; price: number }[] = [];
  let extraRows: { label: string; value: string }[] = [];
  let isVegetarian = false;
  let isVegan = false;
  let grapes: string[] = [];

  if (type === 'menu') {
    const m = item as ApiMenuItem;
    name = localName(m.name, lang);
    description = localName(m.description, lang) || undefined;
    allergens = m.allergens as AllergenCode[];
    imageUrl = m.imageUrl;
    prices = [{ label: '1×', price: m.price }];
    isVegetarian = m.isVegetarian;
    isVegan = m.isVegan;
  } else if (type === 'drinks') {
    const d = item as ApiDrinkItem;
    name = localName(d.name, lang);
    imageUrl = d.imageUrl;
    prices = parseDrinkPrices(d.prices);
  } else {
    const w = item as ApiWineItem;
    name = w.name;
    description =
      w.description[lang as keyof typeof w.description] ||
      w.description.de ||
      w.description.it ||
      undefined;
    imageUrl = w.imageUrl;
    grapes = w.grapes ?? [];
    if (w.winery) extraRows.push({ label: t('detail.winery'), value: w.winery });
    if (w.region) extraRows.push({ label: t('detail.region'), value: w.region });
    if (w.doc) extraRows.push({ label: t('detail.doc'), value: w.doc });
    if (w.dryness) extraRows.push({ label: t('detail.style'), value: t(`wine.dryness.${w.dryness.toLowerCase()}`, { defaultValue: w.dryness }) });
    const wPrices: { label: string; price: number }[] = [];
    if (w.prices.glass != null) wPrices.push({ label: t('price.glass'), price: w.prices.glass });
    if (w.prices.bottle != null) wPrices.push({ label: t('price.bottle'), price: w.prices.bottle });
    if (w.prices.carafe != null) wPrices.push({ label: t('price.carafe'), price: w.prices.carafe });
    prices = wPrices;
  }

  const mainPrice = prices.length > 0 ? prices[0].price : 0;
  const imgUri = resolveImageUrl(imageUrl);

  const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
    menu: 'restaurant-outline',
    drinks: 'cafe-outline',
    wine: 'wine-outline',
  };
  const iconName = ICON_MAP[type];

  return (
    <View style={styles.container}>
      {/* Fixed hero image — stays behind scrolling sheet */}
      {imgUri ? (
        <Image
          source={imgUri}
          style={[styles.heroImage, { height: HERO_H }]}
          contentFit="cover"
          transition={250}
          cachePolicy="memory-disk"
        />
      ) : (
        <View style={[styles.heroFallback, { height: HERO_H, paddingTop: insets.top + 44 }]}>
          <Ionicons name={iconName} size={80} color={Colors.accent} />
        </View>
      )}

      {/* Fixed back button overlay */}
      <View style={[styles.headerOverlay, { top: insets.top + 8 }]} pointerEvents="box-none">
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Ionicons name="chevron-back" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* ScrollView over entire screen — white sheet slides up over image */}
      <ScrollView
        style={StyleSheet.absoluteFill}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: HERO_H - SHEET_OVERLAP, paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={Platform.OS === 'ios' ? false : undefined}
        overScrollMode={Platform.OS === 'android' ? 'never' : undefined}
      >
        {/* White sheet with rounded top — slides over fixed image when scrolled */}
        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />

          <View style={styles.nameRow}>
            <Text style={styles.name}>{name}</Text>
            {isVegan && (
              <View style={[styles.tag, styles.tagVegan]}>
                <Text style={styles.tagText}>{t('badge.vegan')}</Text>
              </View>
            )}
            {!isVegan && isVegetarian && (
              <View style={[styles.tag, styles.tagVeg]}>
                <Text style={styles.tagText}>{t('badge.vegetarian')}</Text>
              </View>
            )}
          </View>

          {mainPrice > 0 && (
            <View style={styles.infoRow}>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>{t('detail.price')}</Text>
                <Text style={styles.priceValue}>{formatPrice(mainPrice)}</Text>
              </View>
            </View>
          )}

          {prices.length > 1 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>{t('detail.sizes')}</Text>
              <View style={styles.pillRow}>
                {prices.map((p, idx) => (
                  <View key={idx} style={styles.pill}>
                    {!!p.label && <Text style={styles.pillText}>{p.label}</Text>}
                    <Text style={styles.pillPrice}>{formatPrice(p.price)}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {extraRows.length > 0 && (
            <View style={styles.section}>
              {extraRows.map(row => (
                <View key={row.label} style={styles.extraRow}>
                  <Text style={styles.extraLabel}>{row.label}</Text>
                  <Text style={styles.extraValue}>{row.value}</Text>
                </View>
              ))}
            </View>
          )}

          {grapes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>{t('detail.grapes')}</Text>
              <Text style={styles.grapeText}>{grapes.join(' · ')}</Text>
            </View>
          )}

          {!!description && (
            <View style={styles.section}>
              <Text style={styles.description}>{description}</Text>
            </View>
          )}

          {allergens.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>{t('allergen.label')}</Text>
              <AllergenList allergens={allergens} />
            </View>
          )}

          <Text style={styles.vatNote}>{t('detail.vatNote')}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  notFoundText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  heroFallback: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FDEADD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerOverlay: {
    position: 'absolute',
    left: 16,
    zIndex: 20,
  },
  backBtn: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  scrollContent: {
    backgroundColor: 'transparent',
  },
  sheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: Spacing.screen,
    paddingTop: 16,
    paddingBottom: 24,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginBottom: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  name: {
    flex: 1,
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  tag: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  tagVegan: {
    backgroundColor: '#4CAF50',
  },
  tagVeg: {
    backgroundColor: '#8BC34A',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
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
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
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
  extraRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  extraLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  extraValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'right',
    flex: 1,
    paddingLeft: 16,
  },
  grapeText: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  vatNote: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: Spacing.xl,
    fontStyle: 'italic',
  },
});
