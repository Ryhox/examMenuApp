import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import AppHeader from '../components/AppHeader';
import PromoCard from '../components/PromoCard';
import { useData } from '../context/DataContext';
import { Colors, Spacing, Radius } from '../theme';

type TabParamList = {
  Home: undefined;
  Menu: undefined;
  Drinks: undefined;
  Wine: undefined;
};
type Nav = BottomTabNavigationProp<TabParamList>;

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface Category {
  tab: keyof TabParamList;
  icon: IoniconName;
  labelKey: string;
  countKey: string;
  getCounts: (data: ReturnType<typeof useData>) => { secs: number; items: number } | null;
}

const CATEGORIES: Category[] = [
  {
    tab: 'Menu',
    icon: 'restaurant-outline',
    labelKey: 'nav.menu',
    countKey: 'home.count.menu',
    getCounts: d => {
      const secs = d.menu.length;
      const items = d.menu.reduce((n, s) => n + s.items.length, 0);
      return items > 0 ? { secs, items } : null;
    },
  },
  {
    tab: 'Drinks',
    icon: 'cafe-outline',
    labelKey: 'nav.drinks',
    countKey: 'home.count.drinks',
    getCounts: d => {
      const secs = d.drinks.length;
      const items = d.drinks.reduce((n, s) => n + s.items.length, 0);
      return items > 0 ? { secs, items } : null;
    },
  },
  {
    tab: 'Wine',
    icon: 'wine-outline',
    labelKey: 'nav.wine',
    countKey: 'home.count.wine',
    getCounts: d => {
      const secs = d.wines.length;
      const items = d.wines.reduce((n, s) => n + s.wines.length, 0);
      return items > 0 ? { secs, items } : null;
    },
  },
];

export default function HomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const data = useData();

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
          <Text style={styles.sectionTitle}>{t('home.sectionTitle')}</Text>

          {CATEGORIES.map(cat => {
            const counts = cat.getCounts(data);
            const sub = counts ? t(cat.countKey, counts) : '…';
            return (
              <TouchableOpacity
                key={cat.tab}
                style={styles.navCard}
                onPress={() => navigation.navigate(cat.tab)}
                activeOpacity={0.75}
              >
                <View style={[styles.iconBox, { backgroundColor: Colors.accentPale }]}>
                  <Ionicons name={cat.icon} size={26} color={Colors.accent} />
                </View>
                <View style={styles.navInfo}>
                  <Text style={styles.navTitle}>{t(cat.labelKey)}</Text>
                  <Text style={styles.navSub}>{sub}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.border} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.aboutText}>{t('home.about')}</Text>
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
