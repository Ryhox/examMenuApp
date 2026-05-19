import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import type { Language } from '../i18n';
import { Colors, Spacing, Radius } from '../theme';

const LANGUAGES: Language[] = ['de', 'it', 'en'];

export default function Header() {
  const { i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const currentLang = i18n.language as Language;

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top }]}>
      <View style={styles.inner}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.langRow}>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang}
              onPress={() => i18n.changeLanguage(lang)}
              style={[styles.langBtn, currentLang === lang && styles.langBtnActive]}
              hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
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
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screen,
    height: 60,
  },
  logo: {
    width: 100,
    height: 56,
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  langBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.xl,
  },
  langBtnActive: {
    backgroundColor: Colors.accentPale,
  },
  langText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.8,
    color: Colors.textSecondary,
  },
  langTextActive: {
    color: Colors.accent,
  },
});
