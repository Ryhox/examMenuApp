import React, { useState, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Animated, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import type { Language } from '../i18n';
import { Colors, Spacing, Radius } from '../theme';

const LANG_DATA: { code: Language; flag: string }[] = [
  { code: 'de', flag: '🇩🇪' },
  { code: 'it', flag: '🇮🇹' },
  { code: 'en', flag: '🇬🇧' },
];

export default function AppHeader() {
  const { i18n, t } = useTranslation();
  const insets = useSafeAreaInsets();
  const currentLang = i18n.language as Language;
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const openMenu = () => {
    setOpen(true);
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 280,
      friction: 22,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => setOpen(false));
  };

  const toggle = () => (open ? closeMenu() : openMenu());

  const selectLang = (lang: Language) => {
    i18n.changeLanguage(lang);
    closeMenu();
  };

  const current = LANG_DATA.find(l => l.code === currentLang) ?? LANG_DATA[0];

  const dropdownStyle = {
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 0],
        }),
      },
      {
        scale: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.92, 1],
        }),
      },
    ],
  };

  const chevronStyle = {
    transform: [
      {
        rotate: anim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

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
          <Text style={styles.titleSub}>{t('header.sub')}</Text>
        </View>

        <View style={styles.langContainer}>
          {/* Full-screen backdrop to close on outside tap */}
          {open && (
            <Pressable
              style={styles.backdrop}
              onPress={closeMenu}
            />
          )}

          {/* Trigger pill */}
          <TouchableOpacity
            style={[styles.trigger, open && styles.triggerActive]}
            onPress={toggle}
            activeOpacity={0.8}
          >
            <Text style={styles.flagEmoji}>{current.flag}</Text>
            <Text style={[styles.triggerLabel, open && styles.triggerLabelActive]}>
              {current.code.toUpperCase()}
            </Text>
            <Animated.View style={chevronStyle}>
              <Ionicons
                name="chevron-down"
                size={12}
                color={open ? Colors.accent : Colors.textSecondary}
              />
            </Animated.View>
          </TouchableOpacity>

          {/* Dropdown */}
          {open && (
            <Animated.View style={[styles.dropdown, dropdownStyle]}>
              {LANG_DATA.map((lang, i) => {
                const isActive = lang.code === currentLang;
                return (
                  <TouchableOpacity
                    key={lang.code}
                    style={[
                      styles.dropdownItem,
                      i < LANG_DATA.length - 1 && styles.dropdownDivider,
                    ]}
                    onPress={() => selectLang(lang.code)}
                    activeOpacity={0.65}
                  >
                    <Text style={styles.dropdownFlag}>{lang.flag}</Text>
                    <Text style={[styles.dropdownLabel, isActive && styles.dropdownLabelActive]}>
                      {lang.code.toUpperCase()}
                    </Text>
                    {isActive && (
                      <Ionicons name="checkmark" size={13} color={Colors.accent} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </Animated.View>
          )}
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
    zIndex: 200,
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
  langContainer: {
    alignItems: 'flex-end',
    zIndex: 300,
  },
  backdrop: {
    position: 'absolute',
    top: -300,
    bottom: -2000,
    left: -600,
    right: -600,
    zIndex: 0,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: Radius.xl,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    zIndex: 1,
  },
  triggerActive: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accentPale,
  },
  flagEmoji: {
    fontSize: 15,
    lineHeight: 18,
  },
  triggerLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  triggerLabelActive: {
    color: Colors.accent,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 16,
    elevation: 16,
    minWidth: 110,
    overflow: 'hidden',
    zIndex: 1,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dropdownDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  dropdownFlag: {
    fontSize: 16,
    lineHeight: 20,
  },
  dropdownLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: 0.4,
  },
  dropdownLabelActive: {
    color: Colors.accent,
  },
});
