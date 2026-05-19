import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { AllergenCode } from '../data/allergens';
import { Colors, Spacing } from '../theme';

interface Props {
  allergens: AllergenCode[];
}

export default function AllergenList({ allergens }: Props) {
  const { t, i18n } = useTranslation();

  if (allergens.length === 0) {
    return (
      <Text style={styles.none}>—</Text>
    );
  }

  return (
    <View style={styles.container}>
      {allergens.map((code) => (
        <View key={code} style={styles.row}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{code}</Text>
          </View>
          <Text style={styles.label}>
            {t(`allergen.${code}`)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  badge: {
    backgroundColor: Colors.allergenBg,
    borderRadius: 4,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.allergenText,
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  none: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
