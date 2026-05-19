import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import type { Language } from '../i18n';
import { Colors, Spacing, Radius } from '../theme';

const LANGUAGES: Language[] = ['de', 'it', 'en'];

export default function AppHeader() {
  const { i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const currentLang = i18n.language as Language;

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + 8 }]}>
      <View style={styles.topBar}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.titleBlock}>
          <Text style={styles.titleName}>Campedèl-Hof</Text>
          <Text style={styles.titleSub}>Welschnofen · Südtirol</Text>
        </View>
        <View style={styles.langRow}>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang}
              onPress={() => i18n.changeLanguage(lang)}
              style={[styles.langBtn, currentLang === lang && styles.langBtnActive]}
              activeOpacity={0.75}
            >
              <Text style={[styles.langText, currentLang === lang && styles.langTextActive]}>
                {lang.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.screen,
    paddingBottom: Spacing.sm,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 54,
    height: 38,
    marginRight: 12,
  },
  titleBlock: {
    flex: 1,
  },
  titleName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 0.1,
  },
  titleSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  langRow: {
    flexDirection: 'row',
    gap: 3,
  },
  langBtn: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: Radius.xl,
  },
  langBtnActive: {
    backgroundColor: Colors.accentPale,
  },
  langText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: Colors.textSecondary,
  },
  langTextActive: {
    color: Colors.accent,
  },
});
