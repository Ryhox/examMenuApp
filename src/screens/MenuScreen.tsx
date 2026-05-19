import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { menuSections } from '../data/menu';
import type { RootStackParamList } from '../navigation/AppNavigator';
import AppHeader from '../components/AppHeader';
import MenuCard from '../components/MenuCard';
import SortDropdown from '../components/SortDropdown';
import { Colors, Spacing, Radius } from '../theme';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const SEARCH_PLACEHOLDER: Record<string, string> = {
  de: 'Speisen suchen…',
  it: 'Cerca piatti…',
  en: 'Search dishes…',
};

const ALL_LABEL: Record<string, string> = { de: 'Alle', it: 'Tutti', en: 'All' };

export default function MenuScreen() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<Nav>();
  const lang = i18n.language;
  const [activeFilter, setActiveFilter] = useState('');
  const [search, setSearch] = useState('');

  const filterOptions = [
    { id: '', label: ALL_LABEL[lang] ?? 'Alle' },
    ...menuSections.map((s) => ({ id: s.id, label: t(s.titleKey) })),
  ];

  const allSections = menuSections.map((s) => {
    let items = s.items;
    if (search) {
      items = items.filter(item =>
        t(item.nameKey).toLowerCase().includes(search.toLowerCase())
      );
    }
    return { id: s.id, title: t(s.titleKey), data: items };
  }).filter(s => s.data.length > 0);

  const sections = activeFilter
    ? allSections.filter((s) => s.id === activeFilter)
    : allSections;

  return (
    <View style={styles.screen}>
      <AppHeader />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"

      >
        <View style={styles.toolbar}>
          <View style={styles.headerRow}>
            <Text style={styles.pageTitle}>{t('nav.menu')}</Text>
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
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')} activeOpacity={0.75}>
                <Ionicons name="close-circle" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {sections.map((section) => (
          <View key={section.id} style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardsRow}
            >
              {section.data.map((item) => (
                <MenuCard key={item.id} item={item} navigation={navigation} />
              ))}
            </ScrollView>
          </View>
        ))}

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
  cardsRow: {
    paddingHorizontal: Spacing.screen,
    gap: 12,
    paddingBottom: 4,
  },
  bottomPad: {
    height: 24,
  },
});
