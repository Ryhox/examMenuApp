import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { AllergenCode } from '../data/allergens';
import { Colors, Spacing } from '../theme';

interface Props {
  allergens: AllergenCode[];
}

export default function AllergenBadges({ allergens }: Props) {
  if (allergens.length === 0) return null;
  return (
    <View style={styles.row}>
      {allergens.map((code) => (
        <View key={code} style={styles.badge}>
          <Text style={styles.text}>{code}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  badge: {
    backgroundColor: Colors.allergenBg,
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.allergenText,
    letterSpacing: 0.5,
  },
});
