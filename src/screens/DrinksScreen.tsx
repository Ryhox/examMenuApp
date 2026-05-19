import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../context/DataContext';
import { localName } from '../services/api';
import type { RootStackParamList } from '../navigation/AppNavigator';
import AppHeader from '../components/AppHeader';
import DrinkCard from '../components/DrinkCard';
import SortDropdown from '../components/SortDropdown';
import HorizontalFadeScroll from '../components/HorizontalFadeScroll';
import { Colors, Spacing, Radius } from '../theme';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const SEARCH_PLACEHOLDER: Record<string, string> = {
  de: 'Getränke suchen…',
  it: 'Cerca bevande…',
  en: 'Search drinks…',
};

const ALL_LABEL: Record<string, string> = { de: 'Alle', it: 'Tutti', en: 'All' };

export default function DrinksScreen() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<Nav>();
  const lang = i18n.language;
  const [activeFilter, setActiveFilter] = useState('');
  const [search, setSearch] = useState('');
  const { drinks, loading, error } = useData();

  const filterOptions = [
    { id: '', label: ALL_LABEL[lang] ?? 'Alle' },
    ...drinks.map(s => ({ id: s.id, label: t(`drinks.section.${s.id}`, { defaultValue: s.categoryKey }) })),
  ];

  const allSections = drinks.map(s => {
    let items = s.items;
    if (search) {
      items = items.filter(item =>
        localName(item.name, lang).toLowerCase().includes(search.toLowerCase())
      );
    }
    return { id: s.id, title: t(`drinks.section.${s.id}`, { defaultValue: s.categoryKey }), data: items, icon: s.icon };
  }).filter(s => s.data.length > 0);

  const sections = activeFilter
    ? allSections.filter(s => s.id === activeFilter)
    : allSections;

  return (
    <View style={styles.screen}>
      <AppHeader />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.toolbar}>
          <View style={styles.headerRow}>
            <Text style={styles.pageTitle}>{t('nav.drinks')}</Text>
            <SortDropdown options={filterOptions} value={activeFilter} onChange={setActiveFilter} />
          </View>
          <View style={styles.searchRow}>
            <Ionicons name="search-outline" size={18} color={Colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder={SEARCH_PLACEHOLDER[lang] ?? 'Search…'}
              placeholderTextColor="#C8BFB9"
              value={search}
              onChangeText={setSearch}
              returnKeyType="search"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')} activeOpacity={0.75}>
                <Ionicons name="close-circle" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {loading && drinks.length === 0 ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={Colors.accent} />
          </View>
        ) : error && drinks.length === 0 ? (
          <View style={styles.center}>
            <Ionicons name="cloud-offline-outline" size={40} color={Colors.textSecondary} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : sections.length === 0 && search.length > 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={44} color={Colors.border} />
            <Text style={styles.emptyText}>{t('search.empty', { query: search })}</Text>
          </View>
        ) : (
          sections.map(section => (
            <View key={section.id} style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <HorizontalFadeScroll>
                {section.data.map(item => (
                  <DrinkCard
                    key={item.id}
                    item={item}
                    navigation={navigation}
                    sectionId={section.id}
                    sectionIcon={section.icon}
                  />
                ))}
              </HorizontalFadeScroll>
            </View>
          ))
        )}

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
  toolbar: {
    backgroundColor: Colors.background,
    paddingBottom: 4,
    zIndex: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screen,
    paddingTop: 14,
    zIndex: 100,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    marginHorizontal: Spacing.screen,
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    gap: 10,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  errorText: {
    color: Colors.textSecondary,
    textAlign: 'center',
    fontSize: 14,
    paddingHorizontal: Spacing.screen,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.screen,
  },
  sectionBlock: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    paddingHorizontal: Spacing.screen,
    marginBottom: Spacing.sm,
  },
  bottomPad: {
    height: 24,
  },
});
