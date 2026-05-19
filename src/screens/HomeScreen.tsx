import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import AppHeader from '../components/AppHeader';
import PromoCard from '../components/PromoCard';
import { Colors, Spacing, Radius } from '../theme';

type TabParamList = {
  Home: undefined;
  Menu: undefined;
  Drinks: undefined;
  Wine: undefined;
};
type Nav = BottomTabNavigationProp<TabParamList>;

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const SECTION_TITLE: Record<string, string> = {
  de: 'Unsere Karten',
  it: 'Le nostre Carte',
  en: 'Our Menus',
};

const ABOUT_TEXT: Record<string, string> = {
  de: 'Hausgemachte Südtiroler Spezialitäten, liebevoll zubereitet mit frischen Produkten vom eigenen Bauernhof.',
  it: 'Specialità tradizionali fatte in casa, preparate con amore utilizzando i prodotti freschi del nostro maso.',
  en: 'Homemade South Tyrolean specialties, lovingly prepared with fresh products from our own farm.',
};

interface Category {
  tab: keyof TabParamList;
  icon: IoniconName;
  bg: string;
  labelKey: string;
  sub: Record<string, string>;
}

const CATEGORIES: Category[] = [
  {
    tab: 'Menu',
    icon: 'restaurant-outline',
    bg: Colors.accentPale,
    labelKey: 'nav.menu',
    sub: { de: '6 Gänge · 27 Gerichte', it: '6 portate · 27 piatti', en: '6 courses · 27 dishes' },
  },
  {
    tab: 'Drinks',
    icon: 'cafe-outline',
    bg: Colors.accentPale,
    labelKey: 'nav.drinks',
    sub: { de: '5 Kategorien · 34 Getränke', it: '5 categorie · 34 bevande', en: '5 categories · 34 drinks' },
  },
  {
    tab: 'Wine',
    icon: 'wine-outline',
    bg: Colors.accentPale,
    labelKey: 'nav.wine',
    sub: { de: 'Südtiroler Auslese · 26 Weine', it: 'Selezione locale · 26 vini', en: 'Local selection · 26 wines' },
  },
];

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<Nav>();
  const lang = i18n.language;

  return (
    <View style={styles.screen}>
      <AppHeader />
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="never"
    >
      <PromoCard />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {SECTION_TITLE[lang] ?? SECTION_TITLE.de}
        </Text>

        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.tab}
            style={styles.navCard}
            onPress={() => navigation.navigate(cat.tab)}
            activeOpacity={0.75}
          >
            <View style={[styles.iconBox, { backgroundColor: cat.bg }]}>
              <Ionicons name={cat.icon} size={26} color={Colors.accent} />
            </View>
            <View style={styles.navInfo}>
              <Text style={styles.navTitle}>{t(cat.labelKey)}</Text>
              <Text style={styles.navSub}>
                {cat.sub[lang] ?? cat.sub.de}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.border} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutText}>
          {ABOUT_TEXT[lang] ?? ABOUT_TEXT.de}
        </Text>
      </View>

      <View style={styles.bottomPad} />
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  section: {
    paddingHorizontal: Spacing.screen,
    paddingTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  navCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
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
  },
  navInfo: {
    flex: 1,
  },
  navTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  navSub: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  aboutSection: {
    paddingHorizontal: Spacing.screen,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    alignItems: 'center',
  },
  aboutText: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  bottomPad: {
    height: 24,
  },
});
